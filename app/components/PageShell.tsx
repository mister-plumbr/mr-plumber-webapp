import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowRight } from "./icons";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showCta?: boolean;
}

export default function PageShell({ title, subtitle, children, showCta = true }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#fafafa]">
        {/* Page header */}
        <section className="border-b border-[#e4e4e7] bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-[#222325] md:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-2xl text-[17px] leading-[1.7] text-[#62646a]">
                {subtitle}
              </p>
            )}
            {showCta && (
              <Link
                href="/upload"
                className="group mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] transition-colors"
              >
                Get free estimate
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          {children}

          {showCta && (
            <div className="mt-12 rounded-[20px] bg-[#222325] p-8 text-center md:p-12">
              <h2 className="text-2xl font-medium text-white md:text-3xl">
                Ready to get your plumbing fixed?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[17px] text-[#dadbdd]">
                Upload photos, get a human-reviewed estimate and book a verified plumber — all in one place.
              </p>
              <Link
                href="/upload"
                className="group mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#f97316] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.35)] hover:bg-[#ea580c] transition-colors"
              >
                Get free estimate
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
