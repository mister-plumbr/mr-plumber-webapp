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
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#dadbdd] bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-xl font-semibold tracking-tight text-[#222325]">
                mister plumbr
                <span className="text-[#f97316]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.57] text-[#62646a]">
              Verified plumbers, transparent estimates, and human-reviewed
              service requests. Plumbing made simple for Indian homes.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[16px] font-semibold text-[#222325]">
                {category}
              </h4>
              <ul className="mt-4 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#dadbdd] pt-8 sm:flex-row">
          <p className="text-[14px] text-[#74767e]">
            © {new Date().getFullYear()} Mister Plumbr. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[14px] text-[#62646a] hover:text-[#f97316] transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
