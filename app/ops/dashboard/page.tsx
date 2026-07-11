"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QueueList from "./components/QueueList";
import EstimateBuilder from "./components/EstimateBuilder";
import AssignPlumber from "./components/AssignPlumber";
import {
  Booking,
  Plumber,
  formatDateTime,
  formatCurrency,
  getStatusColor,
  getSlaMinutes,
  getSlaDisplay,
} from "@/lib/data";

type Filter = "all" | "new" | "review" | "estimate" | "active";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "review", label: "Under Review" },
  { key: "estimate", label: "Estimate" },
  { key: "active", label: "Active" },
];

interface ApiBooking {
  id: string;
  requestId: string;
  title: string;
  category: string;
  description: string;
  address: string;
  landmark?: string;
  isEmergency: boolean;
  status: string;
  createdAt: string;
  preferredTime?: string;
  user: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  plumber?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    jobsCompleted: number;
    initials: string;
    location: string;
  } | null;
  estimate?: {
    labour: number;
    travel: number;
    parts: string;
    min: number;
    max: number;
    notes?: string | null;
    expiresAt: string;
  } | null;
  notes: { content: string; createdAt: string }[];
}

interface ApiPlumber {
  id: string;
  name: string;
  phone: string;
  rating: number;
  jobsCompleted: number;
  initials: string;
  location: string;
}

function mapApiBooking(api: ApiBooking): Booking {
  return {
    id: api.requestId,
    customerName: `${api.user.firstName} ${api.user.lastName}`,
    customerPhone: api.user.phone,
    title: api.title,
    category: api.category,
    description: api.description,
    address: api.address,
    landmark: api.landmark,
    isEmergency: api.isEmergency,
    status: api.status.replace(/_/g, " ") as Booking["status"],
    createdAt: api.createdAt,
    preferredTime: api.preferredTime,
    photos: [],
    internalNotes: api.notes[0]?.content,
    estimate: api.estimate
      ? {
          range: { min: api.estimate.min, max: api.estimate.max },
          notes: api.estimate.notes ?? "",
          parts: api.estimate.parts
            ? (JSON.parse(api.estimate.parts) as { name: string; cost: number }[])
            : [],
          labour: api.estimate.labour,
          travel: api.estimate.travel,
          expiresAt: api.estimate.expiresAt,
        }
      : undefined,
    plumber: api.plumber
      ? {
          id: api.plumber.id,
          name: api.plumber.name,
          phone: api.plumber.phone,
          rating: api.plumber.rating,
          jobsCompleted: api.plumber.jobsCompleted,
          initials: api.plumber.initials,
          location: api.plumber.location,
        }
      : undefined,
  };
}

