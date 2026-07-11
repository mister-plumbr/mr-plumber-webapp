"use client";

import PageShell from "../components/PageShell";
import { Phone, Mail, MapPin, Clock } from "../components/icons";

const channels = [
  {
    icon: Phone,
    title: "Phone",
    text: "+91 80 1234 5678",
    subtext: "Mon–Sat, 8am–8pm",
  },
  {
    icon: Mail,
    title: "Email",
    text: "hello@misterplumbr.in",
    subtext: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office",
    text: "Mister Plumbr HQ, Bangalore",
    subtext: "Koramangala, Bengaluru — 560034",
  },
  {
    icon: Clock,
    title: "Emergency line",
    text: "+91 80 9999 0000",
    subtext: "24/7 for burst pipes & leaks",
  },
];

export default function ContactPage() {
  return (
    <PageShell title="Contact us" subtitle="Have a question or need help with a booking? We are here to help.">
      <div className="space-y-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <div key={c.title} className="rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff7ed] text-[#f97316]">
                <c.icon size={24} />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-[#222325]">{c.title}</h3>
              <p className="mt-1 text-[14px] font-medium text-[#f97316]">{c.text}</p>
              <p className="mt-1 text-[13px] text-[#62646a]">{c.subtext}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Send us a message</h2>
          <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[14px] font-semibold text-[#222325]">Name</label>
              <input type="text" placeholder="Your name" className="mt-2 w-full rounded-[12px] border border-[#dadbdd] px-4 py-3 text-[15px] focus:border-[#f97316]" />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#222325]">Email</label>
              <input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-[12px] border border-[#dadbdd] px-4 py-3 text-[15px] focus:border-[#f97316]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[14px] font-semibold text-[#222325]">Message</label>
              <textarea rows={4} placeholder="How can we help?" className="mt-2 w-full rounded-[12px] border border-[#dadbdd] px-4 py-3 text-[15px] focus:border-[#f97316]" />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-[8px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
