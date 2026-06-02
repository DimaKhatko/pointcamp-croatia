import { ShieldCheck, Sparkles, Users, Languages } from "lucide-react";
import { WHY_CARDS } from "./data";

const ICONS = {
  trust: Sparkles,
  shield: ShieldCheck,
  team: Users,
  english: Languages,
} as const;

const TINTS = ["bg-sun/40", "bg-mint/40", "bg-sea/30", "bg-primary/15"] as const;

export function WhyPointCamp() {
  return (
    <section
      aria-labelledby="why-heading"
      className="scroll-mt-24 bg-secondary/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            Чому Point Camp
          </p>
          <h2
            id="why-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Шістнадцять років довіри батьків — у нашій ДНК.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl ${TINTS[i]} text-primary`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}