export default function OpsDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [plumbers, setPlumbers] = useState<Plumber[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, plumbersRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/plumbers"),
        ]);

        if (bookingsRes.status === 401 || plumbersRes.status === 401) {
          router.push("/ops/login");
          return;
        }

        if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
        if (!plumbersRes.ok) throw new Error("Failed to fetch plumbers");

        const bookingsData = (await bookingsRes.json()) as { bookings: ApiBooking[] };
        const plumbersData = (await plumbersRes.json()) as { plumbers: ApiPlumber[] };

        const mappedBookings = bookingsData.bookings.map(mapApiBooking);
        const mappedPlumbers = plumbersData.plumbers.map((p) => ({
          id: p.id,
          name: p.name,
          phone: p.phone,
          rating: p.rating,
          jobsCompleted: p.jobsCompleted,
          initials: p.initials,
          location: p.location,
        }));

        setBookings(mappedBookings);
        setPlumbers(mappedPlumbers);
        setSelected(mappedBookings[0] ?? null);
        setNotes(mappedBookings[0]?.internalNotes ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const refreshSelected = async () => {
    if (!selected) return;
    const res = await fetch(`/api/bookings/${selected.id}`);
    if (res.ok) {
      const data = (await res.json()) as { booking: ApiBooking };
      const mapped = mapApiBooking(data.booking);
      setBookings((prev) =>
        prev.map((b) => (b.id === mapped.id ? mapped : b))
      );
      setSelected(mapped);
      setNotes(mapped.internalNotes ?? "");
    }
  };

  const handleSaveEstimate = async (
    estimate: NonNullable<Booking["estimate"]>
  ) => {
    if (!selected) return;
    const parts = estimate.parts;
    const baseTotal = estimate.labour + estimate.travel + parts.reduce((s, p) => s + p.cost, 0);
    const buffer = Math.round(((estimate.range.max - baseTotal) / baseTotal) * 100) || 15;

    const res = await fetch(`/api/bookings/${selected.id}/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        labour: estimate.labour,
        travel: estimate.travel,
        parts,
        notes: estimate.notes,
        bufferPercent: buffer,
      }),
    });

    if (res.ok) {
      await saveNotes();
      await refreshSelected();
    }
  };

  const handleAssignPlumber = async (plumber: Plumber) => {
    if (!selected) return;
    const res = await fetch(`/api/bookings/${selected.id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plumberId: plumber.id }),
    });

    if (res.ok) {
      await saveNotes();
      await refreshSelected();
    }
  };

  const saveNotes = async () => {
    if (!selected || !notes.trim()) return;
    await fetch(`/api/bookings/${selected.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: notes }),
    });
  };

  const handleStatusAdvance = async () => {
    if (!selected) return;
    const flow = [
      "SUBMITTED",
      "UNDER_REVIEW",
      "ESTIMATE_GENERATED",
      "ESTIMATE_ACCEPTED",
      "PLUMBER_ASSIGNED",
      "PLUMBER_EN_ROUTE",
      "ARRIVED",
      "WORK_STARTED",
      "COMPLETED",
      "PAYMENT_PENDING",
      "PAID",
      "CLOSED",
    ];
    const currentIndex = flow.indexOf(selected.status.replace(/ /g, "_"));
    const nextStatus = flow[currentIndex + 1];
    if (!nextStatus) return;

    const res = await fetch(`/api/bookings/${selected.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (res.ok) {
      await refreshSelected();
    }
  };

  const sla = useMemo(
    () => (selected ? getSlaMinutes(selected.createdAt) : 0),
    [selected]
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#62646a]">Loading operations dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#62646a]">No requests in queue.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#fafafa]">
      {/* Top bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e4e4e7] bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-[#222325]">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
          <span className="rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-[11px] font-bold text-[#f97316]">
            OPS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-semibold text-[#222325]">Amit Verma</p>
            <p className="text-[11px] text-[#74767e]">Operations Manager</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#222325] text-[13px] font-semibold text-white">
            AV
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Queue sidebar */}
        <div className="flex w-full flex-col border-r border-[#e4e4e7] bg-white sm:w-[360px]">
          <div className="border-b border-[#e4e4e7] p-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    filter === f.key
                      ? "bg-[#222325] text-white"
                      : "bg-[#f4f4f5] text-[#62646a] hover:bg-[#e4e4e7]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <QueueList
            bookings={bookings}
            selectedId={selected.id}
            onSelect={(b) => {
              setSelected(b);
              setNotes(b.internalNotes ?? "");
            }}
            filter={filter}
          />
        </div>

        {/* Detail panel */}
        <div className="hidden flex-1 overflow-y-auto sm:block">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-[13px] text-[#74767e]">{selected.id}</p>
                  {selected.isEmergency && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                      EMERGENCY
                    </span>
                  )}
                </div>
                <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#222325]">
                  {selected.title}
                </h1>
                <p className="text-[14px] text-[#62646a]">
                  {selected.category} • {selected.customerName} •{" "}
                  {selected.customerPhone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-[12px] font-semibold text-white ${getStatusColor(
                    selected.status
                  )}`}
                >
                  {selected.status}
                </span>
                <span
                  className={`text-[13px] ${
                    selected.isEmergency && sla > 30
                      ? "font-semibold text-red-600"
                      : "text-[#62646a]"
                  }`}
                >
                  SLA {getSlaDisplay(sla)}
                </span>
              </div>
            </div>

            {/* Main grid */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Customer request
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#62646a]">
                    {selected.description}
                  </p>
                  <div className="mt-4 space-y-2 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#74767e]">Address</span>
                      <span className="max-w-xs text-right text-[#222325]">
                        {selected.address}
                      </span>
                    </div>
                    {selected.landmark && (
                      <div className="flex justify-between gap-4">
                        <span className="text-[#74767e]">Landmark</span>
                        <span className="text-[#222325]">{selected.landmark}</span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <span className="text-[#74767e]">Submitted</span>
                      <span className="text-[#222325]">
                        {formatDateTime(selected.createdAt)}
                      </span>
                    </div>
                    {selected.preferredTime && (
                      <div className="flex justify-between gap-4">
                        <span className="text-[#74767e]">Preferred visit</span>
                        <span className="text-[#222325]">
                          {formatDateTime(selected.preferredTime)}
                        </span>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Photos & video
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {selected.photos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="flex aspect-square items-center justify-center rounded-[12px] bg-[#f4f4f5] text-[#74767e]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={`Photo ${idx + 1}`}
                          className="h-full w-full rounded-[12px] object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                    {selected.photos.length === 0 && (
                      <p className="col-span-3 text-[13px] text-[#74767e]">
                        No photos uploaded.
                      </p>
                    )}
                  </div>
                </section>

                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Internal notes
                  </h3>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes visible only to operations team..."
                    className="mt-2 w-full rounded-[10px] border border-[#dadbdd] px-3 py-2 text-[14px] text-[#222325] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                  />
                  <button
                    type="button"
                    onClick={saveNotes}
                    className="mt-3 rounded-[8px] bg-[#f97316] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
                  >
                    Save notes
                  </button>
                </section>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {(selected.status === "Submitted" ||
                  selected.status === "Under Review" ||
                  selected.status === "Estimate Generated") && (
                  <EstimateBuilder
                    booking={selected}
                    onSave={handleSaveEstimate}
                  />
                )}

                {selected.estimate && (
                  <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                    <h3 className="text-[15px] font-semibold text-[#222325]">
                      Current estimate
                    </h3>
                    <p className="mt-2 text-[28px] font-semibold text-[#222325]">
                      {formatCurrency(selected.estimate.range.min)} –{" "}
                      {formatCurrency(selected.estimate.range.max)}
                    </p>
                    <p className="text-[13px] text-[#62646a]">
                      {selected.estimate.notes}
                    </p>
                    <div className="mt-3 space-y-1 text-[13px]">
                      <div className="flex justify-between">
                        <span className="text-[#74767e]">Labour</span>
                        <span>{formatCurrency(selected.estimate.labour)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#74767e]">Travel</span>
                        <span>{formatCurrency(selected.estimate.travel)}</span>
                      </div>
                      {selected.estimate.parts.map((part) => (
                        <div key={part.name} className="flex justify-between">
                          <span className="text-[#74767e]">{part.name}</span>
                          <span>{formatCurrency(part.cost)}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {(selected.status === "Estimate Accepted" ||
                  selected.status === "Plumber Assigned") && (
                  <AssignPlumber
                    plumbers={plumbers}
                    onAssign={handleAssignPlumber}
                  />
                )}

                {selected.plumber && (
                  <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                    <h3 className="text-[15px] font-semibold text-[#222325]">
                      Assigned plumber
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#222325] text-[15px] font-semibold text-white">
                        {selected.plumber.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-semibold text-[#222325]">
                          {selected.plumber.name}
                        </p>
                        <p className="text-[13px] text-[#62646a]">
                          {selected.plumber.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-semibold text-[#222325]">
                          ★ {selected.plumber.rating}
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Update status
                  </h3>
                  <p className="mt-1 text-[13px] text-[#62646a]">
                    Advance the job through the workflow.
                  </p>
                  <button
                    type="button"
                    onClick={handleStatusAdvance}
                    className="mt-4 w-full rounded-[8px] bg-[#222325] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#111] transition-colors"
                  >
                    Advance to next status
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
