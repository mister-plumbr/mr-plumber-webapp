import Link from "next/link";
import Icon from "./Icon";

export default function Footer() {
  return (
    <>
      {/* Desktop */}
      <footer id="footer" className="hidden bg-primary text-on-primary md:block">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 px-6 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Icon name="plumbing" filled className="text-secondary" size={28} />
              Mister Plumbr
            </div>
            <p className="mb-6 text-base leading-relaxed opacity-80">
              Professional plumbing excellence. High-trust utility dashboards for your
              home maintenance needs.
            </p>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary">
                <Icon name="share" size={20} />
              </div>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary">
                <Icon name="contact_support" size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Services</h4>
            <ul className="space-y-3">
              {["Emergency Services", "Pipe Repair", "Drainage", "Installations"].map((item) => (
                <li key={item}>
                  <Link href="/upload" className="text-base opacity-80 transition-colors hover:text-secondary-container">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <ul className="space-y-3">
              {["Customer Reviews", "Pricing Guide", "Our Story", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-base opacity-80 transition-colors hover:text-secondary-container">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Get in touch</h4>
            <p className="mb-4 text-base opacity-80">
              Available 24/7 for emergency repairs in your local area.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-1 flex items-center gap-2 font-bold text-secondary-fixed">
                <Icon name="phone_in_talk" size={18} />
                1-800-PLUMBR
              </div>
              <div className="text-xs opacity-60">Professional help is just a call away</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
            <div className="text-sm opacity-60">
              © 2024 Mister Plumbr. Professional Plumbing Excellence.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="opacity-60 transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="opacity-60 transition-colors hover:text-white">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile */}
      <footer className="mb-16 flex w-full flex-col items-center space-y-4 bg-primary px-6 py-8 text-center text-on-primary md:hidden">
        <div className="text-xl font-bold">Mister Plumbr</div>
        <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
          <Link href="/upload" className="transition-opacity hover:opacity-100">
            Emergency Help
          </Link>
          <Link href="#" className="transition-opacity hover:opacity-100">
            Terms of Service
          </Link>
          <Link href="#" className="transition-opacity hover:opacity-100">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-opacity hover:opacity-100">
            Contact Support
          </Link>
        </div>
        <div className="text-xs opacity-60">© 2024 Mister Plumbr. High-Trust Utility.</div>
      </footer>
    </>
  );
}
