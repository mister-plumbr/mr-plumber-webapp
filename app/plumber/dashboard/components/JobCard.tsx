"use client";

import { Booking, getStatusColor, formatCurrency } from "@/lib/data";

interface JobCardProps {
  job: Booking;
  isSelected: boolean;
  onClick: () => void;
}

export default function JobCard({ job, isSelected, onClick }: JobCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[16px] border p-4 text-left transition-all ${
        isSelected
          ? "border-[#f97316] bg-[#fff7ed]"
          : "border-[#dadbdd] bg-white hover:border-[#c5c6c9]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#74767e]">{job.id}</p>
          <h3 className="mt-0.5 text-[15px] font-semibold text-[#222325]">
            {job.title}
          </h3>
        </div>
        {job.isEmergency && (
          <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
            SOS
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] text-[#62646a]">
        {job.address}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>
        {job.estimate && (
          <span className="text-[13px] font-semibold text-[#222325]">
            {formatCurrency(job.estimate.range.min)}–
            {formatCurrency(job.estimate.range.max)}
          </span>
        )}
      </div>
    </button>
  );
}
