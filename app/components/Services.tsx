import Link from "next/link";
import { ArrowRight, Droplets, Tool, Wrench, Home, Calendar, ShieldCheck } from "./icons";

const services = [
  {
    title: "Tap & Faucet Repair",
    description: "Dripping taps, loose handles, cartridge & washer replacement.",
    icon: Droplets,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pipe Leak & Burst",
    description: "Visible leaks, burst pipes, joint sealing, pipe replacement.",
    icon: Tool,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Drain Cleaning",
    description: "Clogged sinks, slow drains, kitchen grease blocks.",
    icon: Wrench,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Toilet Repair",
    description: "Flush issues, tank leaks, seat fitting, blockage removal.",
    icon: Home,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Water Heater",
    description: "Geyser installation, thermostat fixes, leak repair.",
    icon: Calendar,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Bathroom Fittings",
    description: "Shower installs, mixer repair, silicone sealing.",
    icon: ShieldCheck,
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function Services() {
  return (
    <section className="bg-[#fafafa] py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#f97316]">
              Services
            </span>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-[#222325] md:text-heading-lg">
              Popular services
            </h2>
            <p className="mt-2 text-[15px] text-[#62646a] md:text-[16px]">
              Most booked plumbing jobs this week
            </p>
          </div>
          <Link
            href="/upload"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#f97316] hover:text-[#ea580c]"
          >
            View all services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/upload"
              className="group relative flex flex-col rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[14px] ${service.color} transition-transform group-hover:scale-110`}>
                <service.icon size={28} />
              </div>
              
              <h3 className="mt-5 text-[18px] font-semibold text-[#222325]">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-[#62646a]">
                {service.description}
              </p>
              
              <div className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-[#f97316]">
                Book now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
