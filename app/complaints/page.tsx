import PageShell from "../components/PageShell";
import { MessageCircle, Clock, Phone, CheckCircle } from "../components/icons";

const steps = [
  { icon: MessageCircle, title: "Step 1: Tell us what happened", text: "Use the contact form, email or call us with your booking ID and a clear description of the issue." },
  { icon: Clock, title: "Step 2: We investigate", text: "Our team reviews the job notes, photos and plumber feedback within 24 hours." },
  { icon: Phone, title: "Step 3: Resolution call", text: "We speak with you and the plumber if needed, then propose a fair resolution." },
  { icon: CheckCircle, title: "Step 4: Action & closure", text: "This may include a free revisit, partial refund or disciplinary action. We confirm closure with you." },
];

export default function ComplaintsPage() {
  return (
    <PageShell title="Complaints" subtitle="We take service issues seriously. Here is how we resolve them.">
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="rounded-[16px] border border-[#e4e4e7] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
                <s.icon size={20} />
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-[#222325]">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#62646a]">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-[18px] font-semibold text-[#222325]">Common complaints we handle</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Issue not fully resolved",
              "Delay in plumber arrival",
              "Unexpected cost increase",
              "Behaviour or cleanliness concerns",
              "Damage during service",
              "Refund delay",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-[#62646a]">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#f97316]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[20px] bg-[#222325] p-6 text-white md:p-10">
          <h2 className="text-[18px] font-semibold">Escalation contacts</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[14px] text-[#dadbdd]">Email</p>
              <a href="mailto:support@misterplumbr.in" className="text-[16px] font-semibold text-[#f97316] hover:underline">
                support@misterplumbr.in
              </a>
            </div>
            <div>
              <p className="text-[14px] text-[#dadbdd]">Phone</p>
              <a href="tel:+918012345678" className="text-[16px] font-semibold text-[#f97316] hover:underline">
                +91 80 1234 5678
              </a>
            </div>
          </div>
          <p className="mt-5 text-[14px] text-[#dadbdd]">
            We aim to acknowledge complaints within 4 hours and close them within 3 working days.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
