import Icon from "./Icon";

const steps = [
  { icon: "upload_file", number: "01", title: "Upload", description: "Snap a photo of the leak or issue." },
  { icon: "rate_review", number: "02", title: "Review", description: "Our experts analyze the situation." },
  { icon: "payments", number: "03", title: "Estimate", description: "Receive a guaranteed fixed price." },
  { icon: "engineering", number: "04", title: "Assigned", description: "A pro is dispatched to your home." },
  { icon: "check_circle", number: "05", title: "Pay", description: "Safe & secure digital payment." },
  { icon: "star", number: "06", title: "Rate", description: "Help us maintain our standards." },
];

const mobileSteps = [
  { number: "01", title: "Photo Upload", description: "Snap the issue for accurate pricing." },
  { number: "02", title: "Instant Quote", description: "No hidden fees or surprises." },
  { number: "03", title: "Expert Match", description: "Certified local pros only." },
  { number: "04", title: "Live Tracking", description: "Watch their arrival in real-time." },
  { number: "05", title: "Quality Fix", description: "Work backed by our warranty." },
  { number: "06", title: "Easy Pay", description: "Secure digital checkout." },
];

export default function HowItWorks() {
  return (
    <>
      {/* Desktop */}
      <section id="how-it-works" className="hidden bg-bg-main py-16 lg:py-24 md:block">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 text-center lg:mb-14">
            <h2 className="mb-3 text-3xl font-semibold text-primary">Modern Service Flow</h2>
            <p className="mx-auto max-w-xl text-on-surface-variant">
              Our 6-step systematic process ensures transparency and speed from the
              first photo to the final rating.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step) => (
              <div
                key={step.title}
                className="process-card flex flex-col items-center rounded-xl border border-border-subtle bg-surface-card p-6 text-center shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-secondary">
                  <Icon name={step.icon} filled size={24} />
                </div>
                <span className="mb-1 text-xs font-bold text-secondary-container">{step.number}</span>
                <h3 className="mb-1 text-base font-semibold">{step.title}</h3>
                <p className="text-xs text-on-surface-variant">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="bg-primary px-6 py-12 text-white rounded-t-[32px] md:hidden">
        <h2 className="mb-10 text-center text-2xl font-semibold">Reliable Service Blueprint</h2>
        <div className="grid grid-cols-2 gap-4">
          {mobileSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-on-primary-container/20 bg-primary-container p-4"
            >
              <div className="mb-1 text-xl font-bold text-secondary">{step.number}</div>
              <h3 className="mb-1 text-sm font-bold">{step.title}</h3>
              <p className="text-xs opacity-70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
