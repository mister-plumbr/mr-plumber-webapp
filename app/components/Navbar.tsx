"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Icon from "./Icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-lowest/95 py-2 shadow-sm backdrop-blur-md"
          : "bg-surface-container-lowest py-4 shadow-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Icon name="plumbing" filled className="text-secondary" size={28} />
          Mister Plumbr
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#services" className="text-base text-on-surface-variant transition-opacity hover:text-secondary">
            Services
          </Link>
          <Link href="/#how-it-works" className="text-base text-on-surface-variant transition-opacity hover:text-secondary">
            How it works
          </Link>
          <Link href="/#footer" className="text-base text-on-surface-variant transition-opacity hover:text-secondary">
            Support
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/upload"
            className="rounded-full bg-secondary px-5 py-2 text-sm font-bold text-on-secondary transition-transform hover:opacity-90 active:scale-95"
          >
            Book Now
          </Link>
          <button
            type="button"
            className="md:hidden text-primary"
            aria-label="Open menu"
          >
            <Icon name="menu" size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}
