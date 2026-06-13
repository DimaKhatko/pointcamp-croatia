import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INCLUDED, NOT_INCLUDED, DISCOUNTS } from "./data";

export function DatesPricing() {
  return (
    <section
      id="dates"
      aria-labelledby="dates-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            Дати та вартість
          </p>
          <h2
            id="dates-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Лише <span className="text-primary">55 місць.</span> Бронюйте заздалегідь.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Price card */}
          <article className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground shadow-xl md:p-10">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sun/40 blur-3xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                Flagship заїзд
              </span>
              <p className="mt-5 text-3xl font-extrabold md:text-4xl">
                31.07 — 09.08.2026
              </p>
              <p className="mt-2 text-primary-foreground/80">10 днів на Адріатиці</p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-6xl font-extrabold tracking-tight md:text-7xl">
                  1550&nbsp;€
                </span>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sun/90 px-3 py-1.5 text-sm font-semibold text-sun-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Місць небагато
              </p>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-sun px-7 text-base text-sun-foreground hover:bg-sun/90"
                >
                  <a href="#apply">Забронювати місце</a>
                </Button>
              </div>

              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {DISCOUNTS.map((d) => (
                  <div
                    key={d.title}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-left backdrop-blur-sm"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-tight">{d.title}</p>
                      {d.subtitle && (
                        <p className="mt-0.5 text-xs text-primary-foreground/70">
                          {d.subtitle}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 text-base font-extrabold text-[#FFE8C7]">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Includes */}
          <div className="grid gap-6">
            <article className="rounded-3xl border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-mint/60 text-mint-foreground">
                  <Check className="h-4 w-4" />
                </span>
                Що входить
              </h3>
              <ul className="mt-4 space-y-2.5">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </span>
                Не входить
              </h3>
              <ul className="mt-4 space-y-2.5">
                {NOT_INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}