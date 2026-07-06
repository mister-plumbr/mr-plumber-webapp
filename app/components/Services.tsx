import Link from "next/link";
import { ArrowRight } from "./icons";

const services = [
  {
    title: "Tap & Faucet Repair",
    image: "🚰",
    description: "Dripping taps, loose handles, cartridge replacement.",
  },
  {
    title: "Pipe Leak & Burst",
    image: "🛠️",
    description: "Visible leaks, burst pipes, joint sealing, pipe replacement.",
  },
  {
    title: "Drain Cleaning",
    image: "🪠",
    description: "Clogged sinks, slow drains, kitchen grease blocks.",
  },
  {
    title: "Toilet Repair",
    image: "🚽",
    description: "Flush issues, tank leaks, seat fitting, blockage removal.",
  },
  {
    title: "Water Heater",
    image: "🌡️",
    description: "Geyser installation, thermostat fixes, leak repair.",
  },
  {
    title: "Bathroom Fittings",
    image: "🚿",
    description: "Shower installs, mixer repair, silicone sealing.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-heading-lg text-[#222325]">
              Popular services
            </h2>
            <p className="mt-2 text-[16px] text-[#62646a]">
              Most booked plumbing jobs this week
            </p>
          </div>
          <Link
            href="/upload"
            className="hidden sm:inline-flex items-center gap-1 text-[16px] font-semibold text-[#f97316] hover:text-[#ea580c]"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/upload"
              className="group relative flex flex-col overflow-hidden rounded-[16px] bg-[#7c2d12] p-6 pb-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-[16px] font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-1 text-[14px] text-white/80">
                {service.description}
              </p>
              <div className="mt-6 flex h-32 items-end justify-center text-6xl">
                {service.image}
              </div>
              <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
