import PageShell from "../components/PageShell";
import { CheckCircle, ShieldCheck, Users, Clock, Award } from "../components/icons";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified plumbers",
    text: "Every plumber is ID-verified, background-checked and reviewed after every job.",
  },
  {
    icon: Clock,
    title: "Fast, fair estimates",
    text: "Upload photos and receive a human-reviewed estimate within 2 hours, not days.",
  },
  {
    icon: Users,
    title: "Customer-first",
    text: "You approve the estimate before any work starts. Pay only after the job is done.",
  },
  {
    icon: Award,
    title: "Quality guarantee",
    text: "We stand behind the work with a service warranty and easy re-work if needed.",
  },
];

export default function AboutPage() {
  return (
    <PageShell title="About us" subtitle="We are making home plumbing simple, transparent and stress-free for Indian households.">
      <div className="space-y-12">
        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Our story</h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#62646a]">
            Mister Plumbr was started with a simple observation: finding a reliable plumber is harder than it should be.
            Homeowners waste time calling multiple technicians, haggling over prices and hoping the work is done right.
            We built a platform that combines expert human review with verified local plumbers so you get the right fix at a fair price — every time.
          </p>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#62646a]">
            Today we serve apartments, independent houses and commercial spaces across Bangalore, helping customers book
            everything from a dripping tap to a full bathroom fitting with confidence.
          </p>
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[#222325]">What makes us different</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-[#222325]">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#62646a]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-[#222325] p-6 text-white md:p-10">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { value: "2,000+", label: "Homes serviced" },
              { value: "4.9", label: "Average rating" },
              { value: "30 min", label: "First response" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[32px] font-semibold text-[#f97316]">{stat.value}</p>
                <p className="text-[14px] text-[#dadbdd]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Service coverage</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Bangalore",
              "Whitefield",
              "Koramangala",
              "Indiranagar",
              "HSR Layout",
              "JP Nagar",
              "Electronic City",
              "Marathahalli",
            ].map((area) => (
              <li key={area} className="flex items-center gap-2 text-[15px] text-[#62646a]">
                <CheckCircle size={16} className="text-[#f97316]" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
