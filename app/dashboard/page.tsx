"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "./components/Sidebar";
import BookingCard from "./components/BookingCard";
import {
  bookings,
  Booking,
  formatDateTime,
  formatCurrency,
  getStatusColor,
  getStatusProgress,
  statusOrder,
} from "@/lib/data";

export default function DashboardPage() {
  const [selected, setSelected] = useState<Booking>(bookings[0]);

  return (
    <>
      <Navbar />
      <main className="flex flex-1 bg-[#fff7ed]">
        <Sidebar />

        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Requests List */}
          <div className="w-full border-r border-[#dadbdd] bg-white p-4 sm:p-6 lg:w-[400px] lg:shrink-0">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-[24px] font-semibold text-[#222325]">
                My requests
              </h1>
              <Link
                href="/upload"
                className="rounded-[8px] bg-[#f97316] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
              >
                + New
              </Link>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isSelected={selected.id === booking.id}
                  onClick={() => setSelected(booking)}
                />
              ))}
            </div>
          </div>

          {/* Detail View */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="rounded-[16px] border border-[#dadbdd] bg-white p-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[14px] text-[#74767e]">{selected.id}</p>
                  <h2 className="mt-1 text-[28px] font-semibold text-[#222325]">
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-[14px] text-[#62646a]">
                    {selected.category}
                  </p>
                </div>
                <span
                  className={`self-start rounded-full px-3 py-1.5 text-[12px] font-semibold text-white ${getStatusColor(
                    selected.status
                  )}`}
                >
                  {selected.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#dadbdd]">
                  <div
                    className="h-full rounded-full bg-[#f97316] transition-all"
                    style={{ width: `${getStatusProgress(selected.status)}%` }}
                  />
                </div>
                <p className="mt-2 text-[12px] text-[#74767e]">
                  {getStatusProgress(selected.status)}% complete
                </p>
              </div>

              {/* Description & Details */}
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Issue description
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.57] text-[#62646a]">
                    {selected.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#74767e]">Address</span>
                      <span className="max-w-xs text-right text-[#222325]">
                        {selected.address}
                      </span>
                    </div>
                    {selected.landmark && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#74767e]">Landmark</span>
                        <span className="text-[#222325]">{selected.landmark}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#74767e]">Submitted on</span>
                      <span className="text-[#222325]">
                        {formatDateTime(selected.createdAt)}
                      </span>
                    </div>
                    {selected.preferredTime && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#74767e]">Preferred visit</span>
                        <span className="text-[#222325]">
                          {formatDateTime(selected.preferredTime)}
                        </span>
                      </div>
                    )}
                    {selected.isEmergency && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#74767e]">Emergency</span>
                        <span className="font-semibold text-[#f97316]">Yes</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Estimate Card */}
                {selected.estimate && (
                  <div className="rounded-[16px] border border-[#dadbdd] p-5">
                    <h3 className="text-[16px] font-semibold text-[#222325]">
                      Estimated cost
                    </h3>
                    <p className="mt-1 text-[12px] text-[#74767e]">
                      Valid until {formatDateTime(selected.estimate.expiresAt)}
                    </p>

                    <div className="mt-4">
                      <span className="text-[36px] font-semibold text-[#222325]">
                        {formatCurrency(selected.estimate.range.min)}–
                        {formatCurrency(selected.estimate.range.max)}
                      </span>
                    </div>

                    <p className="mt-2 text-[14px] text-[#62646a]">
                      {selected.estimate.notes}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-[#dadbdd] pt-4">
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#62646a]">Labour</span>
                        <span className="text-[#222325]">
                          {formatCurrency(selected.estimate.labour)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#62646a]">Travel</span>
                        <span className="text-[#222325]">
                          {formatCurrency(selected.estimate.travel)}
                        </span>
                      </div>
                      {selected.estimate.parts.map((part) => (
                        <div
                          key={part.name}
                          className="flex justify-between text-[14px]"
                        >
                          <span className="text-[#62646a]">{part.name}</span>
                          <span className="text-[#222325]">
                            {formatCurrency(part.cost)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {selected.status === "Estimate Generated" && (
                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          className="flex-1 rounded-[8px] bg-[#222325] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#111] transition-colors"
                        >
                          Accept estimate
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-[8px] border border-[#dadbdd] px-4 py-2.5 text-[14px] font-semibold text-[#222325] hover:bg-[#f9f9f9] transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Plumber Info */}
              {selected.plumber && (
                <div className="mt-8 rounded-[16px] border border-[#dadbdd] p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Assigned plumber
                  </h3>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#222325] text-[18px] font-semibold text-white">
                      {selected.plumber.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-semibold text-[#222325]">
                        {selected.plumber.name}
                      </p>
                      <p className="text-[14px] text-[#62646a]">
                        {selected.plumber.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-semibold text-[#222325]">
                        ★ {selected.plumber.rating}
                      </p>
                      <p className="text-[12px] text-[#74767e]">
                        {selected.plumber.jobsCompleted} jobs
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Review */}
              {selected.customerRating && (
                <div className="mt-8 rounded-[16px] border border-[#dadbdd] p-5">
                  <h3 className="text-[16px] font-semibold text-[#222325]">
                    Your review
                  </h3>
                  <div className="mt-2 flex text-[#f97316]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < selected.customerRating! ? "★" : "☆"}</span>
                    ))}
                  </div>
                  {selected.review && (
                    <p className="mt-2 text-[14px] text-[#62646a]">
                      {selected.review}
                    </p>
                  )}
                  {selected.finalPrice && (
                    <p className="mt-3 text-[14px] text-[#222325]">
                      Final paid amount:{" "}
                      <span className="font-semibold">
                        {formatCurrency(selected.finalPrice)}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
