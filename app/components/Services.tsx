import Link from "next/link";
import Icon from "./Icon";

const services = [
  {
    icon: "faucet",
    title: "Tap Repair",
    description: "Dripping or leaking taps repaired or replaced with premium fixtures.",
  },
  {
    icon: "water_damage",
    title: "Pipe Leak",
    description: "Fast emergency response to prevent water damage to your property.",
  },
  {
    icon: "shower",
    title: "Shower Install",
    description: "Full installation and pressure testing for modern bathroom systems.",
  },
  {
    icon: "tablet",
    title: "Toilet Repair",
    description: "Resolving flush issues, blockages, and leaks with durable parts.",
  },
  {
    icon: "hot_tub",
    title: "Water Heaters",
    description: "Diagnosis, descaling, and installation of electric or gas heaters.",
  },
  {
    icon: "cleaning_services",
    title: "Drain Cleaning",
    description: "Professional high-pressure jetting to clear stubborn blockages.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface-container-low py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row lg:mb-14">
          <div>
            <h2 className="mb-3 text-3xl font-semibold text-primary">Popular Services</h2>
            <p className="max-w-md text-on-surface-variant">
              Professional solutions for every plumbing need, priced transparently.
            </p>
          </div>
          <Link href="/upload" className="flex items-center gap-1 font-bold text-secondary hover:underline">
            View all services
            <Icon name="chevron_right" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="hover-lift rounded-xl border border-border-subtle bg-surface-card p-6"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <Icon name={service.icon} size={32} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-primary">{service.title}</h3>
              <p className="mb-6 text-base text-on-surface-variant">{service.description}</p>
              <Link
                href="/upload"
                className="block w-full rounded-full border-2 border-primary py-2 text-center text-sm font-bold text-primary transition-all hover:bg-primary hover:text-on-primary"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
