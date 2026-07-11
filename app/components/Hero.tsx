import Link from "next/link";
import { ArrowRight, CheckCircle } from "./icons";

const quickTags = [
  "Tap leak",
  "Pipe burst",
  "Drain clog",
  "Water heater",
  "Bathroom fitting",
  "Toilet repair",
];

const trustPoints = [
  "Verified plumbers",
  "Estimate in 2 hours",
  "Pay after service",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#222325]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f97316_0%,_transparent_35%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#7c2d12_0%,_transparent_40%)] opacity-30" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-[#fed7aa]">
              <span className="flex h-2 w-2 rounded-full bg-[#f97316] animate-pulse" />
              Now serving Bangalore
            </div>

            <h1 className="mt-6 text-4xl font-extralight leading-[1.05] tracking-tight text-white md:text-5xl lg:text-display">
              Plumbing fixed
              <br />
              <span className="text-[#f97316]">without the guesswork.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[18px] leading-[1.6] text-[#dadbdd]">
              Upload photos of your issue. Our plumbing experts review them and
              send a fair estimate. Book a verified plumber and pay only after the
              job is done.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/upload"
                className="group inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#f97316] px-7 py-4 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.35)] hover:bg-[#ea580c] transition-all"
              >
                Get free estimate
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-[8px] border border-white/20 bg-white/5 px-7 py-4 text-[16px] font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                How it works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-[14px] text-[#dadbdd]">
                  <CheckCircle size={16} className="text-[#f97316]" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Right visual — abstract service card stack */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-[380px]">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-full bg-[#f97316] opacity-20 blur-3xl" />
              
              {/* Main card */}
              <div className="relative rounded-[24px] bg-white p-6 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff7ed] text-[#f97316]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#222325]">Leak detected</p>
                    <p className="text-[12px] text-[#74767e]">Kitchen tap • Just now</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full bg-[#f4f4f5]">
                    <div className="h-2 w-[75%] rounded-full bg-[#f97316]" />
                  </div>
                  <div className="flex justify-between text-[12px] text-[#62646a]">
                    <span>Photos uploaded</span>
                    <span className="font-medium text-[#222325]">5/10</span>
                  </div>
                </div>

                <div className="mt-6 rounded-[16px] bg-[#fff7ed] p-4">
                  <p className="text-[12px] font-semibold text-[#7c2d12]">Estimated cost</p>
                  <p className="mt-1 text-[28px] font-semibold text-[#222325]">₹650 – ₹850</p>
                  <p className="text-[12px] text-[#62646a]">Washer replacement likely needed</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-6 top-12 rounded-[16px] bg-[#222325] p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97316] text-white text-[14px] font-bold">
                    RK
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">Ramesh assigned</p>
                    <p className="text-[11px] text-[#dadbdd]">Arrives in 35 min</p>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -left-8 bottom-16 rounded-[16px] bg-white p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#f97316]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[14px] font-semibold text-[#222325]">4.9</span>
                </div>
                <p className="text-[11px] text-[#74767e]">from 2,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tags */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 md:mt-16 md:pt-8">
          <span className="text-[14px] text-[#74767e]">Popular:</span>
          {quickTags.map((tag) => (
            <Link
              key={tag}
              href="/upload"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f97316]/40 bg-[#f97316]/5 px-4 py-2 text-[14px] font-medium text-[#f97316] hover:border-[#f97316] hover:bg-[#f97316] hover:text-white transition-all"
            >
              {tag}
              <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
