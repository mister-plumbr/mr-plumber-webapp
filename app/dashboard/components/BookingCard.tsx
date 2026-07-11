import { Booking, getStatusColor, formatDate, formatCurrency } from "@/lib/data";

interface BookingCardProps {
  booking: Booking;
  isSelected: boolean;
  onClick: () => void;
}

export default function BookingCard({
  booking,
  isSelected,
  onClick,
}: BookingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-[14px] border p-4 text-left transition-all ${
        isSelected
          ? "border-[#f97316] bg-[#fff7ed] shadow-sm"
          : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8] hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] text-[#74767e]">{booking.id}</p>
          <h3 className="mt-0.5 truncate text-[15px] font-semibold text-[#222325]">
            {booking.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white ${getStatusColor(
            booking.status
          )}`}
        >
          {booking.status}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-[#62646a]">
        {booking.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-[13px]">
        <span className="text-[#74767e]">{formatDate(booking.createdAt)}</span>
        {booking.estimate ? (
          <span className="font-semibold text-[#222325]">
            {formatCurrency(booking.estimate.range.min)}–
            {formatCurrency(booking.estimate.range.max)}
          </span>
        ) : (
          <span className="text-[#74767e]">Awaiting estimate</span>
        )}
      </div>
    </button>
  );
}
