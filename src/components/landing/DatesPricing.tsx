import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INCLUDED, NOT_INCLUDED, DISCOUNTS } from "./data";

/**
 * "Дати та вартість". All dates, prices, inclusions and discounts are plain
 * constants (data.ts and the three below), there is no backend. Layout: a price
 * card, "Що входить" (a list below lg, a card grid on lg+), a slim "Не входить"
 * row and the discounts as badge cards.
 */
const DATES = "31.07 — 09.08.2027";
const DURATION = "10 днів на Адріатиці";
const PRICE = "1550 €";

export function DatesPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pulse, setPulse] = useState(false);

  // One soft pulse on the CTA the first time the section is ~30% in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPulse(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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

        {/* Price card */}
        <article className="relative mt-12 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-xl sm:p-8 md:p-10">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sun/40 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                Flagship заїзд
              </span>
              <p className="mt-5 whitespace-nowrap text-[1.5rem] font-extrabold leading-tight min-[360px]:text-[1.75rem] sm:text-4xl md:text-5xl">
                {DATES}
              </p>
              <p className="mt-2 text-primary-foreground/80 md:text-lg">{DURATION}</p>
            </div>

            <div className="flex flex-col items-start gap-5 border-t border-white/15 pt-8 lg:items-end lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <span className="text-6xl font-extrabold tracking-tight md:text-7xl">{PRICE}</span>
              <p className="inline-flex items-center gap-2 rounded-full bg-sun/90 px-3 py-1.5 text-sm font-semibold text-sun-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Місць небагато
              </p>
              <Button
                asChild
                size="lg"
                className={`h-12 w-full bg-sun px-7 text-base text-sun-foreground hover:bg-sun/90 sm:w-auto ${
                  pulse ? "animate-cta-pulse" : ""
                }`}
              >
                <a href="#apply" onAnimationEnd={() => setPulse(false)}>
                  Забронювати місце
                </a>
              </Button>
            </div>
          </div>
        </article>

        {/* Що входить: list below lg, card grid on lg+ */}
        <div className="mt-14">
          <h3 className="flex items-center gap-2.5 text-xl font-bold text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-mint/60 text-mint-foreground">
              <Check className="h-4 w-4" aria-hidden />
            </span>
            Що входить
          </h3>

          <ul className="mt-5 space-y-3 rounded-3xl border border-border bg-card p-6 lg:hidden">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-foreground/90">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-5 hidden gap-4 lg:grid lg:grid-cols-4">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-mint/50 text-mint-foreground">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-[15px] font-medium leading-snug text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          {/* Не входить: a slim row, so it does not compete with the list above */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-muted/60 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-background text-muted-foreground">
                <X className="h-3.5 w-3.5" aria-hidden />
              </span>
              Не входить
            </h3>
            <ul className="flex flex-col gap-x-8 gap-y-1.5 sm:flex-row sm:flex-wrap">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Знижки */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-foreground">Знижки</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {DISCOUNTS.map((d) => (
              <li
                key={d.title}
                className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
              >
                <span className="rounded-full bg-sun px-3 py-1 text-sm font-extrabold text-sun-foreground">
                  {d.value.replace(/ /g, " ")}
                </span>
                <div>
                  <p className="font-bold leading-snug text-foreground">{d.title}</p>
                  {d.subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
