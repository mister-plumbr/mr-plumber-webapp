import Link from "next/link";
import { Logo } from "../../components/icons";

export default function PlumberLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#7c2d12]">
      <div className="flex h-16 items-center border-b border-white/10 bg-[#7c2d12] px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-semibold tracking-tight text-white">
            mister plumbr<span className="text-[#f97316]">.</span>
          </span>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[16px] border border-white/10 bg-[#9a3412] p-8 shadow-sm">
          <div className="mb-2 inline-flex rounded-full bg-[#f97316]/20 px-3 py-1 text-[12px] font-semibold text-white">
            Technician App
          </div>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-white">
            Plumber sign in
          </h1>
          <p className="mt-2 text-[14px] text-[#fed7aa]">
            View assigned jobs, update status, and collect payment on the go.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-[14px] font-semibold text-white">
                Mobile number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 12345"
                className="mt-2 w-full rounded-[12px] border border-white/20 bg-[#7c2d12] px-4 py-3 text-[16px] text-white placeholder:text-[#fdba74]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-white">
                PIN
              </label>
              <input
                type="password"
                required
                placeholder="••••"
                maxLength={4}
                className="mt-2 w-full rounded-[12px] border border-white/20 bg-[#7c2d12] px-4 py-3 text-[16px] text-white placeholder:text-[#fdba74]"
              />
            </div>

            <Link
              href="/plumber/dashboard"
              className="flex w-full items-center justify-center rounded-[8px] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#7c2d12] hover:bg-[#fff7ed] transition-colors"
            >
              Start my day
            </Link>
          </form>

          <div className="mt-6 text-center text-[14px] text-[#fed7aa]">
            Verified plumbers only. Contact support if you need access.
          </div>
        </div>
      </main>
    </div>
  );
}
