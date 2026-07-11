import PageShell from "../components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy policy" subtitle="How we collect, use and protect your personal information.">
      <div className="space-y-8 rounded-[20px] border border-[#e4e4e7] bg-white p-6 shadow-sm md:p-10">
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">1. Information we collect</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            We collect your name, phone number, email, address and service details when you register or book a service.
            We also collect photos, videos and chat messages related to your plumbing request.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">2. How we use your information</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            Your information is used to provide estimates, assign plumbers, process payments, send service updates and improve our platform.
            We do not sell your personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">3. Sharing with plumbers</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            Only the details required to complete the job — such as address, issue description and contact number — are shared with the assigned plumber.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">4. Data security</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            We use industry-standard encryption and access controls to protect your data. Payment information is handled by secure PCI-DSS compliant providers.
          </p>
        </section>
        <section>
          <h2 className="text-[17px] font-semibold text-[#222325]">5. Your rights</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#62646a]">
            You can request access, correction or deletion of your data by emailing us at{" "}
            <a href="mailto:privacy@misterplumbr.in" className="text-[#f97316] hover:underline">
              privacy@misterplumbr.in
            </a>
            .
          </p>
        </section>
        <p className="text-[13px] text-[#74767e]">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
      </div>
    </PageShell>
  );
}
