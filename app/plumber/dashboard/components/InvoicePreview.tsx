"use client";

import { Booking, formatCurrency, formatDate } from "@/lib/data";

interface InvoicePreviewProps {
  job: Booking;
  materials: { name: string; cost: number }[];
  labour: number;
}

export default function InvoicePreview({
  job,
  materials,
  labour,
}: InvoicePreviewProps) {
  const estimate = job.estimate;
  const travel = estimate?.travel ?? 0;
  const partsTotal = materials.reduce((sum, m) => sum + m.cost, 0);
  const subtotal = labour + travel + partsTotal;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="rounded-[14px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-[#222325]">
          Invoice preview
        </h3>
        <span className="text-[12px] text-[#74767e]">{job.id}</span>
      </div>

      <div className="mt-4 border-b border-[#e4e4e7] pb-4">
        <p className="text-[14px] font-semibold text-[#222325]">
          Mister Plumbr Services Pvt. Ltd.
        </p>
        <p className="text-[12px] text-[#62646a]">
          Invoice date: {formatDate(new Date().toISOString())}
        </p>
        <p className="text-[12px] text-[#62646a]">
          Customer: {job.customerName}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-[13px]">
        <div className="flex justify-between">
          <span className="text-[#62646a]">Labour charges</span>
          <span className="text-[#222325]">{formatCurrency(labour)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#62646a]">Travel fee</span>
          <span className="text-[#222325]">{formatCurrency(travel)}</span>
        </div>
        {materials.map((item) => (
          <div key={item.name} className="flex justify-between">
            <span className="text-[#62646a]">{item.name}</span>
            <span className="text-[#222325]">{formatCurrency(item.cost)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-[#e4e4e7] pt-2">
          <span className="text-[#62646a]">Subtotal</span>
          <span className="text-[#222325]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#62646a]">GST (18%)</span>
          <span className="text-[#222325]">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between pt-2 text-[16px] font-semibold">
          <span className="text-[#222325]">Total</span>
          <span className="text-[#222325]">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
