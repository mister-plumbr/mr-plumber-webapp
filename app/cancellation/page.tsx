import PageShell from "../components/PageShell";
import { Clock, AlertCircle, CheckCircle, RefreshCcw } from "../components/icons";

export default function CancellationPage() {
  return (
    <PageShell title="Cancellation policy" subtitle="Flexible cancellations with fair protection for our plumbers.">
      <div className="space-y-12">
        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Standard cancellation rules</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-[16px] bg-[#fafafa] p-5">
              <Clock size={24} className="text-[#f97316]" />
              <h3 className="mt-4 text-[15px] font-semibold text-[#222325]">More than 2 hours notice</h3>
              <p className="mt-2 text-[14px] text-[#62646a]">Free cancellation or reschedule. No charges apply.</p>
            </div>
            <div className="rounded-[16px] bg-[#fafafa] p-5">
              <AlertCircle size={24} className="text-[#f97316]" />
              <h3 className="mt-4 text-[15px] font-semibold text-[#222325]">Less than 2 hours notice</h3>
              <p className="mt-2 text-[14px] text-[#62646a]">A ₹150 convenience fee may apply to cover travel time.</p>
            </div>
            <div className="rounded-[16px] bg-[#fafafa] p-5">
              <CheckCircle size={24} className="text-[#f97316]" />
              <h3 className="mt-4 text-[15px] font-semibold text-[#222325]">Plumber late or no-show</h3>
              <p className="mt-2 text-[14px] text-[#62646a]">You can cancel free of charge and request a replacement.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">How to cancel or reschedule</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-[15px] text-[#62646a]">
            <li>Open your dashboard and select the booking.</li>
            <li>Tap Cancel or Reschedule and choose a reason.</li>
            <li>Confirm the action. Any applicable fee will be shown before you proceed.</li>
          </ol>
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Refund timeline</h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#62646a]">
            Approved refunds are processed within 5–7 working days to the original payment method. If you paid cash on delivery, our support team will arrange a bank transfer.
          </p>
        </div>

        <div className="rounded-[20px] bg-[#fff7ed] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <RefreshCcw size={22} className="mt-0.5 shrink-0 text-[#f97316]" />
            <div>
              <h2 className="text-[17px] font-semibold text-[#7c2d12]">Prefer to reschedule?</h2>
              <p className="mt-1 text-[15px] leading-[1.6] text-[#7c2d12]/80">
                Rescheduling is free when done at least 2 hours before the visit. You can pick the next available slot from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
