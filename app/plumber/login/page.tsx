"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/icons";

export default function PlumberLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+919876567890");
  const [pin, setPin] = useState("plumber123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/plumber/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/plumber/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#7c2d12]">
      <div className="flex h-16 items-center border-b border-white/10 bg-[#7c2d12] px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-semibold tracking-tight text-white">
            mister plumbr<span className="text-[#f97316]">.</span>
          </span>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
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

          {error && (
            <div className="mt-4 rounded-[8px] bg-red-50 px-4 py-2 text-[14px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-[14px] font-semibold text-white">
                Mobile number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                maxLength={20}
                className="mt-2 w-full rounded-[12px] border border-white/20 bg-[#7c2d12] px-4 py-3 text-[16px] text-white placeholder:text-[#fdba74]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-[8px] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#7c2d12] hover:bg-[#fff7ed] disabled:opacity-60 transition-colors"
            >
              {loading ? "Signing in..." : "Start my day"}
            </button>
          </form>

          <div className="mt-6 text-center text-[14px] text-[#fed7aa]">
            Verified plumbers only. Contact support if you need access.
          </div>
        </div>
      </main>
    </div>
  );
}
