"use client";

import { Booking, getStatusColor, formatDate, getSlaMinutes, getSlaDisplay } from "@/lib/data";

interface QueueListProps {
  bookings: Booking[];
  selectedId: string;
  onSelect: (booking: Booking) => void;
  filter: "all" | "new" | "review" | "estimate" | "active";
}

export default function QueueList({
  bookings,
  selectedId,
  onSelect,
  filter,
}: QueueListProps) {
  const filtered = bookings.filter((b) => {
    switch (filter) {
      case "new":
        return b.status === "Submitted";
      case "review":
        return b.status === "Under Review";
      case "estimate":
        return b.status === "Estimate Generated" || b.status === "Estimate Accepted";
      case "active":
        return (
          b.status === "Plumber Assigned" ||
          b.status === "Plumber En Route" ||
          b.status === "Arrived" ||
          b.status === "Work Started"
        );
      default:
        return true;
    }
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-3 p-4">
        {filtered.map((booking) => {
          const sla = getSlaMinutes(booking.createdAt);
          const slaUrgent = booking.isEmergency && sla > 30;

          return (
            <button
              key={booking.id}
              type="button"
              onClick={() => onSelect(booking)}
              className={`w-full rounded-[12px] border p-4 text-left transition-all ${
                selectedId === booking.id
                  ? "border-[#f97316] bg-[#fff7ed]"
                  : "border-[#dadbdd] bg-white hover:border-[#c5c6c9]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium text-[#74767e]">
                    {booking.id}
                  </p>
                  <h3 className="mt-0.5 text-[15px] font-semibold text-[#222325]">
                    {booking.title}
                  </h3>
                </div>
                {booking.isEmergency && (
                  <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                    SOS
                  </span>
                )}
              </div>

              <p className="mt-1 text-[13px] text-[#62646a]">
                {booking.customerName} • {booking.category}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
                <span
                  className={`text-[12px] ${
                    slaUrgent ? "font-semibold text-red-600" : "text-[#74767e]"
                  }`}
                >
                  {getSlaDisplay(sla)} ago
                </span>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-[12px] border border-dashed border-[#dadbdd] p-8 text-center">
            <p className="text-[14px] text-[#74767e]">
              No requests in this queue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
