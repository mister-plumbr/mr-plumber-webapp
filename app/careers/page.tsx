import PageShell from "../components/PageShell";
import { CheckCircle, ArrowRight } from "../components/icons";

const roles = [
  {
    title: "Plumbing Technician",
    location: "Bangalore",
    type: "Full-time / Contract",
    points: ["Minimum 2 years plumbing experience", "Own tools and two-wheeler preferred", "Earn per job with weekly payouts"],
  },
  {
    title: "Operations Coordinator",
    location: "Bangalore",
    type: "Full-time",
    points: ["Handle job allocation and vendor communication", "Work with customer support and finance teams", "1+ year operations experience"],
  },
  {
    title: "Customer Support Associate",
    location: "Remote / Bangalore",
    type: "Full-time",
    points: ["Resolve customer queries over chat and call", "Coordinate with plumbers for scheduling", "Strong Hindi and English communication"],
  },
];

export default function CareersPage() {
  return (
    <PageShell title="Careers" subtitle="Join us in building the most trusted plumbing service for Indian homes.">
      <div className="space-y-12">
        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Why work with us</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Competitive pay and timely payouts",
              "Flexible schedules for technicians",
              "Growth path from technician to team lead",
              "Supportive ops and customer success team",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-[15px] text-[#62646a]">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[#222325]">Open roles</h2>
          <div className="mt-6 space-y-4">
            {roles.map((role) => (
              <div key={role.title} className="rounded-[16px] border border-[#e4e4e7] bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#222325]">{role.title}</h3>
                    <p className="text-[14px] text-[#62646a]">
                      {role.location} • {role.type}
                    </p>
                  </div>
                  <a
                    href="mailto:careers@misterplumbr.in?subject=Application"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#f97316] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#ea580c] transition-colors sm:mt-0"
                  >
                    Apply now
                    <ArrowRight size={16} />
                  </a>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {role.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[14px] text-[#62646a]">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#f97316]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-[#fff7ed] p-6 md:p-8">
          <h2 className="text-[18px] font-semibold text-[#7c2d12]">Don&apos;t see the right role?</h2>
          <p className="mt-2 text-[15px] text-[#7c2d12]/80">
            Send your resume and a short note to{" "}
            <a href="mailto:careers@misterplumbr.in" className="font-semibold underline">
              careers@misterplumbr.in
            </a>{" "}
            and we will get in touch when a fit opens up.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
