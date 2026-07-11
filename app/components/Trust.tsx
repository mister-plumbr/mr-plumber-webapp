import Link from "next/link";
import { ShieldCheck, Clock, Star, ArrowRight, CheckCircle } from "./icons";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified plumbers",
    description: "Every plumber is background-checked, trained, and rated by customers like you.",
  },
  {
    icon: Clock,
    title: "Fast response",
    description: "Get an estimate within hours and same-day service for emergencies.",
  },
  {
    icon: Star,
    title: "Fair pricing",
    description: "No hidden charges. You approve the estimate before any work starts.",
  },
];

const stats = [
  { value: "4.9", label: "Average rating", suffix: "★" },
  { value: "30m", label: "First response time" },
  { value: "2,000+", label: "Homes serviced" },
  { value: "₹650", label: "Starting estimate" },
];

export default function Trust() {
  return (
    <section className="bg-[#222325] py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#f97316]">
              Why Mister Plumbr
            </span>
            <h2 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
              Why homeowners trust us
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#dadbdd]">
              We combine expert human review with verified local plumbers so you
              get the right fix at the right price — every time.
            </p>

            <div className="mt-10 space-y-6">
              {trustItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#f97316]">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-[1.6] text-[#dadbdd]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/upload"
              className="group mt-10 inline-flex items-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get your estimate
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats panel */}
          <div className="rounded-[28px] border border-[#e4e4e7] bg-white p-7 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] md:p-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[34px] font-semibold leading-none tracking-tight text-[#222325] md:text-[40px]">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-2xl text-[#f97316]">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[14px] text-[#62646a]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#e4e4e7] pt-8">
              <div className="rounded-[20px] bg-[#fafafa] px-6 py-5 md:px-8 md:py-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#f97316]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} />
                    ))}
                  </div>
                  <span className="text-[15px] font-semibold text-[#222325]">4.9</span>
                </div>
                <p className="mt-3 text-[16px] leading-[1.65] text-[#62646a]">
                  &quot;Quick diagnosis and clean work. The plumber arrived on time and the estimate was fair. Would recommend.&quot;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f97316] text-[14px] font-bold text-white">
                    SR
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#222325]">Sneha Rao</p>
                    <p className="text-[13px] text-[#74767e]">Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
