import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INCLUDED, NOT_INCLUDED, DISCOUNTS } from "./data";
import { formatPrice, formatUkDate } from "@/lib/pricing";
import type { PriceState } from "@/lib/pricing";
import { usePriceState } from "@/lib/usePriceState";

/**
 * "Дати та вартість". Dates, inclusions and discounts are plain constants
 * (data.ts and the two below); the price comes from the ladder in
 * src/lib/pricing.ts. Layout: a price card, "Що входить" (a list below lg, a
 * card grid on lg+), a slim "Не входить" row and the discounts as badge cards.
 */
const DATES = "31.07\u00A0—\u00A009.08.2027";
const DURATION = "10 днів на Адріатиці";

/** Skeleton looks (the text keeps its layout but is transparent, on a pulsing bar). */
const SKELETON_BLOCK = "animate-pulse select-none rounded-xl bg-white/20 text-transparent";
const SKELETON_TEXT =
  "animate-pulse select-none rounded bg-white/15 text-transparent [box-decoration-break:clone]";

/**
 * The text lines under/next to the big price for the current tier. The presale
 * shows who it is for and what comes next; later tiers only "until X · from Y"
 * (the returning-participant discount is its own card below), and the last tier
 * is the bare price.
 */
function priceLines(state: PriceState): { line: string | null; small: string | null } {
  if (state.returningOnly) {
    return {
      line: `Для тих, хто вже був з нами · до ${formatUkDate(state.end ?? "")}`,
      small: state.next
        ? `З ${formatUkDate(state.next.start)} — ${formatPrice(state.next.price)}`
        : null,
    };
  }
  const until = state.end ? `до ${formatUkDate(state.end)}` : null;
  const next = state.next
    ? ` · з ${formatUkDate(state.next.start)} — ${formatPrice(state.next.price)}`
    : "";
  return { line: until ? `${until}${next}` : null, small: null };
}

export function DatesPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pulse, setPulse] = useState(false);
  // `state` is the live tier once mounted and the build-day tier before that (then
  // `ready` is false and the content is drawn as a same-size skeleton), see usePriceState.
  const { state: priceState, ready } = usePriceState();
  const lines = priceLines(priceState);
  const visibleDiscounts = DISCOUNTS.filter(
    (d) => !(d.hideDuringPresale && priceState.returningOnly),
  );

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
              {/* Before mount the build-day tier is drawn with transparent text on a pulsing
                  background: identical markup, so it takes exactly the real content's space. */}
              <div
                aria-busy={!ready}
                aria-hidden={!ready}
                aria-live="polite"
                className="flex w-full flex-col items-start gap-2 lg:w-auto lg:min-w-[19rem] lg:items-end lg:text-right"
              >
                <span
                  className={`text-6xl font-extrabold leading-none tracking-tight md:text-7xl ${
                    ready ? "" : SKELETON_BLOCK
                  }`}
                >
                  {formatPrice(priceState.price)}
                </span>
                {lines.line && (
                  <p className="mt-2 max-w-[22rem] text-base font-medium text-primary-foreground/90">
                    <span className={ready ? undefined : SKELETON_TEXT}>{lines.line}</span>
                  </p>
                )}
                {lines.small && (
                  <p className="max-w-[22rem] text-sm text-primary-foreground/70">
                    <span className={ready ? undefined : SKELETON_TEXT}>{lines.small}</span>
                  </p>
                )}
              </div>
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
          {/* Before mount every card is rendered but invisible (they hold the space, so
              nothing shifts); after mount the presale-hidden ones are dropped. */}
          <ul
            aria-hidden={!ready}
            className={`mt-5 grid grid-cols-2 gap-3 transition-opacity duration-300 sm:gap-4 max-lg:[&>li:last-child:nth-child(odd)]:col-span-2 ${
              visibleDiscounts.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } ${ready ? "opacity-100" : "opacity-0"}`}
          >
            {visibleDiscounts.map((d) => (
              <li
                key={d.title}
                className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
              >
                <span className="whitespace-nowrap rounded-full bg-sun px-2 py-1 text-[12px] font-extrabold text-sun-foreground min-[360px]:px-2.5 min-[360px]:text-[13px] sm:px-3 sm:text-sm">
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
