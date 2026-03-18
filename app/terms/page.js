import { Section } from "../../components/Section";

export const metadata = { title: "Terms of Use • Quantum Shop Studio" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-3 text-slate-300">
        These Terms govern your use of this website and any inquiries submitted through the contact
        form.
      </p>

      <div className="mt-8 space-y-10">
        <Section title="Informational use">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Content is provided for general information about services offered by Quantum Shop
            Studio LLC and may be updated at any time.
          </div>
        </Section>

        <Section title="No warranties">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            This site is provided “as is” without warranties of any kind, express or implied, to the
            fullest extent permitted by law.
          </div>
        </Section>

        <Section title="Limitation of liability">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Quantum Shop Studio LLC is not liable for any indirect, incidental, or consequential
            damages arising from your use of this site.
          </div>
        </Section>

        <Section title="Contact submissions">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            Do not submit sensitive information (e.g., passwords, payment details). By submitting
            the contact form, you confirm the information is accurate to the best of your knowledge
            and you authorize a response to the email address provided.
          </div>
        </Section>

        <Section title="Changes">
          <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
            These Terms may be updated periodically. Continued use of the site indicates acceptance
            of the updated Terms.
          </div>
        </Section>
      </div>
    </div>
  );
}

