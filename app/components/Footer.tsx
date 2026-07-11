import Link from "next/link";
import { Logo } from "./icons";

const footerLinks = {
  Services: [
    { label: "Tap Repair", href: "/services/tap-repair" },
    { label: "Pipe Leak", href: "/services/pipe-leak" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Toilet Repair", href: "/services/toilet-repair" },
    { label: "Water Heater", href: "/services/water-heater" },
    { label: "Bathroom Fitting", href: "/services/bathroom-fitting" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety", href: "/safety" },
    { label: "Cancellation", href: "/cancellation" },
    { label: "Complaints", href: "/complaints" },
    { label: "FAQs", href: "/faqs" },
  ],
};

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e4e4e7] bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="text-[20px] font-semibold tracking-tight text-[#222325]">
                mister plumbr
                <span className="text-[#f97316]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-[#62646a]">
              Verified plumbers, transparent estimates, and human-reviewed
              service requests. Plumbing made simple for Indian homes.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#222325]">
                {category}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-[#62646a] hover:text-[#f97316] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e4e4e7] pt-8 sm:flex-row">
          <p className="text-[14px] text-[#74767e]">
            © {new Date().getFullYear()} Mister Plumbr. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
