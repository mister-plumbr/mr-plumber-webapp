import Link from "next/link";
import { Logo } from "../../components/icons";

export default function OpsLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#222325]">
      <div className="flex h-16 items-center border-b border-white/10 bg-[#222325] px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-semibold tracking-tight text-white">
            mister plumbr<span className="text-[#f97316]">.</span>
          </span>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-[16px] border border-white/10 bg-[#2a2b2d] p-8 shadow-sm">
          <div className="mb-2 inline-flex rounded-full bg-[#f97316]/10 px-3 py-1 text-[12px] font-semibold text-[#f97316]">
            Operations Portal
          </div>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-white">
            Operations sign in
          </h1>
          <p className="mt-2 text-[14px] text-[#dadbdd]">
            Review requests, build estimates, and assign verified plumbers.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-[14px] font-semibold text-white">
                Staff email
              </label>
              <input
                type="email"
                required
                placeholder="ops@misterplumbr.in"
                className="mt-2 w-full rounded-[12px] border border-[#62646a] bg-[#222325] px-4 py-3 text-[16px] text-white placeholder:text-[#74767e]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-white">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-[12px] border border-[#62646a] bg-[#222325] px-4 py-3 text-[16px] text-white placeholder:text-[#74767e]"
              />
            </div>

            <Link
              href="/ops/dashboard"
              className="flex w-full items-center justify-center rounded-[8px] bg-[#f97316] px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
            >
              Enter operations dashboard
            </Link>
          </form>

          <div className="mt-6 text-center text-[14px] text-[#74767e]">
            Internal use only. Need access? Contact your admin.
          </div>
        </div>
      </main>
    </div>
  );
}
