import PageShell from "../components/PageShell";
import { HelpCircle } from "../components/icons";

const faqs = [
  {
    category: "Booking",
    items: [
      { q: "How do I book a plumbing service?", a: "Click Get estimate, fill in the issue details, upload photos and submit. We will review and send an estimate within 2 hours." },
      { q: "Can I book for the same day?", a: "Yes. We offer same-day visits based on slot availability. Emergency requests are prioritized." },
      { q: "Do I need to be home during the visit?", a: "An adult should be present to approve the estimate and inspect the completed work." },
    ],
  },
  {
    category: "Pricing & payment",
    items: [
      { q: "Is the estimate free?", a: "Yes. The estimate is free and you are not obligated to proceed." },
      { q: "What if the final cost is higher than the estimate?", a: "The plumber must explain any change and get your approval before continuing." },
      { q: "When do I pay?", a: "You pay only after the job is completed and you are satisfied." },
    ],
  },
  {
    category: "Service quality",
    items: [
      { q: "Are your plumbers verified?", a: "Yes. Every plumber is ID-verified, background-checked and reviewed after each job." },
      { q: "What if the problem comes back?", a: "We offer a service warranty. If the same issue recurs, we will revisit at no extra cost." },
      { q: "Do you provide spare parts?", a: "Plumbers carry common spares. For branded or special parts, we source them and add the cost transparently." },
    ],
  },
  {
    category: "Cancellations",
    items: [
      { q: "How do I cancel a booking?", a: "Go to your dashboard, select the booking and tap Cancel. Cancellations more than 2 hours before the visit are free." },
      { q: "Can I reschedule instead?", a: "Yes. Rescheduling is free up to 2 hours before the visit." },
    ],
  },
];

export default function FAQsPage() {
  return (
    <PageShell title="FAQs" subtitle="Answers to the most common questions about Mister Plumbr.">
      <div className="space-y-10">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-[18px] font-semibold text-[#222325]">{section.category}</h2>
            <div className="mt-5 space-y-4">
              {section.items.map((faq) => (
                <div key={faq.q} className="rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                    <div>
                      <p className="text-[15px] font-semibold text-[#222325]">{faq.q}</p>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#62646a]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
