"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "../components/Icon";
import Footer from "../components/Footer";

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
    <div className="flex min-h-screen flex-col bg-bg-main">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest shadow-sm">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Icon name="plumbing" filled className="text-secondary" size={28} />
            Mister Plumbr
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/#services" className="text-base text-on-surface-variant hover:text-secondary">
              Services
            </Link>
            <Link href="/#how-it-works" className="text-base text-on-surface-variant hover:text-secondary">
              How it works
            </Link>
            <Link href="/#footer" className="text-base text-on-surface-variant hover:text-secondary">
              Support
            </Link>
          </nav>
          <Link
            href="/upload"
            className="rounded-full bg-secondary px-5 py-2 text-sm font-bold text-on-secondary hover:opacity-90 active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/login-bg.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-[440px]">
          <div className="rounded-xl border border-border-subtle bg-surface-card p-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] md:p-12">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-semibold text-primary">Create your account</h1>
              <p className="mt-2 text-base text-on-surface-variant">
                Join Mister Plumbr to book verified plumbers in minutes.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Rahul"
                    className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main px-4 py-3 text-base text-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Sharma"
                    className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main px-4 py-3 text-base text-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Mobile number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main px-4 py-3 text-base text-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main px-4 py-3 text-base text-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main px-4 py-3 text-base text-primary"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-on-surface-variant">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border-subtle text-secondary focus:ring-secondary" />
                <span>
                  I agree to the{" "}
                  <Link href="#" className="text-secondary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-secondary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary-container py-3.5 text-lg font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                <Icon name="arrow_forward" size={20} />
              </button>
            </form>

            <p className="mt-6 text-center text-base text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-secondary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
