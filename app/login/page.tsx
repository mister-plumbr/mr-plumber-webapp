"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "../components/Icon";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        {/* Atmospheric background */}
        <div className="pointer-events-none absolute inset-0 opacity-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/login-bg.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-[440px]">
          {/* Login card */}
          <div className="rounded-xl border border-border-subtle bg-surface-card p-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] md:p-12">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
              <p className="mt-2 text-base text-on-surface-variant">
                Log in to manage your plumbing services.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Email Address
                </label>
                <div className="relative">
                  <Icon
                    name="mail"
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors peer-focus:text-secondary"
                  />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main py-3 pl-12 pr-4 text-base text-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Password
                </label>
                <div className="relative">
                  <Icon
                    name="lock"
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors peer-focus:text-secondary"
                  />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-focus-ring w-full rounded-lg border border-border-subtle bg-bg-main py-3 pl-12 pr-4 text-base text-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border-subtle text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm text-on-surface-variant">Remember me</span>
                </label>
                <Link href="#" className="text-sm font-medium text-secondary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-secondary-container py-3.5 text-lg font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
                <Icon name="arrow_forward" size={20} />
              </button>
            </form>

            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-border-subtle" />
              <span className="mx-4 shrink-0 text-xs font-medium uppercase text-outline">
                Or continue with
              </span>
              <div className="flex-grow border-t border-border-subtle" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-border-subtle bg-surface-container-lowest py-3.5 text-base font-semibold text-primary transition-colors hover:bg-surface-container active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-base text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-secondary hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-60 grayscale transition-all hover:grayscale-0">
            <div className="flex items-center gap-1 text-sm">
              <Icon name="verified_user" size={18} />
              <span>Secure Portal</span>
            </div>
            <div className="h-4 w-px bg-outline-variant" />
            <div className="flex items-center gap-1 text-sm">
              <Icon name="emergency_home" size={18} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
