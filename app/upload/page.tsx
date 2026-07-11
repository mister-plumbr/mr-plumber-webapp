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
  { id: 1, label: "Issue details", shortLabel: "Issue", icon: Camera },
  { id: 2, label: "Location & time", shortLabel: "Location", icon: Home },
  { id: 3, label: "Photos & submit", shortLabel: "Photos", icon: UploadCloud },
];

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10 flex w-full items-center">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors sm:h-11 sm:w-11 ${
                  isCompleted
                    ? "border-[#f97316] bg-[#f97316] text-white"
                    : isCurrent
                    ? "border-[#f97316] bg-white text-[#f97316]"
                    : "border-[#dadbdd] bg-white text-[#9ca3af]"
                }`}
              >
                {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
              </div>
              <span
                className={`mt-2 text-center text-[11px] font-medium sm:text-[13px] ${
                  isCompleted || isCurrent ? "text-[#222325]" : "text-[#9ca3af]"
                }`}
              >
                <span className="sm:hidden">{step.shortLabel}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`mx-2 h-[2px] flex-1 rounded-full sm:mx-4 ${
                  currentStep > step.id ? "bg-[#f97316]" : "bg-[#e4e4e7]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function UploadPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [attempted, setAttempted] = useState(false);

  // Step 1
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // Step 2
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);

  // Step 3
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const step1Valid = category.trim() && description.trim();
  const step2Valid = address.trim();

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

  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const url = URL.createObjectURL(files[0]);
    setVideo(url);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeVideo = useCallback(() => {
    setVideo(null);
  }, []);

  const handleNext = () => {
    setAttempted(true);
    if (currentStep === 1 && !step1Valid) return;
    if (currentStep === 2 && !step2Valid) return;
    setAttempted(false);
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setAttempted(false);
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!step1Valid || !step2Valid) return;
    setError("");
    setLoading(true);

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

  const cardClass = "rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8";
  const inputClass =
    "w-full rounded-[12px] border border-[#dadbdd] bg-white px-4 py-3 text-[15px] text-[#222325] placeholder:text-[#a1a1aa] focus:border-[#f97316]";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#fafafa]">
        <div className="mx-auto max-w-[840px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[#62646a] hover:text-[#f97316]"
            >
              <ArrowRight size={14} className="rotate-180" /> Back to home
            </Link>
            <h1 className="mt-4 text-heading-lg text-[#222325]">Describe your plumbing issue</h1>
            <p className="mt-2 text-[17px] text-[#62646a]">
              Upload photos and details. Our experts will review and send an estimate shortly.
            </p>
          </div>

          <Stepper currentStep={currentStep} />

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {attempted && currentStep === 1 && !step1Valid && (
            <div className="mb-6 flex items-center gap-2 rounded-[12px] border border-orange-200 bg-orange-50 px-4 py-3 text-[14px] text-orange-700">
              <AlertCircle size={18} />
              Please select a category and describe the issue.
            </div>
          )}

          {attempted && currentStep === 2 && !step2Valid && (
            <div className="mb-6 flex items-center gap-2 rounded-[12px] border border-orange-200 bg-orange-50 px-4 py-3 text-[14px] text-orange-700">
              <AlertCircle size={18} />
              Please enter your address.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 — Issue details */}
            {currentStep === 1 && (
              <div className={cardClass}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                    <Camera size={20} />
                  </div>
                  <h2 className="text-[18px] font-semibold text-[#222325]">Issue details</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222325]">Issue category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className={`${inputClass} mt-2`}
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
                    <label className="block text-[14px] font-semibold text-[#222325]">Describe the issue</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      placeholder="e.g. Kitchen tap has been dripping for 2 days and water pressure is low..."
                      className={`${inputClass} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-[#222325]">Property type</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {propertyTypes.map((type) => {
                        const selected = propertyType === type;
                        return (
                          <label
                            key={type}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] transition-colors ${
                              selected
                                ? "border-[#f97316] bg-[#fff7ed] text-[#f97316]"
                                : "border-[#dadbdd] bg-white text-[#222325] hover:border-[#f97316]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="propertyType"
                              value={type}
                              checked={selected}
                              onChange={() => setPropertyType(type)}
                              className="sr-only"
                            />
                            {type}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] transition-colors"
                  >
                    Next step
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Location & time */}
            {currentStep === 2 && (
              <div className={cardClass}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                    <Home size={20} />
                  </div>
                  <h2 className="text-[18px] font-semibold text-[#222325]">Location & visit time</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Full address"
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">Landmark</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Nearby landmark"
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">Preferred visit time</label>
                      <div className="relative mt-2">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74767e]" />
                        <input
                          type="datetime-local"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#222325]">Contact number</label>
                      <div className="relative mt-2">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74767e]" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder="+91 98765 43210"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>
                  </div>

                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-[16px] border p-4 transition-colors ${
                      isEmergency
                        ? "border-red-300 bg-red-50"
                        : "border-[#dadbdd] bg-white hover:border-[#f97316]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#f97316]"
                    />
                    <div>
                      <span
                        className={`block text-[15px] font-semibold ${
                          isEmergency ? "text-red-700" : "text-[#222325]"
                        }`}
                      >
                        This is an emergency
                      </span>
                      <span className="text-[14px] text-[#62646a]">
                        Burst pipes, major leaks, or no water supply — we prioritize these.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-[12px] border border-[#dadbdd] bg-white px-6 py-3 text-[15px] font-semibold text-[#222325] hover:bg-[#f4f4f5] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] transition-colors"
                  >
                    Next step
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Photos & submit */}
            {currentStep === 3 && (
              <div className={cardClass}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                    <UploadCloud size={20} />
                  </div>
                  <h2 className="text-[18px] font-semibold text-[#222325]">Photos & submit</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between text-[14px] font-semibold text-[#222325]">
                      Photos
                      <span className="text-[12px] font-normal text-[#74767e]">3–10 recommended</span>
                    </label>

                    <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dadbdd] bg-[#fafafa] py-10 text-center transition-colors hover:border-[#f97316] hover:bg-[#fff7ed]">
                      <UploadCloud size={40} className="text-[#f97316]" />
                      <span className="mt-3 text-[15px] font-semibold text-[#222325]">Click to upload photos</span>
                      <span className="mt-1 text-[13px] text-[#74767e]">JPG, PNG up to 10MB each</span>
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

                  <div>
                    <label className="text-[14px] font-semibold text-[#222325]">Optional video</label>

                    {!video ? (
                      <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dadbdd] bg-[#fafafa] py-8 text-center transition-colors hover:border-[#f97316] hover:bg-[#fff7ed]">
                        <span className="text-[15px] font-semibold text-[#222325]">Upload a short video</span>
                        <span className="mt-1 text-[13px] text-[#74767e]">MP4, MOV up to 50MB</span>
                        <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                      </label>
                    ) : (
                      <div className="relative mt-3 aspect-video overflow-hidden rounded-[12px]">
                        <video src={video} controls className="h-full w-full object-cover" />
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

                  <div className="flex items-start gap-2 rounded-[12px] bg-[#fff7ed] p-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#f97316]" />
                    <p className="text-[12px] leading-[1.5] text-[#62646a]">
                      You will receive an estimated quote within 2 hours.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-[12px] border border-[#dadbdd] bg-white px-6 py-3 text-[15px] font-semibold text-[#222325] hover:bg-[#f4f4f5] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.3)] hover:bg-[#ea580c] disabled:opacity-60 transition-colors"
                  >
                    {loading ? "Submitting..." : "Submit request"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
