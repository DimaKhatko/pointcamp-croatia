import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-sea.jpg";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { QUICK_FACTS } from "./data";
import { HeroSunGlow } from "./decor/HeroSunGlow";
import { HeroWaveDivider } from "./decor/HeroWaveDivider";
import { Underline } from "./decor/Underline";
import { AccentDot } from "./decor/AccentDot";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Тихий захід сонця на Адріатичному узбережжі Хорватії — сосновий ліс, бірюзова вода і пісок"
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Soft purple atmospheric overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--primary) 55%, transparent) 0%, color-mix(in oklab, var(--primary) 18%, transparent) 45%, color-mix(in oklab, var(--background) 40%, transparent) 100%)",
        }}
      />
      <HeroSunGlow />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" />
              Літо 2026 · Pakoštane, Хорватія
            </span>

            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
              Десять днів, які ваша дитина пам'ятатиме&nbsp;<Underline color="sun">все життя</Underline>
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-white/90 md:text-xl">
              Адріатичне море, сосновий ліс і команда, що стає сім'єю. Англомовний
              кемп у Хорватії для дітей 8–17 — без скролінгу, з живою англійською щодня.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-base shadow-[0_12px_30px_-10px_color-mix(in_oklab,var(--sun)_60%,transparent)] transition-transform duration-200 will-change-transform hover:scale-105 hover:shadow-[0_18px_40px_-10px_color-mix(in_oklab,var(--sun)_75%,transparent)] motion-reduce:hover:scale-100"
              >
                <a href="#apply">Залишити заявку</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                <a href="#program">Дивитися програму</a>
              </Button>
              <AccentDot color="var(--mint)" className="ml-1 hidden md:inline-block" size={12} />
            </div>
          </div>

          <HeroCollage />
        </div>

        <ul className="mt-12 flex flex-wrap gap-2 md:gap-3">
          {QUICK_FACTS.map((fact, i) => {
            const dot = ["var(--sun)", "var(--mint)", "var(--sea)", "var(--sand)", "var(--sun)"][i % 5];
            return (
              <li
                key={fact}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md shadow-[0_6px_18px_-10px_rgba(0,0,0,0.35)]"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: dot, boxShadow: `0 0 8px ${dot}` }}
                />
                {fact}
              </li>
            );
          })}
        </ul>
      </div>
      <HeroWaveDivider />
    </section>
  );
}

/**
 * Polaroid photo collage — one node, two layouts.
 *
 * DESKTOP (lg+): the hero's right grid column. Central card in flow (large,
 * static -3° tilt); the two side cards are pinned to opposite corners, spread
 * so they only lightly overlap the central card.
 *
 * MOBILE/TABLET (<lg): the same node falls into normal flow BELOW the CTAs and
 * ABOVE the quick-facts (single-column grid), rendering as a compact fan —
 * three ~112–144px cards overlapping with the same tilts and tape. The hero
 * copy fills the first viewport, so the fan sits under it: on 375×667 / 390×844
 * the H1 and primary CTA stay fully visible and uncovered.
 *
 * A single `<img>` per card (no duplicate hidden block) keeps mobile to the
 * 400px variants: each `sizes` value maps the on-screen width so the browser
 * never picks 800w below `lg`. Every card carries width/height + `aspect-square`
 * so the box is reserved before load (no layout shift). Stacking = DOM order:
 * central first (bottom), side cards on top.
 */
function HeroCollage() {
  return (
    <div className="relative mx-auto w-36 shrink-0 lg:w-[360px]">
      {/* Central card — first in DOM (bottom of stack), static tilt.
          `relative` so its corner tape strips anchor to it. */}
      <figure className="polaroid relative w-full -rotate-3">
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-jump"
            alt="Хлопчик стрибає з водної гірки в море"
            sizes="(min-width:1024px) 360px, 144px"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        {/* Tape on the diagonal — TL + BR corners (the other two are covered by
            the side cards on desktop). Yellow, per brand tokens. */}
        <span
          className="tape"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "-35deg", top: "-14px", left: "-16px" } as CSSProperties}
        />
        <span
          className="tape"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "35deg", right: "-16px", bottom: "-14px" } as CSSProperties}
        />
        <figcaption className="mt-3 hidden text-center font-display text-sm font-semibold text-foreground lg:block">
          Point Camp · Croatia
        </figcaption>
      </figure>

      {/* Duck card — mobile: fans out to the right; desktop: top-right corner */}
      <figure
        className="polaroid polaroid-tilt absolute w-28 lg:w-40 -right-14 lg:-right-12 top-6 lg:-top-12"
        style={{ "--tilt": "6deg" } as CSSProperties}
      >
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-duck"
            alt="Дівчинка в касці з гумовою качкою у мотузковому парку"
            sizes="(min-width:1024px) 160px, 112px"
            className="h-full w-full object-cover"
          />
        </div>
        <span
          className="tape"
          aria-hidden
          style={{ "--tape-color": "var(--mint)", "--tape-rotate": "-4deg", top: "-10px", left: "50%", transform: "translateX(-50%)" } as CSSProperties}
        />
        <figcaption className="mt-2 hidden text-center font-display text-[11px] font-semibold text-foreground lg:block">
          Helmet on. Duck on.
        </figcaption>
      </figure>

      {/* Crew card — mobile: fans out to the left; desktop: bottom-left corner */}
      <figure
        className="polaroid polaroid-tilt absolute w-28 lg:w-40 -left-14 lg:-left-10 top-10 lg:top-auto lg:-bottom-16"
        style={{ "--tilt": "-8deg" } as CSSProperties}
      >
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-crew"
            alt="Діти й вожаті табору разом"
            sizes="(min-width:1024px) 160px, 112px"
            className="h-full w-full object-cover"
          />
        </div>
        <span
          className="tape"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "5deg", top: "-10px", left: "50%", transform: "translateX(-50%)" } as CSSProperties}
        />
        <figcaption className="mt-2 hidden text-center font-display text-[11px] font-semibold text-foreground lg:block">
          The squad
        </figcaption>
      </figure>
    </div>
  );
}