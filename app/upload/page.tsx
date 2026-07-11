"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Icon from "../components/Icon";

const categories = [
  "Leaking Pipe",
  "Clogged Drain",
  "Water Heater Issue",
  "Toilet Repair",
  "Faucet Replacement",
  "Other",
];

const propertyTypes = ["Apartment", "Villa / Standalone House", "Commercial Office", "Retail Store"];

export default function UploadPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState(propertyTypes[0]);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleImageUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    const remainingSlots = 10 - images.length;
    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, url]);
      });
  }, [images.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!category) {
      setError("Please select an issue category.");
      return;
    }
    if (images.length < 3) {
      setError("Please upload at least 3 clear photos of the issue.");
      return;
    }

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
          fullName,
          phone,
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

  const uploadProgress = Math.min((images.length / 10) * 100, 100);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-main">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:py-16">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-primary md:text-4xl lg:text-[48px] lg:leading-[1.1]">
                  Describe your plumbing issue
                </h1>
                <p className="max-w-2xl text-lg text-on-surface-variant">
                  Provide details about your problem so our experts can provide a fast, accurate estimate.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-surface-container p-2">
                <span className="text-sm font-medium uppercase tracking-wider text-on-surface-variant">
                  This is an emergency
                </span>
                <label className="relative inline-block h-6 w-12 cursor-pointer transition ease-in-out">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="peer h-0 w-0 opacity-0"
                  />
                  <span className="absolute inset-0 cursor-pointer rounded-full bg-outline-variant transition peer-checked:bg-secondary" />
                  <span className="absolute bottom-1 left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6" />
                </label>
              </div>
            </div>
          </header>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-error">
              <Icon name="error" size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Left form */}
            <div className="space-y-6 lg:col-span-8">
              {/* Issue Details */}
              <section className="rounded-xl border border-border-subtle bg-surface-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <Icon name="report_problem" size={24} />
                  <h2 className="text-2xl font-semibold">Issue Details</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-xs font-medium uppercase text-on-surface-variant">
                      Issue Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="propertyType" className="text-xs font-medium uppercase text-on-surface-variant">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="description" className="text-xs font-medium uppercase text-on-surface-variant">
                      Problem Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      placeholder="Example: The kitchen sink is draining very slowly and there is a metallic smell..."
                      className="resize-none rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </section>

              {/* Location & Arrival */}
              <section className="rounded-xl border border-border-subtle bg-surface-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <Icon name="location_on" size={24} />
                  <h2 className="text-2xl font-semibold">Location & Arrival</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="address" className="text-xs font-medium uppercase text-on-surface-variant">
                      Complete Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, Building number, Area"
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="landmark" className="text-xs font-medium uppercase text-on-surface-variant">
                      Landmark (Optional)
                    </label>
                    <input
                      id="landmark"
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near Green Park Mall"
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="preferredTime" className="text-xs font-medium uppercase text-on-surface-variant">
                      Preferred Visit Time
                    </label>
                    <input
                      id="preferredTime"
                      type="datetime-local"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="rounded-xl border border-border-subtle bg-surface-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <Icon name="contact_phone" size={24} />
                  <h2 className="text-2xl font-semibold">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="text-xs font-medium uppercase text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="rounded-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-xs font-medium uppercase text-on-surface-variant">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-lg border border-r-0 border-border-subtle bg-surface-container-low px-4 text-on-surface-variant">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 rounded-r-lg border border-border-subtle bg-white px-4 py-2.5 text-base text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <aside className="sticky top-24 space-y-6 lg:col-span-4">
              {/* Visual Documentation */}
              <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-on-primary shadow-xl">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <svg height="100%" width="100%">
                    <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect fill="url(#grid)" height="100%" width="100%" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-2">
                    <Icon name="add_a_photo" filled className="text-secondary-container" size={24} />
                    <h3 className="text-xl font-semibold">Visual Documentation</h3>
                  </div>
                  <p className="mb-5 text-base text-on-primary-container">
                    Please upload 3-10 clear photos or a short video of the issue. This helps us see what you see.
                  </p>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-on-primary-container p-8 text-center transition-colors hover:bg-white/5 ${
                      dragActive ? "bg-white/10" : ""
                    }`}
                  >
                    <Icon name="cloud_upload" size={48} className="mb-3 transition-transform group-hover:scale-110" />
                    <p className="mb-1 text-sm font-medium">Drag and drop files here</p>
                    <p className="text-xs opacity-60">Supported formats: JPG, PNG, MP4</p>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={handleChange}
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {images.map((src, index) => (
                        <div key={index} className="relative aspect-square">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`Upload ${index + 1}`}
                            className="h-full w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white shadow"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Minimum required: 3</span>
                      <span>{images.length}/10 uploaded</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-on-primary-container">
                      <div
                        className="h-full bg-secondary-container transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Preview */}
              <div className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-sm">
                <h4 className="mb-3 text-xs font-medium uppercase text-on-surface-variant">Review Preview</h4>
                <div className="relative aspect-[1.22] w-full overflow-hidden rounded-lg bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/trust-bg.jpg"
                    alt="Preview"
                    className="h-full w-full object-cover opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="image_search" size={48} className="text-primary/20" />
                  </div>
                </div>
              </div>

              {/* Final Action */}
              <div
                className={`rounded-xl border-t-4 bg-surface-container-high p-6 shadow-lg transition-colors ${
                  isEmergency ? "animate-pulse border-error-red" : "border-secondary"
                }`}
              >
                <p className="mb-5 text-base text-on-surface">
                  By submitting, you agree to our{" "}
                  <a href="#" className="font-medium text-secondary underline">
                    Service Terms
                  </a>
                  . A technician will contact you shortly after reviewing your request.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3.5 text-base font-bold text-on-secondary shadow-lg transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-60"
                >
                  <span>{loading ? "Submitting..." : "Submit Request"}</span>
                  <Icon name="send" size={20} />
                </button>
                <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-on-surface-variant">
                  <Icon name="verified_user" size={16} />
                  Secure 128-bit Encrypted Request
                </p>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
