"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UploadCloud, X, ArrowRight, Camera, AlertCircle, CheckCircle, Home, Calendar, Phone } from "../components/icons";

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

const steps = [
  { number: "1", label: "Issue details" },
  { number: "2", label: "Location & time" },
  { number: "3", label: "Photos & submit" },
];

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
      <main className="flex-1 bg-[#fafafa]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[#62646a] hover:text-[#f97316]"
            >
              <ArrowRight size={14} className="rotate-180" /> Back to home
            </Link>
            <h1 className="mt-4 text-heading-lg text-[#222325]">
              Describe your plumbing issue
            </h1>
            <p className="mt-2 text-[17px] text-[#62646a]">
              Upload photos and details. Our experts will review and send an
              estimate shortly.
            </p>
          </div>

          {/* Steps */}
          <div className="mb-10 flex items-center gap-2">
            {steps.map((step, idx) => (
              <div key={step.label} className="flex items-center">
                <div className="flex items-center gap-2 rounded-full bg-[#222325] px-4 py-2 text-[13px] font-semibold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px]">
                    {step.number}
                  </span>
                  {step.label}
                </div>
                {idx < steps.length - 1 && (
                  <div className="mx-3 h-px w-8 bg-[#dadbdd]" />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Main Form */}
            <div className="space-y-8">
              {/* Issue details card */}
              <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                    <Camera size={20} />
                  </div>
                  <h2 className="text-[18px] font-semibold text-[#222325]">Issue details</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222325]">
                      Issue category
                    </label>
                    <select
                      name="category"
                      required
                      className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] focus:border-[#f97316]"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-[#222325]">
                      Describe the issue
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="e.g. Kitchen tap has been dripping for 2 days and water pressure is low..."
                      className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-[#222325]">
                      Property type
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {propertyTypes.map((type) => (
                        <label
                          key={type}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#dadbdd] bg-white px-4 py-2.5 text-[14px] text-[#222325] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:bg-[#fff7ed] has-[:checked]:text-[#f97316]"
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
                </div>
              </div>

              {/* Location & time card */}
              <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                    <Home size={20} />
                  </div>
                  <h2 className="text-[18px] font-semibold text-[#222325]">Location & visit time</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Full address"
                        className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">
                        Landmark
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        placeholder="Nearby landmark"
                        className="mt-2 w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">
                        Preferred visit time
                      </label>
                      <div className="relative mt-2">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74767e]" />
                        <input
                          type="datetime-local"
                          name="preferredTime"
                          className="w-full rounded-[12px] border border-[#dadbdd] bg-white py-3 pl-11 pr-4 text-[15px] text-[#222325] focus:border-[#f97316]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">
                        Contact number
                      </label>
                      <div className="relative mt-2">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74767e]" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full rounded-[12px] border border-[#dadbdd] bg-white py-3 pl-11 pr-4 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]"
                        />
                      </div>
                    </div>
                  </div>

                  <label className={`flex cursor-pointer items-start gap-4 rounded-[16px] border p-4 transition-colors ${isEmergency ? "border-red-300 bg-red-50" : "border-[#dadbdd] bg-white hover:border-[#f97316]"}`}>
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#f97316]"
                    />
                    <div>
                      <span className={`block text-[15px] font-semibold ${isEmergency ? "text-red-700" : "text-[#222325]"}`}>
                        This is an emergency
                      </span>
                      <span className="text-[14px] text-[#62646a]">
                        Burst pipes, major leaks, or no water supply — we prioritize these.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Media Upload Sidebar */}
            <div className="h-fit space-y-6 rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm lg:p-8">
              <div>
                <h2 className="text-[18px] font-semibold text-[#222325]">Upload media</h2>
                <p className="mt-1 text-[14px] text-[#62646a]">
                  Photos help us assess the issue faster.
                </p>
              </div>

              {/* Photos */}
              <div>
                <label className="flex items-center justify-between text-[14px] font-semibold text-[#222325]">
                  Photos
                  <span className="text-[12px] font-normal text-[#74767e]">3–10 recommended</span>
                </label>

                <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dadbdd] bg-[#fafafa] px-4 py-10 text-center transition-colors hover:border-[#f97316] hover:bg-[#fff7ed]">
                  <UploadCloud size={40} className="text-[#f97316]" />
                  <span className="mt-3 text-[15px] font-semibold text-[#222325]">
                    Click to upload photos
                  </span>
                  <span className="mt-1 text-[13px] text-[#74767e]">
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
                          className="h-full w-full rounded-[10px] object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#222325] text-white shadow-md hover:bg-[#111]"
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
                <label className="text-[14px] font-semibold text-[#222325]">
                  Optional video
                </label>

                {!video ? (
                  <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dadbdd] bg-[#fafafa] px-4 py-8 text-center transition-colors hover:border-[#f97316] hover:bg-[#fff7ed]">
                    <span className="text-[15px] font-semibold text-[#222325]">
                      Upload a short video
                    </span>
                    <span className="mt-1 text-[13px] text-[#74767e]">
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
                  <div className="relative mt-3 aspect-video overflow-hidden rounded-[12px]">
                    <video
                      src={video}
                      controls
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#222325] text-white shadow-md hover:bg-[#111]"
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
                className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#f97316] px-6 py-4 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] disabled:opacity-60 transition-colors"
              >
                {loading ? "Submitting..." : "Submit request"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <div className="flex items-start gap-2 rounded-[12px] bg-[#fff7ed] p-3">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#f97316]" />
                <p className="text-[12px] leading-[1.5] text-[#62646a]">
                  You will receive an estimated quote within 2 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
