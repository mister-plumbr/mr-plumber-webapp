"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo, ArrowRight, CheckCircle } from "../components/icons";

const benefits = [
  "Track all your plumbing requests",
  "Accept or reject estimates instantly",
  "Download invoices and rate plumbers",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rahul@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden flex-col justify-between bg-[#222325] p-10 lg:flex lg:w-[45%] xl:w-[40%]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={36} />
            <span className="text-[22px] font-semibold tracking-tight text-white">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
        </div>

        <div>
          <h2 className="text-[36px] font-light leading-[1.1] tracking-tight text-white">
            Welcome back to
            <br />
            <span className="text-[#f97316]">smarter plumbing.</span>
          </h2>
          <div className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-[15px] text-[#dadbdd]">
                <CheckCircle size={18} className="text-[#f97316]" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[13px] text-[#74767e]">
          © {new Date().getFullYear()} Mister Plumbr. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col bg-white">
        <div className="flex h-16 items-center px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[18px] font-semibold tracking-tight text-[#222325]">
              mister plumbr<span className="text-[#f97316]">.</span>
            </span>
          </Link>
        </div>

        <main className="flex flex-1 items-center justify-center px-5 py-12">
          <div className="w-full max-w-[420px]">
            <h1 className="text-[32px] font-semibold tracking-tight text-[#222325]">
              Sign in to your account
            </h1>
            <p className="mt-2 text-[15px] text-[#62646a]">
              Track your requests, view estimates, and manage bookings.
            </p>

            {error && (
              <div className="mt-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-[14px] font-semibold text-[#222325]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222325]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[14px] text-[#62646a]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#f97316]"
                  />
                  Remember me
                </label>
                <Link
                  href="#"
                  className="text-[14px] font-semibold text-[#f97316] hover:text-[#ea580c]"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#f97316] px-6 py-3.5 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] disabled:opacity-60 transition-colors"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 text-center text-[14px] text-[#62646a]">
              New to Mister Plumbr?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#f97316] hover:text-[#ea580c]"
              >
                Create an account
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e4e4e7]" />
              <span className="text-[12px] text-[#74767e]">OR</span>
              <div className="h-px flex-1 bg-[#e4e4e7]" />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#dadbdd] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#222325] hover:bg-[#fafafa] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
