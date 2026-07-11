"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../components/icons";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
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

          {error && (
            <div className="mt-4 rounded-[8px] bg-red-50 px-4 py-2 text-[14px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222325]">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
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
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
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
                name="email"
                required
                value={form.email}
                onChange={handleChange}
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
                name="password"
                required
                value={form.password}
                onChange={handleChange}
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

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-[8px] bg-[#222325] px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-[#111] disabled:opacity-60 transition-colors"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
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
