import { Section } from "../../components/Section";

export const metadata = { title: "Privacy Policy • Quantum Shop Studio" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-slate-300">
        This policy explains what information is collected when you use this site and submit the
        contact form.
      </p>

      <div className="mt-8 space-y-10">
        <Section title="Information collected">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            If you submit the contact form, we collect the information you provide (such as name,
            email address, and message). Basic technical information (such as IP address and browser
            details) may also be processed for security and abuse prevention.
          </div>
        </Section>

        <Section title="How information is used">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Information is used to respond to inquiries, provide requested services information,
            and help prevent spam or abuse of the contact form.
          </div>
        </Section>

        <Section title="Mautic (contact management)">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Contact submissions may be stored in Mautic for lead management and follow-up. Only the
            minimum information necessary to respond and manage inquiries should be submitted.
          </div>
        </Section>

        <Section title="Data retention">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Contact submissions may be retained as long as needed to respond and maintain business
            records, unless a longer retention period is required by law.
          </div>
        </Section>

        <Section title="Your choices">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            You can request deletion or correction of your submitted information by contacting us
            using the email address provided on the Contact page.
          </div>
        </Section>
      </div>
    </div>
  );
}

