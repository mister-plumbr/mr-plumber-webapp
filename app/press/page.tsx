import PageShell from "../components/PageShell";
import { Mail, ArrowRight } from "../components/icons";

const coverage = [
  { title: "Mister Plumbr raises seed funding to expand verified plumbing network", date: "Jan 2026", source: "TechCircle" },
  { title: "How human-reviewed estimates are changing home services", date: "Dec 2025", source: "YourStory" },
  { title: "Five plumbing startups to watch in Bangalore", date: "Nov 2025", source: "Inc42" },
];

export default function PressPage() {
  return (
    <PageShell title="Press" subtitle="News, media resources and company updates.">
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-[18px] font-semibold text-[#222325]">Media kit</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#62646a]">
              Download our logo, brand colours and founder photos for press use. Please credit images to “Mister Plumbr.”
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-[8px] border border-[#dadbdd] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#222325] hover:bg-[#f4f4f5] transition-colors">
              Download press kit
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-[18px] font-semibold text-[#222325]">Press contact</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#62646a]">
              For interview requests, speaking opportunities or partnership enquiries, reach out to our communications team.
            </p>
            <a
              href="mailto:press@misterplumbr.in"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-[#f97316] hover:text-[#ea580c]"
            >
              <Mail size={18} />
              press@misterplumbr.in
            </a>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Recent coverage</h2>
          <div className="mt-6 divide-y divide-[#e4e4e7]">
            {coverage.map((item) => (
              <div key={item.title} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                <p className="text-[15px] font-semibold text-[#222325]">{item.title}</p>
                <p className="text-[13px] text-[#62646a]">
                  {item.source} • {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
