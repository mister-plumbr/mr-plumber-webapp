import Link from "next/link";
import { ArrowRight } from "./icons";

const quickTags = [
  "Tap leak",
  "Pipe burst",
  "Drain clog",
  "Water heater",
  "Bathroom fitting",
  "Toilet repair",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#222325]">
      {/* Background gradient overlay for theatrical stage feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#222325] via-[#2a2b2d] to-[#1a1b1d]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#f97316_0%,_transparent_40%)]" />

      <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-display text-white">
            Plumbing fixed
            <br />
            <span className="text-[#f97316]">without the guesswork.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-[1.5] text-[#dadbdd]">
            Upload photos of your issue. Our plumbing experts review them and
            send a fair estimate. Book a verified plumber and pay only after the
            job is done.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#f97316] px-7 py-3.5 text-[16px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
            >
              Get free estimate
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-[8px] border border-white/30 px-7 py-3.5 text-[16px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              How it works
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {quickTags.map((tag) => (
              <Link
                key={tag}
                href="/upload"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#f97316] px-4 py-2 text-[14px] font-normal text-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors"
              >
                {tag}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
