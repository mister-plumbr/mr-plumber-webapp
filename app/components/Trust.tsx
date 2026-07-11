import Icon from "./Icon";

const stats = [
  { value: "4.9/5", label: "Average Rating" },
  { value: "30m", label: "Avg Response" },
  { value: "2k+", label: "Homes Serviced" },
  { value: "100%", label: "Guarantee" },
];

export default function Trust() {
  return (
    <>
      {/* Desktop */}
      <section className="hidden overflow-hidden bg-bg-main py-16 lg:py-24 md:block">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h2 className="mb-4 text-3xl font-semibold text-primary">Why homeowners trust us</h2>
              <p className="mb-8 text-lg text-on-surface-variant">
                We&apos;ve built our reputation on three core pillars: absolute
                transparency, rapid response, and masterful craftsmanship.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-surface-container p-6">
                    <div className="mb-1 text-3xl font-bold text-secondary">{stat.value}</div>
                    <div className="text-sm font-medium text-on-surface-variant">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="relative overflow-hidden rounded-2xl shadow-xl lg:h-[500px]"
                style={{
                  backgroundImage: "url('/images/trust-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <div className="rounded-xl border border-white/20 bg-surface-card/90 p-6 backdrop-blur-md">
                    <div className="mb-3 flex gap-1 text-success-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="star" filled size={18} />
                      ))}
                    </div>
                    <p className="mb-4 text-lg italic text-primary">
                      &ldquo;Finally, a plumbing service that feels like it&apos;s from the 21st
                      century. The photo estimate was spot on, and the plumber was here in
                      20 minutes. No surprises, just excellence.&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-secondary-fixed" />
                      <div>
                        <div className="font-bold text-primary">Sarah Jenkins</div>
                        <div className="text-xs text-on-surface-variant">Verified Homeowner</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="mx-6 mb-12 rounded-3xl bg-surface-container-low px-6 py-12 md:hidden">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-2 flex gap-1 text-success-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" filled size={18} />
            ))}
          </div>
          <div className="text-2xl font-semibold text-primary">4.9/5 Rating</div>
          <p className="text-sm text-on-surface-variant">Based on 12,000+ satisfied homes</p>
        </div>

        <div className="relative rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
          <Icon
            name="format_quote"
            size={40}
            className="absolute -top-4 -left-2 text-secondary opacity-30"
          />
          <p className="mb-6 text-base italic text-primary">
            &ldquo;Mister Plumbr turned a late-night kitchen flood from a disaster into a minor
            hiccup. The price was exactly what the app quoted, and I could track the
            plumber&apos;s arrival perfectly.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-surface-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/avatar-sarah.jpg" alt="Sarah Jenkins" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-bold text-primary">Sarah Jenkins</div>
              <div className="text-xs text-on-surface-variant">Verified Homeowner</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
