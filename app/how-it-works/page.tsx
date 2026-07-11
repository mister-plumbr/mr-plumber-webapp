import PageShell from "../components/PageShell";
import { Camera, ClipboardCheck, Wrench, CreditCard, Star, Clock } from "../components/icons";

const steps = [
  {
    icon: Camera,
    title: "Describe the issue",
    text: "Select the service, add a few details and upload photos or a short video of the problem. The more we see, the better the estimate.",
  },
  {
    icon: ClipboardCheck,
    title: "Get a fair estimate",
    text: "Our plumbing experts review your request and send a clear estimate with labour, parts and timeline — usually within 2 hours.",
  },
  {
    icon: Wrench,
    title: "A verified plumber fixes it",
    text: "Accept the estimate and we assign a background-checked plumber. You can track status from assignment to completion.",
  },
  {
    icon: CreditCard,
    title: "Pay after service",
    text: "Review the completed work and pay only after you are satisfied. Invoices are generated in the app for easy record-keeping.",
  },
];

const benefits = [
  { icon: Clock, title: "2-hour estimate turnaround", text: "No waiting all day for a quote." },
  { icon: Star, title: "Verified & rated plumbers", text: "Every technician is vetted and reviewed." },
  { icon: CreditCard, title: "Transparent pricing", text: "Know the cost before work begins." },
];

export default function HowItWorksPage() {
  return (
    <PageShell title="How it works" subtitle="Four simple steps from plumbing problem to fixed.">
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#fff7ed] text-[#f97316]">
                  <step.icon size={24} />
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-[#f97316]">Step {idx + 1}</span>
                  <h2 className="mt-1 text-[18px] font-semibold text-[#222325]">{step.title}</h2>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#62646a]">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Why this works better</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-[16px] bg-[#fafafa] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                  <b.icon size={20} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#222325]">{b.title}</h3>
                <p className="mt-1 text-[14px] text-[#62646a]">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
