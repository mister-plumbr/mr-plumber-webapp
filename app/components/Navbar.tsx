"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo, Search, Menu, X } from "./icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[#dadbdd] bg-white">
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-semibold tracking-tight text-[#222325]">
            mister plumbr
            <span className="text-[#f97316]">.</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="flex w-full items-center rounded-[4px] border border-[#dadbdd] bg-white overflow-hidden">
            <input
              type="text"
              placeholder="Search services..."
              className="flex-1 px-4 py-2 text-[16px] text-[#222325] placeholder:text-[#74767e] bg-transparent border-none focus:ring-0"
            />
            <button className="flex h-12 w-12 items-center justify-center bg-[#222325] text-white hover:bg-[#111] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/upload"
            className="text-[16px] font-normal text-[#62646a] hover:text-[#f97316] transition-colors"
          >
            Get estimate
          </Link>
          <Link
            href="#"
            className="text-[16px] font-normal text-[#62646a] hover:text-[#f97316] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/upload"
            className="rounded-[8px] bg-[#222325] px-5 py-2.5 text-[16px] font-semibold text-white hover:bg-[#111] transition-colors"
          >
            Book now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#222325]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-b border-[#dadbdd] bg-white shadow-md">
          <div className="mx-auto max-w-[1200px] px-4 py-4 flex flex-col gap-4">
            <div className="flex w-full items-center rounded-[4px] border border-[#dadbdd] bg-white overflow-hidden">
              <input
                type="text"
                placeholder="Search services..."
                className="flex-1 px-4 py-2 text-[16px] text-[#222325] placeholder:text-[#74767e] bg-transparent border-none focus:ring-0"
              />
              <button className="flex h-12 w-12 items-center justify-center bg-[#222325] text-white">
                <Search size={20} />
              </button>
            </div>
            <Link
              href="/upload"
              className="text-[16px] font-normal text-[#62646a] hover:text-[#f97316]"
              onClick={() => setMobileOpen(false)}
            >
              Get estimate
            </Link>
            <Link
              href="#"
              className="text-[16px] font-normal text-[#62646a] hover:text-[#f97316]"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/upload"
              className="rounded-[8px] bg-[#222325] px-5 py-2.5 text-center text-[16px] font-semibold text-white"
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
