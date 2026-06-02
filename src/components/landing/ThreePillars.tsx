import { PILLARS } from "./data";

const BG = {
  sea: "bg-sea/40",
  mint: "bg-mint/50",
  sun: "bg-sun/50",
} as const;

export function ThreePillars() {
  return (
    <section
      id="program"
      aria-labelledby="pillars-heading"
      className="scroll-mt-24 bg-secondary/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            Програма
          </p>
          <h2
            id="pillars-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Три кити нашого літа.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`relative flex aspect-[4/3] items-end p-6 ${BG[p.accent]}`}
                role="img"
                aria-label={`Ілюстрація розділу «${p.title}»`}
              >
                <span className="text-5xl font-extrabold text-primary/40">
                  {String(PILLARS.indexOf(p) + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}