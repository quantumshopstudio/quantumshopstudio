export function Section({ title, subtitle, children }) {
  const id = title
    ? `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
    : undefined;

  return (
    <section className="mb-16 md:mb-20" aria-labelledby={id}>
      <div className="mb-5">
        {title && (
          <h2 id={id} className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-2 text-slate-300 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
