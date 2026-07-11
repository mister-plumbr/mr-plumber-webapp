"use client";

import { useState } from "react";
import { Booking, formatCurrency } from "@/lib/data";

interface EstimateBuilderProps {
  booking: Booking;
  onSave: (estimate: NonNullable<Booking["estimate"]>) => void;
}

export default function EstimateBuilder({ booking, onSave }: EstimateBuilderProps) {
  const existing = booking.estimate;
  const [labour, setLabour] = useState(existing?.labour ?? 0);
  const [travel, setTravel] = useState(existing?.travel ?? 150);
  const [parts, setParts] = useState(existing?.parts ?? [{ name: "", cost: 0 }]);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [bufferPercent, setBufferPercent] = useState(15);

  const partsTotal = parts.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);
  const baseTotal = labour + travel + partsTotal;
  const min = Math.round(baseTotal);
  const max = Math.round(baseTotal * (1 + bufferPercent / 100));

  const updatePart = (index: number, field: "name" | "cost", value: string) => {
    setParts((prev) =>
      prev.map((part, i) =>
        i === index
          ? {
              ...part,
              [field]: field === "cost" ? Number(value) || 0 : value,
            }
          : part
      )
    );
  };

  const addPart = () => setParts((prev) => [...prev, { name: "", cost: 0 }]);
  const removePart = (index: number) =>
    setParts((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    onSave({
      labour,
      travel,
      parts: parts.filter((p) => p.name.trim() !== ""),
      notes,
      range: { min, max },
      expiresAt: expires.toISOString(),
    });
  };

  return (
    <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
      <h3 className="text-[16px] font-semibold text-[#222325]">
        Build estimate
      </h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[12px] font-semibold text-[#62646a]">
            Labour charge
          </label>
          <input
            type="number"
            value={labour}
            onChange={(e) => setLabour(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
          />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#62646a]">
            Travel fee
          </label>
          <input
            type="number"
            value={travel}
            onChange={(e) => setTravel(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className="block text-[12px] font-semibold text-[#62646a]">
            Parts / materials
          </label>
          <button
            type="button"
            onClick={addPart}
            className="text-[12px] font-semibold text-[#f97316] hover:text-[#ea580c]"
          >
            + Add part
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {parts.map((part, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Part name"
                value={part.name}
                onChange={(e) => updatePart(index, "name", e.target.value)}
                className="flex-1 rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
              />
              <input
                type="number"
                placeholder="Cost"
                value={part.cost || ""}
                onChange={(e) => updatePart(index, "cost", e.target.value)}
                className="w-28 rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
              />
              {parts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePart(index)}
                  className="rounded-[8px] border border-[#dadbdd] px-3 text-[#62646a] hover:bg-[#f9f9f9]"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-[12px] font-semibold text-[#62646a]">
          Estimate notes
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Explain assumptions or conditions to customer..."
          className="mt-1 w-full rounded-[8px] border border-[#c5c6c9] px-3 py-2 text-[14px]"
        />
      </div>

      <div className="mt-4">
        <label className="block text-[12px] font-semibold text-[#62646a]">
          Price buffer: {bufferPercent}%
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={bufferPercent}
          onChange={(e) => setBufferPercent(Number(e.target.value))}
          className="mt-2 w-full accent-[#f97316]"
        />
      </div>

      <div className="mt-5 rounded-[12px] bg-[#fff7ed] p-4">
        <p className="text-[12px] font-semibold text-[#62646a]">
          Estimated price range
        </p>
        <p className="mt-1 text-[28px] font-semibold text-[#222325]">
          {formatCurrency(min)} – {formatCurrency(max)}
        </p>
        <p className="text-[12px] text-[#74767e]">
          Base {formatCurrency(baseTotal)} + {bufferPercent}% inspection buffer
        </p>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="mt-5 w-full rounded-[8px] bg-[#222325] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#111] transition-colors"
      >
        Save & send estimate
      </button>
    </div>
  );
}
