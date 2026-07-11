import PageShell from "../components/PageShell";
import { ShieldCheck, UserCheck, FileCheck, AlertTriangle, Phone } from "../components/icons";

const measures = [
  {
    icon: UserCheck,
    title: "Verified professionals",
    text: "Every plumber undergoes ID verification, background checks and skill assessment before joining the platform.",
  },
  {
    icon: FileCheck,
    title: "Documented visits",
    text: "Each visit is logged with plumber details, arrival time and job notes so there is a clear record of service.",
  },
  {
    icon: ShieldCheck,
    title: "Workmanship guarantee",
    text: "We provide a service warranty on repairs. If the same issue recurs within the warranty window, we revisit at no extra cost.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency protocols",
    text: "For burst pipes, gas leaks or electrical hazards, our team guides you on immediate safety steps while the plumber is on the way.",
  },
];

export default function SafetyPage() {
  return (
    <PageShell title="Safety" subtitle="Your safety and peace of mind are built into every step of our service.">
      <div className="space-y-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {measures.map((m) => (
            <div key={m.title} className="rounded-[16px] border border-[#e4e4e7] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                <m.icon size={20} />
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-[#222325]">{m.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#62646a]">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Before the plumber arrives</h2>
          <ul className="mt-5 space-y-3 text-[15px] text-[#62646a]">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f97316]" />
              Keep children and pets away from the work area.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f97316]" />
              Clear the space around sinks, geysers or toilets for easy access.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f97316]" />
              Turn off the main water valve for major leaks if it is safe to do so.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f97316]" />
              Inform the plumber of any electrical wiring near the repair spot.
            </li>
          </ul>
        </div>

        <div className="rounded-[20px] bg-[#222325] p-6 text-white md:p-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[18px] font-semibold">Emergency safety line</h2>
              <p className="mt-1 text-[15px] text-[#dadbdd]">For burst pipes, major leaks or unsafe situations.</p>
            </div>
            <a
              href="tel:+918099990000"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#f97316] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
            >
              <Phone size={18} />
              +91 80 9999 0000
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
