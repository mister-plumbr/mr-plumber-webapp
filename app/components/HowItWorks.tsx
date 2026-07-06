import { Camera, ClipboardCheck, FileText, Wrench, CreditCard, Star } from "./icons";

const steps = [
  {
    icon: Camera,
    title: "Upload photos",
    description: "Snap 3–10 photos of the issue and tell us what’s happening.",
  },
  {
    icon: ClipboardCheck,
    title: "Expert review",
    description: "Our operations team examines the photos and adds internal notes.",
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
    description: "Review the completed work and pay only when you’re satisfied.",
  },
  {
    icon: Star,
    title: "Rate & invoice",
    description: "Get a digital invoice and rate your plumber for future customers.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-heading-lg text-[#222325]">
            From leak to fixed, simply.
          </h2>
          <p className="mt-4 text-[18px] leading-[1.5] text-[#62646a]">
            No hidden charges. No surprise visits. Just real plumbers reviewing
            your issue and giving you an honest quote.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col rounded-[16px] bg-white p-6 border border-[#dadbdd] hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff7ed] text-[#f97316]">
                <step.icon size={24} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f97316] text-[10px] font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="text-[18px] font-semibold leading-[1.2] text-[#222325]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-[14px] leading-[1.57] text-[#62646a]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
