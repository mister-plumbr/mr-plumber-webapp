"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UploadCloud, X, ArrowRight } from "../components/icons";

const categories = [
  "Tap / Faucet leak",
  "Pipe leak / burst",
  "Drain clog",
  "Toilet repair",
  "Water heater / geyser",
  "Bathroom fitting",
  "Kitchen sink",
  "Motor / pump",
  "Other",
];

const propertyTypes = ["Apartment", "Independent house", "Villa", "Commercial"];

export default function UploadPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      const remainingSlots = 10 - images.length;
      Array.from(files)
        .slice(0, remainingSlots)
        .forEach((file) => {
          const url = URL.createObjectURL(file);
          setImages((prev) => [...prev, url]);
        });
    },
    [images.length]
  );

  const handleVideoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const url = URL.createObjectURL(files[0]);
      setVideo(url);
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeVideo = useCallback(() => {
    setVideo(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const landmark = formData.get("landmark") as string;
    const preferredTime = formData.get("preferredTime") as string;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: category,
          category,
          description,
          address,
          landmark,
          isEmergency,
          preferredTime: preferredTime ? new Date(preferredTime).toISOString() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit request");
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
    <>
      <Navbar />
      <main className="flex-1 bg-[#fff7ed]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8">
            <Link
              href="/"
              className="text-[14px] text-[#62646a] hover:text-[#f97316]"
            >
              ← Back to home
            </Link>
            <h1 className="mt-4 text-heading-lg text-[#222325]">
              Describe your plumbing issue
            </h1>
            <p className="mt-2 text-[16px] text-[#62646a]">
              Upload photos and details. Our experts will review and send an
              estimate shortly.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-[8px] bg-red-50 px-4 py-3 text-[14px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Main Form */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-[16px] font-semibold text-[#222325]">
                  Issue category
                </label>
                <select
                  name="category"
                  required
                  className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325]"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[16px] font-semibold text-[#222325]">
                  Describe the issue
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="e.g. Kitchen tap has been dripping for 2 days and water pressure is low..."
                  className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[16px] font-semibold text-[#222325]">
                  Property type
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {propertyTypes.map((type) => (
                    <label
                      key={type}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#c5c6c9] bg-white px-4 py-2 text-[14px] text-[#222325] has-[:checked]:border-[#f97316] has-[:checked]:bg-[#fff7ed] has-[:checked]:text-[#f97316]"
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value={type}
                        className="h-4 w-4 accent-[#f97316]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[16px] font-semibold text-[#222325]">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Full address"
                    className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-semibold text-[#222325]">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Nearby landmark"
                    className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                  />
                </div>
              </div>

              {/* Preferred Time + Contact */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[16px] font-semibold text-[#222325]">
                    Preferred visit time
                  </label>
                  <input
                    type="datetime-local"
                    name="preferredTime"
                    className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325]"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-semibold text-[#222325]">
                    Contact number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full rounded-[12px] border border-[#c5c6c9] bg-white px-4 py-3 text-[16px] text-[#222325] placeholder:text-[#74767e]"
                  />
                </div>
              </div>

              {/* Emergency Checkbox */}
              <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#fdba74] bg-[#fff7ed] p-4">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="h-5 w-5 accent-[#f97316]"
                />
                <div>
                  <span className="block text-[16px] font-semibold text-[#222325]">
                    This is an emergency
                  </span>
                  <span className="text-[14px] text-[#62646a]">
                    Burst pipes, major leaks, or no water supply — we prioritize
                    these.
                  </span>
                </div>
              </label>
            </div>

            {/* Media Upload Sidebar */}
            <div className="h-fit space-y-6 rounded-[16px] border border-[#dadbdd] bg-white p-6 shadow-sm">
              {/* Photos */}
              <div>
                <label className="block text-[16px] font-semibold text-[#222325]">
                  Upload photos
                  <span className="ml-1 text-[14px] font-normal text-[#74767e]">
                    (3–10)
                  </span>
                </label>

                <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-[#c5c6c9] bg-[#fff7ed] px-4 py-8 text-center hover:border-[#f97316] transition-colors">
                  <UploadCloud size={40} className="text-[#f97316]" />
                  <span className="mt-3 text-[14px] font-semibold text-[#222325]">
                    Click to upload photos
                  </span>
                  <span className="mt-1 text-[12px] text-[#74767e]">
                    JPG, PNG up to 10MB each
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((src, index) => (
                      <div key={index} className="relative aspect-square">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Upload preview ${index + 1}`}
                          className="h-full w-full rounded-[8px] object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#222325] text-white hover:bg-[#111]"
                          aria-label="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video */}
              <div>
                <label className="block text-[16px] font-semibold text-[#222325]">
                  Optional video
                </label>

                {!video ? (
                  <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-[#c5c6c9] bg-[#fff7ed] px-4 py-6 text-center hover:border-[#f97316] transition-colors">
                    <span className="text-[14px] font-semibold text-[#222325]">
                      Upload a short video
                    </span>
                    <span className="mt-1 text-[12px] text-[#74767e]">
                      MP4, MOV up to 50MB
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                ) : (
                  <div className="relative mt-3 aspect-video overflow-hidden rounded-[8px]">
                    <video
                      src={video}
                      controls
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#222325] text-white hover:bg-[#111]"
                      aria-label="Remove video"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#222325] px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-[#111] disabled:opacity-60 transition-colors"
              >
                {loading ? "Submitting..." : "Submit request"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <p className="text-center text-[12px] text-[#74767e]">
                You will receive an estimated quote within 2 hours.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
