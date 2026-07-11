"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "./components/Sidebar";
import BookingCard from "./components/BookingCard";
import {
  Booking,
  formatDateTime,
  formatCurrency,
  getStatusColor,
  getStatusProgress,
} from "@/lib/data";

interface ApiBooking {
  id: string;
  requestId: string;
  title: string;
  category: string;
  description: string;
  address: string;
  landmark?: string;
  isEmergency: boolean;
  status: string;
  createdAt: string;
  preferredTime?: string;
  user: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  plumber?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    jobsCompleted: number;
    initials: string;
    location: string;
  } | null;
  estimate?: {
    labour: number;
    travel: number;
    parts: string;
    min: number;
    max: number;
    notes?: string | null;
    expiresAt: string;
  } | null;
  invoice?: {
    labour: number;
    travel: number;
    parts: string;
    tax: number;
    total: number;
    isPaid: boolean;
  } | null;
  review?: {
    rating: number;
    comment?: string | null;
  } | null;
  notes: { content: string }[];
}

function mapApiToBooking(api: ApiBooking): Booking {
  const parts = api.estimate?.parts
    ? (JSON.parse(api.estimate.parts) as { name: string; cost: number }[])
    : [];

  return {
    id: api.requestId,
    customerName: `${api.user.firstName} ${api.user.lastName}`,
    customerPhone: api.user.phone,
    title: api.title,
    category: api.category,
    description: api.description,
    address: api.address,
    landmark: api.landmark ?? undefined,
    isEmergency: api.isEmergency,
    status: api.status.replace(/_/g, " ") as Booking["status"],
    createdAt: api.createdAt,
    preferredTime: api.preferredTime,
    photos: [],
    internalNotes: api.notes[0]?.content,
    estimate: api.estimate
      ? {
          range: { min: api.estimate.min, max: api.estimate.max },
          notes: api.estimate.notes ?? "",
          parts,
          labour: api.estimate.labour,
          travel: api.estimate.travel,
          expiresAt: api.estimate.expiresAt,
        }
      : undefined,
    plumber: api.plumber
      ? {
          id: api.plumber.id,
          name: api.plumber.name,
          phone: api.plumber.phone,
          rating: api.plumber.rating,
          jobsCompleted: api.plumber.jobsCompleted,
          initials: api.plumber.initials,
          location: api.plumber.location,
        }
      : undefined,
    finalPrice: api.invoice?.total,
    customerRating: api.review?.rating,
    review: api.review?.comment ?? undefined,
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = (await res.json()) as { bookings: ApiBooking[] };
        const mapped = data.bookings.map(mapApiToBooking);
        setBookings(mapped);
        setSelected(mapped[0] ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [router]);

  const handleAcceptEstimate = async () => {
    if (!selected) return;
    const res = await fetch(`/api/bookings/${selected.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ESTIMATE_ACCEPTED" }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selected.id ? { ...b, status: "Estimate Accepted" } : b
        )
      );
      setSelected((prev) =>
        prev ? { ...prev, status: "Estimate Accepted" } : null
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-[#fafafa]">
          <p className="text-[#62646a]">Loading your requests...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-[#fafafa]">
          <p className="text-red-600">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!selected) {
    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-[#fafafa]">
          <div className="text-center">
            <p className="text-[#62646a]">No requests yet.</p>
            <Link
              href="/upload"
              className="mt-4 inline-block rounded-[8px] bg-[#f97316] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
            >
              Submit a request
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const progress = getStatusProgress(selected.status);

  return (
    <>
      <Navbar />
      <main className="flex flex-1 bg-[#fafafa]">
        <Sidebar />

        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Requests List */}
          <div className="w-full border-r border-[#e4e4e7] bg-white p-4 sm:p-5 lg:w-[380px] lg:shrink-0">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-[22px] font-semibold text-[#222325]">
                My requests
              </h1>
              <Link
                href="/upload"
                className="rounded-[8px] bg-[#f97316] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
              >
                + New
              </Link>
            </div>

            <div className="space-y-3">
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
          <div className="flex-1 p-4 sm:p-5 lg:p-7">
            <div className="rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm sm:p-7">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[13px] text-[#74767e]">{selected.id}</p>
                  <h2 className="mt-1 text-[24px] font-semibold leading-tight text-[#222325] sm:text-[28px]">
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#62646a]">
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
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#e4e4e7]">
                  <div
                    className="h-full rounded-full bg-[#f97316] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[12px] text-[#74767e]">
                  {progress}% complete
                </p>
              </div>

              {/* Description & Details */}
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Issue description
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#62646a]">
                    {selected.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between gap-4 text-[14px]">
                      <span className="text-[#74767e]">Address</span>
                      <span className="max-w-xs text-right text-[#222325]">
                        {selected.address}
                      </span>
                    </div>
                    {selected.landmark && (
                      <div className="flex justify-between gap-4 text-[14px]">
                        <span className="text-[#74767e]">Landmark</span>
                        <span className="text-[#222325]">
                          {selected.landmark}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4 text-[14px]">
                      <span className="text-[#74767e]">Submitted on</span>
                      <span className="text-[#222325]">
                        {formatDateTime(selected.createdAt)}
                      </span>
                    </div>
                    {selected.preferredTime && (
                      <div className="flex justify-between gap-4 text-[14px]">
                        <span className="text-[#74767e]">Preferred visit</span>
                        <span className="text-[#222325]">
                          {formatDateTime(selected.preferredTime)}
                        </span>
                      </div>
                    )}
                    {selected.isEmergency && (
                      <div className="flex justify-between gap-4 text-[14px]">
                        <span className="text-[#74767e]">Emergency</span>
                        <span className="font-semibold text-[#f97316]">Yes</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Estimate Card */}
                {selected.estimate && (
                  <section className="rounded-[14px] border border-[#e4e4e7] bg-[#fafafa] p-5">
                    <h3 className="text-[15px] font-semibold text-[#222325]">
                      Estimated cost
                    </h3>
                    <p className="mt-1 text-[12px] text-[#74767e]">
                      Valid until {formatDateTime(selected.estimate.expiresAt)}
                    </p>

                    <div className="mt-4">
                      <span className="text-[32px] font-semibold text-[#222325]">
                        {formatCurrency(selected.estimate.range.min)}–
                        {formatCurrency(selected.estimate.range.max)}
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] text-[#62646a]">
                      {selected.estimate.notes}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-[#e4e4e7] pt-4">
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
                          onClick={handleAcceptEstimate}
                          className="flex-1 rounded-[8px] bg-[#222325] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#111] transition-colors"
                        >
                          Accept estimate
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-[8px] border border-[#dadbdd] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#222325] hover:bg-[#f9f9f9] transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </section>
                )}
              </div>

              {/* Plumber Info */}
              {selected.plumber && (
                <section className="mt-6 rounded-[14px] border border-[#e4e4e7] bg-white p-5">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
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
                      <p className="text-[13px] text-[#62646a]">
                        {selected.plumber.phone} · {selected.plumber.location}
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
                </section>
              )}

              {/* Review */}
              {selected.customerRating && (
                <section className="mt-6 rounded-[14px] border border-[#e4e4e7] bg-white p-5">
                  <h3 className="text-[15px] font-semibold text-[#222325]">
                    Your review
                  </h3>
                  <div className="mt-2 flex text-[#f97316]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[18px]">
                        {i < selected.customerRating! ? "★" : "☆"}
                      </span>
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
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
