import { Section } from "../../components/Section";
import { site } from "../../content/site";

export const metadata = { title: "Services • Quantum Shop Studio" };

export default function ServicesPage() {
  return (
    <div>
      <Section
        title="Services"
        subtitle="Shopify theme development, optimization, and GitHub workflows built for long-term maintainability."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {site.services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-panel/30 p-6">
              <div className="text-lg font-semibold">{s.title}</div>
              <ul className="mt-3 list-disc pl-5 text-slate-300">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Engagement model" subtitle="Clear scope, tight feedback loops, and production hygiene.">
        <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
          Audit → Plan → Build → QA → Launch → Iterate (optional ongoing support)
        </div>
      </Section>
    </div>
  );
}

