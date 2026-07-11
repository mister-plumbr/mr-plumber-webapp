"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import JobCard from "./components/JobCard";
import InvoicePreview from "./components/InvoicePreview";
import {
  Booking,
  formatDateTime,
  formatCurrency,
  getStatusColor,
} from "@/lib/data";

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
  estimate?: {
    labour: number;
    travel: number;
    parts: string;
    min: number;
    max: number;
  } | null;
  invoice?: {
    labour: number;
    travel: number;
    parts: string;
    tax: number;
    total: number;
    isPaid: boolean;
  } | null;
}

const statusActions: Record<string, string> = {
  "ESTIMATE ACCEPTED": "Start journey",
  "PLUMBER ASSIGNED": "Start journey",
  "PLUMBER EN ROUTE": "Mark arrived",
  ARRIVED: "Start work",
  "WORK STARTED": "Complete job",
  COMPLETED: "Generate invoice",
  "PAYMENT PENDING": "Mark paid",
  PAID: "Close job",
};

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
    estimate: api.estimate
      ? {
          range: { min: api.estimate.min, max: api.estimate.max },
          notes: "",
          parts: api.estimate.parts
            ? (JSON.parse(api.estimate.parts) as { name: string; cost: number }[])
            : [],
          labour: api.estimate.labour,
          travel: api.estimate.travel,
          expiresAt: new Date().toISOString(),
        }
      : undefined,
    finalPrice: api.invoice?.total,
  };
}

