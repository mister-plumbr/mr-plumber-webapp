import { ShieldCheck, Clock, Star } from "./icons";
import Link from "next/link";
import { ArrowRight } from "./icons";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified plumbers",
    description: "Every plumber is background-checked, trained, and rated by customers.",
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

export default function Trust() {
  return (
    <section className="bg-[#222325] py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-heading-lg text-white">
              Why homeowners trust Mister Plumbr
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#dadbdd]">
              We combine expert human review with verified local plumbers so you
              get the right fix at the right price — every time.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {trustItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#f97316]">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-[1.57] text-[#dadbdd]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/upload"
              className="mt-10 inline-flex items-center gap-2 rounded-[8px] border border-white/30 px-7 py-3.5 text-[16px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get your estimate
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stats / social proof panel */}
          <div className="rounded-[16px] bg-[#7c2d12] p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-display text-white">4.9</div>
                <div className="mt-2 flex text-[#f97316]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} />
                  ))}
                </div>
                <p className="mt-2 text-[14px] text-white/80">
                  Average customer rating
                </p>
              </div>
              <div>
                <div className="text-display text-white">30m</div>
                <p className="mt-2 text-[14px] text-white/80">
                  Average first response time
                </p>
              </div>
              <div>
                <div className="text-display text-white">2k+</div>
                <p className="mt-2 text-[14px] text-white/80">
                  Homes serviced
                </p>
              </div>
              <div>
                <div className="text-display text-white">₹650</div>
                <p className="mt-2 text-[14px] text-white/80">
                  Starting estimate for minor leaks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
