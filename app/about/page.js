import { Section } from "../../components/Section";
import { site } from "../../content/site";

export const metadata = { title: "About • Quantum Shop Studio" };

export default function AboutPage() {
  return (
    <div>
      <Section title={site.about.title} subtitle="Shopify development with engineering discipline.">
        <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
          <p>{site.about.body}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3 text-sm" role="list" aria-label="Development approach">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
              <h3 className="font-medium text-white">Stack</h3>
              <p className="mt-1">Shopify CLI • Liquid • GitHub • Actions • Cursor</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
              <h3 className="font-medium text-white">Principles</h3>
              <p className="mt-1">Performance budgets • Accessibility • Maintainability</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
              <h3 className="font-medium text-white">Delivery</h3>
              <p className="mt-1">PR-based changes • Release notes • Rollback plan</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
