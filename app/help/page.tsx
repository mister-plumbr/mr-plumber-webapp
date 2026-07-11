import Link from "next/link";
import PageShell from "../components/PageShell";
import { HelpCircle, MessageCircle, FileText, Phone, ArrowRight } from "../components/icons";

const topics = [
  { icon: HelpCircle, title: "FAQs", href: "/faqs", text: "Answers to booking, pricing and service questions." },
  { icon: FileText, title: "Cancellation & refunds", href: "/cancellation", text: "How to cancel or reschedule and what charges apply." },
  { icon: MessageCircle, title: "Complaints", href: "/complaints", text: "Report an issue and learn how we resolve disputes." },
  { icon: Phone, title: "Contact us", href: "/contact", text: "Phone, email and office details for urgent help." },
];

export default function HelpPage() {
  return (
    <PageShell title="Help Center" subtitle="Find answers, manage your booking or reach our support team.">
      <div className="space-y-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#f97316] hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                <t.icon size={20} />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-[#222325] group-hover:text-[#f97316]">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#62646a]">{t.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#f97316]">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Quick answers</h2>
          <div className="mt-6 space-y-4">
            {[
              { q: "How do I book a service?", a: "Click Get estimate, choose your issue, upload photos and submit. We will send an estimate within 2 hours." },
              { q: "Can I choose a plumber?", a: "We assign the nearest verified plumber for fastest response. You can see their name, rating and ETA before they arrive." },
              { q: "What if the issue is different from what I described?", a: "The plumber will inspect on-site and update the estimate if the scope changes. You approve before work continues." },
              { q: "How do I pay?", a: "Pay online after the job is complete. An invoice is available in your dashboard." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-[12px] border border-[#e4e4e7] p-4">
                <p className="text-[15px] font-semibold text-[#222325]">{faq.q}</p>
                <p className="mt-1 text-[14px] leading-[1.6] text-[#62646a]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
