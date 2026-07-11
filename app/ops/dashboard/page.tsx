"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import QueueList from "./components/QueueList";
import EstimateBuilder from "./components/EstimateBuilder";
import AssignPlumber from "./components/AssignPlumber";
import {
  bookings as initialBookings,
  Booking,
  BookingStatus,
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

export default function OpsDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selected, setSelected] = useState<Booking>(initialBookings[0]);
  const [filter, setFilter] = useState<Filter>("all");
  const [notes, setNotes] = useState(selected.internalNotes ?? "");

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    setSelected((prev) => (prev.id === id ? { ...prev, ...updates } : prev));
  };

  const handleSaveEstimate = (estimate: NonNullable<Booking["estimate"]>) => {
    updateBooking(selected.id, {
      estimate,
      status: "Estimate Generated",
      internalNotes: notes,
    });
  };

  const handleAssignPlumber = (plumber: NonNullable<Booking["plumber"]>) => {
    updateBooking(selected.id, {
      plumber,
      status: "Plumber Assigned",
      internalNotes: notes,
    });
  };

  const handleStatusAdvance = () => {
    const statusFlow: BookingStatus[] = [
      "Submitted",
      "Under Review",
      "Estimate Generated",
      "Estimate Accepted",
      "Plumber Assigned",
      "Plumber En Route",
      "Arrived",
      "Work Started",
      "Completed",
      "Payment Pending",
      "Paid",
      "Closed",
    ];
    const currentIndex = statusFlow.indexOf(selected.status);
    const nextStatus = statusFlow[currentIndex + 1];
    if (nextStatus) {
      updateBooking(selected.id, { status: nextStatus, internalNotes: notes });
    }
  };

  const sla = useMemo(
    () => getSlaMinutes(selected.createdAt),
    [selected.createdAt]
  );

  return (
    <div className="flex h-screen flex-col bg-[#f4f4f5]">
      {/* Top bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#dadbdd] bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-[#222325]">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
          <span className="rounded-full bg-[#f97316]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#f97316]">
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
        <div className="flex w-full flex-col border-r border-[#dadbdd] bg-white sm:w-[360px]">
          <div className="border-b border-[#dadbdd] p-4">
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
                <h1 className="mt-1 text-[28px] font-semibold text-[#222325]">
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
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Customer request
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.57] text-[#62646a]">
                    {selected.description}
                  </p>
                  <div className="mt-4 space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-[#74767e]">Address</span>
                      <span className="max-w-xs text-right text-[#222325]">
                        {selected.address}
                      </span>
                    </div>
                    {selected.landmark && (
                      <div className="flex justify-between">
                        <span className="text-[#74767e]">Landmark</span>
                        <span className="text-[#222325]">{selected.landmark}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#74767e]">Submitted</span>
                      <span className="text-[#222325]">
                        {formatDateTime(selected.createdAt)}
                      </span>
                    </div>
                    {selected.preferredTime && (
                      <div className="flex justify-between">
                        <span className="text-[#74767e]">Preferred visit</span>
                        <span className="text-[#222325]">
                          {formatDateTime(selected.preferredTime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
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
                  <p className="mt-3 text-[12px] text-[#74767e]">
                    Click photo to zoom (placeholder — images will load once real
                    uploads are wired).
                  </p>
                </div>

                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Internal notes
                  </h3>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes visible only to operations team..."
                    className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateBooking(selected.id, { internalNotes: notes })
                    }
                    className="mt-3 rounded-[8px] bg-[#f97316] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
                  >
                    Save notes
                  </button>
                </div>
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
                  <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                    <h3 className="text-[16px] font-semibold text-[#222325]">
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
                  </div>
                )}

                {(selected.status === "Estimate Accepted" ||
                  selected.status === "Plumber Assigned") && (
                  <AssignPlumber onAssign={handleAssignPlumber} />
                )}

                {selected.plumber && (
                  <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                    <h3 className="text-[16px] font-semibold text-[#222325]">
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
                  </div>
                )}

                {/* Status actions */}
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
