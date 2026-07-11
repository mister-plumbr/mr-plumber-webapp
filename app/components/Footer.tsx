import Link from "next/link";
import { Logo } from "./icons";

const footerLinks = {
  Services: [
    "Tap Repair",
    "Pipe Leak",
    "Drain Cleaning",
    "Toilet Repair",
    "Water Heater",
    "Bathroom Fitting",
  ],
  Company: ["About us", "How it works", "Careers", "Press", "Contact"],
  Support: ["Help Center", "Safety", "Cancellation", "Complaints", "FAQs"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#e4e4e7] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
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
            <div className="mt-6 flex gap-4">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dadbdd] text-[12px] font-semibold text-[#62646a] hover:border-[#f97316] hover:text-[#f97316] transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#222325]">
                {category}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[15px] text-[#62646a] hover:text-[#f97316] transition-colors"
                    >
                      {link}
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
            {["Privacy", "Terms", "Sitemap"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
