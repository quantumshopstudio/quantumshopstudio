import { Section } from "../../components/Section";
import { site } from "../../content/site";

export const metadata = { title: "Samples • Quantum Shop Studio" };

export default function SamplesPage() {
  return (
    <div>
      <Section
        title="Samples"
        subtitle="Replace these with real projects (or anonymized case studies) and metrics."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.samples.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-panel/30 p-6">
              <div className="font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-slate-300">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

