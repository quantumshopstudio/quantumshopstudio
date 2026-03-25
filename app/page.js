import Link from "next/link";
import { Section } from "../components/Section";
import { site } from "../content/site";

export default function Home() {
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/40 p-8 shadow-glow">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-neonViolet/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-neonCyan/10 blur-3xl" aria-hidden="true" />

        <h1 className="relative text-3xl md:text-5xl font-semibold tracking-tight">
          {site.hero.title}
        </h1>
        <p className="relative mt-4 max-w-2xl text-slate-200">{site.hero.subtitle}</p>

        <div className="relative mt-6 flex flex-wrap gap-3">
          {site.hero.ctas.map((c) => {
            const base =
              "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition";
            const styles =
              c.variant === "primary"
                ? "bg-neonCyan/15 text-neonCyan shadow-glow hover:bg-neonCyan/20"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10";

            return (
              <Link key={c.href} href={c.href} className={[base, styles].join(" ")}>
                {c.label}
              </Link>
            );
          })}
        </div>

        <div className="relative mt-8 grid gap-3 md:grid-cols-3 text-sm text-slate-300" role="list" aria-label="Key capabilities">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
            <h2 className="font-medium text-white text-base">Shopify 2.0 builds</h2>
            <p className="mt-1">Sections, blocks, templates, metafields done cleanly.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
            <h2 className="font-medium text-white text-base">GitHub-connected themes</h2>
            <p className="mt-1">PR-based delivery with repeatable releases.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4" role="listitem">
            <h2 className="font-medium text-white text-base">Performance discipline</h2>
            <p className="mt-1">Core Web Vitals driven optimization, not guesswork.</p>
          </div>
        </div>
      </div>

      <Section title="Services" subtitle="Specialized Shopify engineering with a production workflow.">
        <div className="grid gap-4 md:grid-cols-2">
          {site.services.slice(0, 4).map((s) => (
            <article key={s.title} className="rounded-2xl border border-white/10 bg-panel/30 p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <ul className="mt-3 list-disc pl-5 text-slate-300">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-5">
          <Link className="text-neonCyan hover:underline" href="/services">
            See all services →
          </Link>
        </div>
      </Section>

      <Section title="Samples" subtitle="A few example engagements and outcomes.">
        <div className="grid gap-4 md:grid-cols-3">
          {site.samples.map((p) => (
            <article key={p.title} className="rounded-2xl border border-white/10 bg-panel/30 p-6">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Tags for ${p.title}`}>
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 list-none"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="Workflow"
        subtitle="How client themes stay connected to GitHub for safe, repeatable delivery."
      >
        <div className="rounded-2xl border border-white/10 bg-panel/30 p-6 text-slate-300">
          <ol className="grid gap-3 md:grid-cols-3" aria-label="Delivery workflow steps">
            <li>
              <h3 className="font-medium text-white">1) Connect</h3>
              <p>Repo-per-client theme, Shopify Partner access, and secrets stored server-side.</p>
            </li>
            <li>
              <h3 className="font-medium text-white">2) Build</h3>
              <p>Pull requests for every change, preview branches, and clear release notes.</p>
            </li>
            <li>
              <h3 className="font-medium text-white">3) Ship</h3>
              <p>Automation, backups, rollback plan, and performance budget enforcement.</p>
            </li>
          </ol>
        </div>
      </Section>
    </div>
  );
}
