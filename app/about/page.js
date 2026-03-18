import { Section } from "../../components/Section";
import { site } from "../../content/site";

export const metadata = { title: "About • Quantum Shop Studio" };

export default function AboutPage() {
  return (
    <div>
      <Section title={site.about.title} subtitle="Shopify development with engineering discipline.">
        <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
          <p>{site.about.body}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-white">Stack</div>
              <div className="mt-1">Shopify CLI • Liquid • GitHub • Actions • Cursor</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-white">Principles</div>
              <div className="mt-1">Performance budgets • Accessibility • Maintainability</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-white">Delivery</div>
              <div className="mt-1">PR-based changes • Release notes • Rollback plan</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