export default function PlumberDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plumber, setPlumber] = useState({
    name: "",
    initials: "",
  });

  const [labour, setLabour] = useState(0);
  const [materials, setMaterials] = useState<{ name: string; cost: number }[]>([
    { name: "", cost: 0 },
  ]);
  const [beforePhotos, setBeforePhotos] = useState<string[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<string[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bookings");
        if (res.status === 401) {
          router.push("/plumber/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = (await res.json()) as { bookings: ApiBooking[] };
        const mapped = data.bookings.map(mapApiBooking);
        setBookings(mapped);
        const first = mapped[0] ?? null;
        setSelected(first);
        setLabour(first?.estimate?.labour ?? 0);
        setMaterials(first?.estimate?.parts ?? [{ name: "", cost: 0 }]);

        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const me = (await meRes.json()) as { user: { firstName: string; lastName: string } };
          setPlumber({
            name: `${me.user.firstName} ${me.user.lastName}`,
            initials: `${me.user.firstName[0]}${me.user.lastName[0]}`,
          });
        }
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
      setBookings((prev) => prev.map((b) => (b.id === mapped.id ? mapped : b)));
      setSelected(mapped);
    }
  };

  const advanceStatus = async () => {
    if (!selected) return;
    const flow = [
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

    if (res.ok) await refreshSelected();
  };

  const generateInvoice = async () => {
    if (!selected) return;
    const res = await fetch(`/api/bookings/${selected.id}/invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        labour,
        travel: selected.estimate?.travel ?? 0,
        parts: materials.filter((m) => m.name.trim() !== ""),
      }),
    });

    if (res.ok) await refreshSelected();
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setter((prev) => [...prev, url]);
    });
  };

  const updateMaterial = (
    index: number,
    field: "name" | "cost",
    value: string
  ) => {
    setMaterials((prev) =>
      prev.map((m, i) =>
        i === index
          ? { ...m, [field]: field === "cost" ? Number(value) || 0 : value }
          : m
      )
    );
  };

  const addMaterial = () =>
    setMaterials((prev) => [...prev, { name: "", cost: 0 }]);
  const removeMaterial = (index: number) =>
    setMaterials((prev) => prev.filter((_, i) => i !== index));

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSignature(canvas.toDataURL());
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#222325";
    ctx.lineWidth = 2;

    const draw = (ev: MouseEvent) => {
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.stroke();
    };

    const stop = () => {
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
      saveSignature();
    };

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
  };

  const actionLabel = selected ? statusActions[selected.status.replace(/ /g, "_")] : "";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#62646a]">Loading jobs...</p>
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
        <p className="text-[#62646a]">No jobs assigned today.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e4e4e7] bg-white px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-[#222325]">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
          <span className="rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-[11px] font-bold text-[#f97316]">
            PLUMBER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-semibold text-[#222325]">
              {plumber.name || "Technician"}
            </p>
            <p className="text-[11px] text-[#74767e]">Verified plumber</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c2d12] text-[13px] font-semibold text-white">
            {plumber.initials || "T"}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Job list */}
        <div className="flex w-full flex-col border-r border-[#e4e4e7] bg-white sm:w-[360px]">
          <div className="border-b border-[#e4e4e7] p-5">
            <h2 className="text-[16px] font-semibold text-[#222325]">
              Today&apos;s jobs
            </h2>
            <p className="text-[12px] text-[#74767e]">
              {bookings.length} assigned
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-3">
              {bookings.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selected.id === job.id}
                  onClick={() => {
                    setSelected(job);
                    setLabour(job.estimate?.labour ?? 0);
                    setMaterials(job.estimate?.parts ?? [{ name: "", cost: 0 }]);
                    setSignature(null);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="hidden flex-1 overflow-y-auto sm:block">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[13px] text-[#74767e]">{selected.id}</p>
                <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#222325]">
                  {selected.title}
                </h1>
                <p className="text-[14px] text-[#62646a]">
                  {selected.customerName} • {selected.customerPhone}
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
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Left */}
              <div className="space-y-6">
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Job details
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
                      <span className="text-[#74767e]">Preferred time</span>
                      <span className="text-[#222325]">
                        {selected.preferredTime
                          ? formatDateTime(selected.preferredTime)
                          : "Not specified"}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      selected.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#f97316] hover:text-[#ea580c]"
                  >
                    Open in Google Maps →
                  </a>
                </section>

                {/* Before photos */}
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Before photos
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {beforePhotos.map((src, idx) => (
                      <div key={idx} className="aspect-square">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Before ${idx + 1}`}
                          className="h-full w-full rounded-[8px] object-cover"
                        />
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#f97316] bg-[#fff7ed] text-[#f97316] hover:bg-[#ffedd5]">
                      <span className="text-2xl">+</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setBeforePhotos)}
                      />
                    </label>
                  </div>
                </section>

                {/* After photos */}
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    After photos
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {afterPhotos.map((src, idx) => (
                      <div key={idx} className="aspect-square">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`After ${idx + 1}`}
                          className="h-full w-full rounded-[8px] object-cover"
                        />
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#f97316] bg-[#fff7ed] text-[#f97316] hover:bg-[#ffedd5]">
                      <span className="text-2xl">+</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setAfterPhotos)}
                      />
                    </label>
                  </div>
                </section>
              </div>

              {/* Right */}
              <div className="space-y-6">
                {/* Materials used */}
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-[#222325]">
                      Materials used
                    </h3>
                    <button
                      type="button"
                      onClick={addMaterial}
                      className="text-[12px] font-semibold text-[#f97316] hover:text-[#ea580c]"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {materials.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Item"
                          value={item.name}
                          onChange={(e) =>
                            updateMaterial(idx, "name", e.target.value)
                          }
                          className="flex-1 rounded-[8px] border border-[#dadbdd] px-3 py-2 text-[13px] text-[#222325] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                        />
                        <input
                          type="number"
                          placeholder="₹"
                          value={item.cost || ""}
                          onChange={(e) =>
                            updateMaterial(idx, "cost", e.target.value)
                          }
                          className="w-24 rounded-[8px] border border-[#dadbdd] px-3 py-2 text-[13px] text-[#222325] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                        />
                        {materials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMaterial(idx)}
                            className="rounded-[8px] border border-[#e4e4e7] px-2 text-[#62646a] hover:bg-[#f4f4f5]"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="block text-[12px] font-semibold text-[#62646a]">
                      Labour charges
                    </label>
                    <input
                      type="number"
                      value={labour}
                      onChange={(e) => setLabour(Number(e.target.value) || 0)}
                      className="mt-1 w-full rounded-[8px] border border-[#dadbdd] px-3 py-2 text-[13px] text-[#222325] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                    />
                  </div>
                </section>

                {/* Signature */}
                <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Customer signature
                  </h3>
                  <div className="mt-3">
                    {signature ? (
                      <div className="rounded-[8px] border border-[#e4e4e7] bg-white p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={signature}
                          alt="Customer signature"
                          className="h-32 w-full object-contain"
                        />
                      </div>
                    ) : (
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={120}
                        onMouseDown={startDrawing}
                        className="w-full cursor-crosshair rounded-[8px] border border-[#dadbdd] bg-white"
                      />
                    )}
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="rounded-[8px] border border-[#dadbdd] bg-white px-4 py-2 text-[13px] font-semibold text-[#222325] hover:bg-[#f9f9f9] transition-colors"
                    >
                      Clear
                    </button>
                    {!signature && (
                      <button
                        type="button"
                        onClick={saveSignature}
                        className="rounded-[8px] bg-[#222325] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#111] transition-colors"
                      >
                        Save signature
                      </button>
                    )}
                  </div>
                </section>

                {/* Invoice */}
                <InvoicePreview
                  job={selected}
                  materials={materials}
                  labour={labour}
                />

                {/* Action */}
                {actionLabel && (
                  <button
                    type="button"
                    onClick={
                      selected.status.replace(/ /g, "_") === "COMPLETED"
                        ? generateInvoice
                        : advanceStatus
                    }
                    className="w-full rounded-[8px] bg-[#f97316] px-4 py-3.5 text-[16px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
                  >
                    {actionLabel}
                  </button>
                )}

                {selected.finalPrice && (
                  <section className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                    <p className="text-[14px] text-[#62646a]">
                      Invoice total:{" "}
                      <span className="font-semibold text-[#222325]">
                        {formatCurrency(selected.finalPrice)}
                      </span>
                    </p>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
