import Link from "next/link";
import Icon from "./Icon";

export default function Hero() {
  return (
    <>
      {/* Desktop hero */}
      <section className="relative hidden min-h-[700px] items-center overflow-hidden bg-primary py-16 text-on-primary lg:min-h-[819px] md:flex">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary via-primary/80 to-transparent" />

        <div className="relative z-20 mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-secondary-container px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-secondary-container">
              Reliable & Transparent
            </span>

            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[48px] lg:leading-[1.1]">
              Plumbing fixed
              <br />
              <span className="text-secondary-container">without the guesswork.</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed opacity-90">
              Tired of waiting for quotes? Upload a photo of your issue and get an
              instant, transparent estimate. Professional service delivered with
              surgical efficiency.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/upload"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-4 text-base font-bold text-on-secondary transition-all hover:opacity-90 active:scale-95"
              >
                Get Free Estimate
                <Icon name="arrow_forward" size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-on-primary px-7 py-4 text-base font-bold text-on-primary transition-all hover:bg-on-primary hover:text-primary"
              >
                How it works
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-primary bg-surface-dim" />
                <div className="h-10 w-10 rounded-full border-2 border-primary bg-surface-container" />
                <div className="h-10 w-10 rounded-full border-2 border-primary bg-secondary" />
              </div>
              <p className="text-sm opacity-80">Joined by 2,000+ happy homeowners this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="relative overflow-hidden px-6 pt-12 pb-20 md:hidden">
        <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-mobile-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-surface/60" />
        </div>
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-surface-container opacity-50 blur-3xl" />

        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-variant px-3 py-1">
            <Icon name="verified" size={16} className="text-secondary" />
            <span className="text-xs font-medium text-on-surface-variant">Top-Rated Local Service</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-primary">
            Plumbing fixed without the <span className="text-secondary">guesswork</span>.
          </h1>

          <p className="mb-8 max-w-md text-lg text-on-surface-variant">
            Professional plumbing solutions with upfront pricing, real-time tracking,
            and verified experts.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-full bg-secondary-container py-4 text-lg font-semibold text-on-secondary-container shadow-lg transition-transform active:scale-95"
            >
              Get Free Estimate
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary py-4 text-lg font-semibold text-primary transition-all active:bg-primary active:text-white"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
