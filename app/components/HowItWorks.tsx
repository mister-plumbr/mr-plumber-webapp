import { Camera, ClipboardCheck, FileText, Wrench, CreditCard, Star } from "./icons";

const steps = [
  {
    icon: Camera,
    title: "Upload photos",
    description: "Snap 3–10 photos of the issue and describe what's happening.",
  },
  {
    icon: ClipboardCheck,
    title: "Expert review",
    description: "Our operations team examines every photo and adds internal notes.",
  },
  {
    icon: FileText,
    title: "Receive estimate",
    description: "Get a transparent price range before any work begins.",
  },
  {
    icon: Wrench,
    title: "Plumber assigned",
    description: "A verified plumber nearest to you is dispatched to your home.",
  },
  {
    icon: CreditCard,
    title: "Pay after job",
    description: "Review the completed work and pay only when you're satisfied.",
  },
  {
    icon: Star,
    title: "Rate & invoice",
    description: "Get a digital invoice and rate your plumber for future customers.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-[#f97316]">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-[#222325] md:text-heading-lg">
            From leak to fixed, simply.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-[#62646a] md:text-[18px]">
            No hidden charges. No surprise visits. Just real plumbers reviewing your
            issue and giving you an honest quote.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-[20px] border border-[#e4e4e7] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#f97316]/30 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#fff7ed] text-[#f97316] transition-colors group-hover:bg-[#f97316] group-hover:text-white">
                <step.icon size={26} />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#222325] text-[12px] font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#222325]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#62646a]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
