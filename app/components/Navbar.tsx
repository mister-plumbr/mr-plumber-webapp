"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo, Search, Menu, X } from "./icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dadbdd] bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 py-3 sm:px-6 md:h-[88px] lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="text-[20px] font-semibold tracking-tight text-[#222325]">
            mister plumbr
            <span className="text-[#f97316]">.</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="flex w-full items-center overflow-hidden rounded-[12px] border border-[#dadbdd] bg-white shadow-sm focus-within:border-[#f97316] focus-within:ring-3 focus-within:ring-[#f97316]/10 transition-all">
            <input
              type="text"
              placeholder="Search plumbing services..."
              className="flex-1 border-0 bg-transparent px-4 py-2 text-[14px] text-[#222325] placeholder:text-[#74767e] focus:ring-0"
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#222325] text-white m-1 hover:bg-[#111] transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/upload"
            className="rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#62646a] hover:bg-[#f4f4f5] hover:text-[#222325] transition-colors"
          >
            Get estimate
          </Link>
          <Link
            href="/login"
            className="rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#62646a] hover:bg-[#f4f4f5] hover:text-[#222325] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/upload"
            className="ml-2 rounded-[8px] bg-[#f97316] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_12px_-2px_rgba(249,115,22,0.25)] hover:bg-[#ea580c] transition-colors"
          >
            Book now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#222325] rounded-[8px] hover:bg-[#f4f4f5]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 border-b border-[#dadbdd] bg-white shadow-lg">
          <div className="mx-auto max-w-[1200px] px-5 py-4 flex flex-col gap-2">
            <div className="flex w-full items-center overflow-hidden rounded-[12px] border border-[#dadbdd] bg-white mb-2">
              <input
                type="text"
                placeholder="Search plumbing services..."
                className="flex-1 border-0 bg-transparent px-4 py-3 text-[14px] text-[#222325] placeholder:text-[#74767e] focus:ring-0"
              />
              <button className="flex h-10 w-10 items-center justify-center bg-[#222325] text-white m-1 rounded-[8px]">
                <Search size={18} />
              </button>
            </div>
            <Link
              href="/upload"
              className="rounded-[8px] px-4 py-3 text-[16px] font-medium text-[#62646a] hover:bg-[#f4f4f5]"
              onClick={() => setMobileOpen(false)}
            >
              Get estimate
            </Link>
            <Link
              href="/login"
              className="rounded-[8px] px-4 py-3 text-[16px] font-medium text-[#62646a] hover:bg-[#f4f4f5]"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/upload"
              className="mt-2 rounded-[8px] bg-[#f97316] px-5 py-3 text-center text-[16px] font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
