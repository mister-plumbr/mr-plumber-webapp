import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import { CheckCircle, HelpCircle } from "../../components/icons";

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  commonIssues: string[];
  whatsIncluded: string[];
  faqs: { q: string; a: string }[];
}

const services: Record<string, ServiceData> = {
  "tap-repair": {
    title: "Tap & Faucet Repair",
    subtitle: "Fix dripping taps, low pressure, broken handles and mixer faults quickly.",
    description:
      "A leaking tap wastes water and money. Our verified plumbers diagnose the root cause — whether it is a worn washer, damaged cartridge, aerator block or high-pressure issue — and fix it with genuine spare parts.",
    commonIssues: [
      "Continuous dripping even when closed",
      "Low or uneven water flow",
      "Loose or wobbly handle",
      "Noisy or squeaky tap",
      "Sensor tap not responding",
    ],
    whatsIncluded: [
      "Visual inspection & leak diagnosis",
      "Washer, cartridge or valve replacement",
      "Aerator and spout cleaning",
      "Water pressure check",
      "Post-repair leak testing",
    ],
    faqs: [
      {
        q: "How long does a tap repair take?",
        a: "Most tap repairs are completed within 30–60 minutes, depending on spare-part availability.",
      },
      {
        q: "Do I need to buy parts separately?",
        a: "No. The plumber carries common washers and cartridges. For rare models, we source them and add the cost to the estimate.",
      },
      {
        q: "Is there a warranty?",
        a: "Yes. We offer a 30-day service warranty on tap repairs and replaced parts.",
      },
    ],
  },
  "pipe-leak": {
    title: "Pipe Leak Repair",
    subtitle: "Stop hidden leaks, burst pipes and wall seepage before they cause damage.",
    description:
      "Even a small pipe leak can lead to mold, damp walls and high water bills. We locate the source, repair or replace the damaged section, and test the system to prevent recurrence.",
    commonIssues: [
      "Damp patches on walls or ceilings",
      "Water pooling under sinks",
      "Low water pressure throughout the home",
      "Sound of running water when taps are off",
      "Rusty or corroded visible pipes",
    ],
    whatsIncluded: [
      "Leak detection & source tracing",
      "Pipe patching or section replacement",
      "Joint sealing & clamping",
      "Pressure testing",
      "Damp-damage assessment advice",
    ],
    faqs: [
      {
        q: "Can you detect hidden leaks?",
        a: "Yes. Our plumbers use pressure tests, moisture meters and experience-based tracing to find concealed leaks.",
      },
      {
        q: "Will you break the wall?",
        a: "We try non-invasive fixes first. If wall cutting is needed, we keep it minimal and advise cost upfront.",
      },
      {
        q: "Do you repair both PVC and metal pipes?",
        a: "Yes. We handle CPVC, PVC, copper, GI and PPR piping.",
      },
    ],
  },
  "drain-cleaning": {
    title: "Drain Cleaning",
    subtitle: "Clear clogged sinks, slow drains and foul odors safely.",
    description:
      "Kitchen grease, hair and soap residue build up over time and block drains. We clear blockages with the right tools, restore flow and help prevent future clogs.",
    commonIssues: [
      "Sink or basin draining slowly",
      "Gurgling sounds from drain",
      "Foul smell from sink or bathroom drain",
      "Water backing up into sink",
      "Recurring blockage every few weeks",
    ],
    whatsIncluded: [
      "Drain inspection & clog location",
      "Manual snaking or jetting",
      "Grease and debris removal",
      "Odor treatment",
      "Prevention tips for maintenance",
    ],
    faqs: [
      {
        q: "Is drain cleaning safe for old pipes?",
        a: "Yes. We choose the right method based on pipe condition — gentle snaking for older pipes and jetting for tougher blocks when safe.",
      },
      {
        q: "How can I prevent future clogs?",
        a: "Avoid pouring grease down the sink, use drain strainers and schedule a preventive clean every 6–12 months.",
      },
      {
        q: "Do you clean bathroom floor drains?",
        a: "Absolutely. We clear hair, soap and silt from all types of floor and shower drains.",
      },
    ],
  },
  "toilet-repair": {
    title: "Toilet Repair",
    subtitle: "Fix running toilets, weak flushes, leaks and blockages.",
    description:
      "Toilet problems are inconvenient and can waste a lot of water. From flush mechanisms to base seals, we repair all common toilet faults with neat, clean workmanship.",
    commonIssues: [
      "Toilet keeps running after flush",
      "Weak or incomplete flush",
      "Water leaking at the base",
      "Clogged bowl",
      "Broken flush handle or button",
    ],
    whatsIncluded: [
      "Flush mechanism repair or replacement",
      "Blockage removal",
      "Wax seal / base leak repair",
      "Cistern tuning & float adjustment",
      "Seat, handle or button replacement",
    ],
    faqs: [
      {
        q: "Why does my toilet keep running?",
        a: "It is usually a worn flapper, faulty fill valve or incorrect float level. We replace the defective part and tune the cistern.",
      },
      {
        q: "Can you replace a toilet seat?",
        a: "Yes. We can replace seats, handles, flush buttons and other accessories as part of the visit.",
      },
      {
        q: "Do you install new toilets?",
        a: "Yes. If a repair is not economical, we can supply and install a new commode with proper sealing.",
      },
    ],
  },
  "water-heater": {
    title: "Water Heater / Geyser Repair",
    subtitle: "Get reliable hot water back with safe, expert geyser service.",
    description:
      "No hot water, fluctuating temperature or a leaking geyser can ruin your day. Our technicians check electrical and plumbing connections, replace faulty parts and ensure safe operation.",
    commonIssues: [
      "No hot water at all",
      "Water not hot enough",
      "Geyser leaking from bottom or valves",
      "Strange popping or rumbling noise",
      "Pilot light or indicator not working",
    ],
    whatsIncluded: [
      "Heating element & thermostat check",
      "Safety valve & pressure relief inspection",
      "Tank descaling and flush",
      "Electrical connection safety check",
      "Anode rod condition assessment",
    ],
    faqs: [
      {
        q: "Is it safe to repair a geyser myself?",
        a: "We do not recommend it. Geysers combine water and electricity; incorrect handling can be dangerous. Let a verified technician handle it.",
      },
      {
        q: "How often should a geyser be serviced?",
        a: "An annual service helps prevent failures, removes scale and keeps the unit energy efficient.",
      },
      {
        q: "Do you repair instant and storage geysers?",
        a: "Yes. We service both instant and storage water heaters across major brands.",
      },
    ],
  },
  "bathroom-fitting": {
    title: "Bathroom Fitting",
    subtitle: "Install showers, mixers, accessories and CP fittings cleanly.",
    description:
      "Whether you are renovating or replacing a single fixture, we install bathroom fittings with proper alignment, sealing and pressure testing so everything looks good and works flawlessly.",
    commonIssues: [
      "Shower head dripping or spraying unevenly",
      "Mixer handle loose or stiff",
      "Low shower pressure",
      "New accessory needs secure mounting",
      "Rusted or outdated fittings",
    ],
    whatsIncluded: [
      "Shower, mixer and faucet installation",
      "Accessory mounting (racks, rods, hooks)",
      "Concealed pipe routing support",
      "Thread sealant and leak testing",
      "Final pressure & alignment check",
    ],
    faqs: [
      {
        q: "Do I need to buy fittings before the visit?",
        a: "You can buy your preferred model, or we can suggest reliable options and source them for you.",
      },
      {
        q: "Will drilling damage tiles?",
        a: "Our plumbers use tile-safe drill bits and take care to minimize marks. We clean up after installation.",
      },
      {
        q: "Can you replace only the mixer cartridge?",
        a: "Yes. If the body is fine, replacing the cartridge is a quick and cost-effective fix.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return notFound();

  return (
    <PageShell title={service.title} subtitle={service.subtitle}>
      <div className="space-y-12">
        {/* Intro */}
        <p className="max-w-3xl text-[17px] leading-[1.7] text-[#62646a]">{service.description}</p>

        {/* Common issues & what's included */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-[18px] font-semibold text-[#222325]">Common problems we fix</h2>
            <ul className="mt-5 space-y-3">
              {service.commonIssues.map((issue) => (
                <li key={issue} className="flex items-start gap-3 text-[15px] text-[#62646a]">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-[18px] font-semibold text-[#222325]">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#62646a]">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", text: "Upload photos and describe the issue." },
              { step: "02", text: "We review and send a fair estimate." },
              { step: "03", text: "A verified plumber arrives and fixes it." },
            ].map((s) => (
              <div key={s.step} className="rounded-[16px] bg-[#fafafa] p-5">
                <span className="text-[24px] font-semibold text-[#f97316]">{s.step}</span>
                <p className="mt-2 text-[15px] text-[#62646a]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="rounded-[12px] border border-[#e4e4e7] p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                  <div>
                    <p className="text-[15px] font-semibold text-[#222325]">{faq.q}</p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#62646a]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
