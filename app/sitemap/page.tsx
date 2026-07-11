import Link from "next/link";
import PageShell from "../components/PageShell";

const sections = [
  {
    title: "Services",
    links: [
      { label: "Tap Repair", href: "/services/tap-repair" },
      { label: "Pipe Leak", href: "/services/pipe-leak" },
      { label: "Drain Cleaning", href: "/services/drain-cleaning" },
      { label: "Toilet Repair", href: "/services/toilet-repair" },
      { label: "Water Heater", href: "/services/water-heater" },
      { label: "Bathroom Fitting", href: "/services/bathroom-fitting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety", href: "/safety" },
      { label: "Cancellation", href: "/cancellation" },
      { label: "Complaints", href: "/complaints" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <PageShell title="Sitemap" subtitle="All pages on Mister Plumbr in one place.">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-[16px] font-semibold text-[#222325]">{section.title}</h2>
            <ul className="mt-4 space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-[#62646a] hover:text-[#f97316] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
