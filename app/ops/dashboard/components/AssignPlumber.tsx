"use client";

import { useState } from "react";
import { Plumber } from "@/lib/data";

interface AssignPlumberProps {
  plumbers: Plumber[];
  onAssign: (plumber: Plumber) => void;
}

export default function AssignPlumber({ plumbers, onAssign }: AssignPlumberProps) {
  const [selected, setSelected] = useState<string>(plumbers[0]?.id ?? "");

  const handleAssign = () => {
    const plumber = plumbers.find((p) => p.id === selected);
    if (plumber) onAssign(plumber);
  };

  return (
    <div className="rounded-[16px] border border-[#dadbdd] bg-white p-5">
      <h3 className="text-[16px] font-semibold text-[#222325]">
        Assign plumber
      </h3>
      <p className="mt-1 text-[13px] text-[#62646a]">
        Choose a verified plumber near the customer location.
      </p>

      <div className="mt-4 space-y-2">
        {plumbers.map((plumber) => (
          <label
            key={plumber.id}
            className={`flex cursor-pointer items-center gap-3 rounded-[12px] border p-3 transition-colors ${
              selected === plumber.id
                ? "border-[#f97316] bg-[#fff7ed]"
                : "border-[#dadbdd] hover:border-[#c5c6c9]"
            }`}
          >
            <input
              type="radio"
              name="plumber"
              value={plumber.id}
              checked={selected === plumber.id}
              onChange={() => setSelected(plumber.id)}
              className="h-4 w-4 accent-[#f97316]"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#222325] text-[14px] font-semibold text-white">
              {plumber.initials}
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#222325]">
                {plumber.name}
              </p>
              <p className="text-[12px] text-[#62646a]">
                {plumber.location} • {plumber.jobsCompleted} jobs
              </p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold text-[#222325]">
                ★ {plumber.rating}
              </p>
            </div>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAssign}
        className="mt-5 w-full rounded-[8px] bg-[#222325] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#111] transition-colors"
      >
        Assign selected plumber
      </button>
    </div>
  );
}
