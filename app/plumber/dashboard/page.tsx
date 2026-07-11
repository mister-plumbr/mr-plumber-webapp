"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import JobCard from "./components/JobCard";
import InvoicePreview from "./components/InvoicePreview";
import {
  bookings as initialBookings,
  Booking,
  BookingStatus,
  formatDateTime,
  formatCurrency,
  getStatusColor,
  availablePlumbers,
} from "@/lib/data";

const plumberId = "p2"; // Simulated logged-in plumber

const statusActions: Record<BookingStatus, string> = {
  Submitted: "",
  "Under Review": "",
  "Estimate Generated": "",
  "Estimate Accepted": "Start journey",
  "Plumber Assigned": "Start journey",
  "Plumber En Route": "Mark arrived",
  Arrived: "Start work",
  "Work Started": "Complete job",
  Completed: "Request payment",
  "Payment Pending": "Mark paid",
  Paid: "Close job",
  Closed: "",
  Cancelled: "",
};

export default function PlumberDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const assignedJobs = bookings.filter(
    (b) => b.plumber?.id === plumberId || b.status === "Estimate Accepted"
  );

  const [selected, setSelected] = useState<Booking>(
    assignedJobs[0] ?? initialBookings[0]
  );
  const [labour, setLabour] = useState(selected.estimate?.labour ?? 0);
  const [materials, setMaterials] = useState<{ name: string; cost: number }[]>(
    selected.estimate?.parts ?? [{ name: "", cost: 0 }]
  );
  const [beforePhotos, setBeforePhotos] = useState<string[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<string[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    setSelected((prev) => (prev.id === id ? { ...prev, ...updates } : prev));
  };

  const handleStatusAdvance = () => {
    const flow: BookingStatus[] = [
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
    const currentIndex = flow.indexOf(selected.status);
    const nextStatus = flow[currentIndex + 1];
    if (nextStatus) {
      updateBooking(selected.id, { status: nextStatus });
    }
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

  const actionLabel = statusActions[selected.status];

  return (
    <div className="flex h-screen flex-col bg-[#f4f4f5]">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#dadbdd] bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-[#222325]">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
          <span className="rounded-full bg-[#7c2d12]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#7c2d12]">
            PLUMBER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-[#222325]">
              {availablePlumbers.find((p) => p.id === plumberId)?.name}
            </p>
            <p className="text-[11px] text-[#74767e]">Verified plumber</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c2d12] text-[13px] font-semibold text-white">
            {availablePlumbers.find((p) => p.id === plumberId)?.initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Job list */}
        <div className="flex w-full flex-col border-r border-[#dadbdd] bg-white sm:w-[360px]">
          <div className="border-b border-[#dadbdd] p-4">
            <h2 className="text-[16px] font-semibold text-[#222325]">
              Today&apos;s jobs
            </h2>
            <p className="text-[12px] text-[#74767e]">
              {assignedJobs.length} assigned
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {assignedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selected.id === job.id}
                  onClick={() => {
                    setSelected(job);
                    setLabour(job.estimate?.labour ?? 0);
                    setMaterials(
                      job.estimate?.parts ?? [{ name: "", cost: 0 }]
                    );
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
                <h1 className="mt-1 text-[28px] font-semibold text-[#222325]">
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
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Job details
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
                        <span className="text-[#222325]">
                          {selected.landmark}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
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
                </div>

                {/* Before photos */}
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
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
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#c5c6c9] bg-[#fff7ed] text-[#f97316]">
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
                </div>

                {/* After photos */}
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
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
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#c5c6c9] bg-[#fff7ed] text-[#f97316]">
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
                </div>
              </div>

              {/* Right */}
              <div className="space-y-6">
                {/* Materials used */}
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-[#222325]">
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
                          className="flex-1 rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[13px]"
                        />
                        <input
                          type="number"
                          placeholder="₹"
                          value={item.cost || ""}
                          onChange={(e) =>
                            updateMaterial(idx, "cost", e.target.value)
                          }
                          className="w-24 rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[13px]"
                        />
                        {materials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMaterial(idx)}
                            className="rounded-[8px] border border-[#dadbdd] px-2 text-[#62646a]"
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
                      className="mt-1 w-full rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[13px]"
                    />
                  </div>
                </div>

                {/* Signature */}
                <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Customer signature
                  </h3>
                  <div className="mt-3">
                    {signature ? (
                      <div className="rounded-[8px] border border-[#dadbdd] bg-white p-2">
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
                        className="w-full cursor-crosshair rounded-[8px] border border-[#c5c6c9] bg-white"
                      />
                    )}
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="rounded-[8px] border border-[#dadbdd] px-4 py-2 text-[13px] font-semibold text-[#222325] hover:bg-[#f9f9f9]"
                    >
                      Clear
                    </button>
                    {!signature && (
                      <button
                        type="button"
                        onClick={saveSignature}
                        className="rounded-[8px] bg-[#222325] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#111]"
                      >
                        Save signature
                      </button>
                    )}
                  </div>
                </div>

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
                    onClick={handleStatusAdvance}
                    className="w-full rounded-[8px] bg-[#f97316] px-4 py-3.5 text-[16px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
