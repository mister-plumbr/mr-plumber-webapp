import PageShell from "../components/PageShell";

export default function TermsPage() {
  return (
    <PageShell title="Terms of service" subtitle="The terms and conditions for using Mister Plumbr.">
      <div className="space-y-8 rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-10">
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">1. Acceptance of terms</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            By using our website or services, you agree to these terms. If you do not agree, please do not use the platform.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">2. Service description</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            Mister Plumbr connects customers with verified plumbers for residential and light commercial plumbing work.
            We provide estimates and facilitate bookings; the actual service is performed by independent plumbers.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">3. Estimates and payments</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            Estimates are based on the information provided. Final charges may vary if the scope changes on-site.
            You must approve any additional cost before work continues. Payment is due after service completion.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">4. User conduct</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            Users must provide accurate information, treat plumbers respectfully and keep the work area safe.
            Abuse, fraud or repeated cancellations may result in account suspension.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">5. Limitation of liability</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            We are not liable for indirect or consequential damages. Our liability is limited to the amount paid for the specific service.
          </p>
        </section>
        <p className="text-[13px] text-[#74767e]">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
      </div>
    </PageShell>
  );
}
