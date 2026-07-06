import Link from "next/link";
import { Logo } from "../components/icons";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff7ed]">
      <div className="flex h-16 items-center border-b border-[#dadbdd] bg-white px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-semibold tracking-tight text-[#222325]">
            mister plumbr<span className="text-[#f97316]">.</span>
          </span>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[16px] border border-[#dadbdd] bg-white p-8 shadow-sm">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-[#222325]">
            Create your account
          </h1>
          <p className="mt-2 text-[14px] text-[#62646a]">
            Join Mister Plumbr to book verified plumbers in minutes.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222325]">
                  First name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul"
                  className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222325]">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sharma"
                  className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222325]">
                Mobile number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222325]">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222325]">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
              />
            </div>

            <label className="flex items-start gap-2 text-[14px] text-[#62646a]">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-[#f97316]"
              />
              I agree to the{" "}
              <Link href="#" className="text-[#f97316] hover:text-[#ea580c]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#f97316] hover:text-[#ea580c]">
                Privacy Policy
              </Link>
            </label>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-[8px] bg-[#222325] px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-[#111] transition-colors"
            >
              Create account
            </Link>
          </form>

          <div className="mt-6 text-center text-[14px] text-[#62646a]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#f97316] hover:text-[#ea580c]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
