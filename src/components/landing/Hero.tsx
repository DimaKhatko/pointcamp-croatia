import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { QUICK_FACTS } from "./data";
import { priceChipLabel } from "@/lib/pricing";
import { usePriceState } from "@/lib/usePriceState";
import { HeroSunGlow } from "./decor/HeroSunGlow";
import { HeroWaveDivider } from "./decor/HeroWaveDivider";
import { Underline } from "./decor/Underline";
import { AccentDot } from "./decor/AccentDot";

export function Hero() {
  // Current price for the price chip; before mount it is the build-day tier drawn as a
  // skeleton of exactly its own size (see usePriceState).
  const { state: priceState, ready } = usePriceState();
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroBackground />
      {/* Scrim for text/header contrast, lg+ only (below lg the hero is the pure photo) — see .hero-scrim in styles.css */}
      <div aria-hidden className="hero-scrim absolute inset-0 hidden lg:block" />
      <HeroSunGlow />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        <div className="grid w-full grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:max-[1099px]:gap-x-[88px]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" />
              Літо 2027 · Pakoštane, Хорватія
            </span>

            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm max-lg:[text-shadow:0_1px_2px_rgba(0,20,40,0.5),0_2px_14px_rgba(0,20,40,0.6)] lg:[text-shadow:0_1px_2px_rgba(0,20,40,0.4),0_2px_12px_rgba(0,20,40,0.45)] sm:text-5xl md:text-6xl lg:text-7xl">
              Десять днів, які ваша дитина пам'ятатиме&nbsp;<Underline color="sun">все життя</Underline>
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-white/90 max-lg:[text-shadow:0_1px_2px_rgba(0,20,40,0.5),0_2px_14px_rgba(0,20,40,0.6)] lg:[text-shadow:0_1px_2px_rgba(0,20,40,0.4),0_2px_12px_rgba(0,20,40,0.45)] md:text-xl">
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
            const isPrice = typeof fact !== "string";
            return (
              <li
                key={isPrice ? "price" : fact}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md shadow-[0_6px_18px_-10px_rgba(0,0,0,0.35)]"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: dot, boxShadow: `0 0 8px ${dot}` }}
                />
                {isPrice ? (
                  <span
                    aria-hidden={!ready}
                    className={`whitespace-nowrap ${
                      ready ? "" : "animate-pulse select-none rounded bg-white/25 text-transparent"
                    }`}
                  >
                    {priceChipLabel(priceState)}
                  </span>
                ) : (
                  fact
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <HeroWaveDivider />
    </section>
  );
}

const HERO_BG = `${import.meta.env.BASE_URL}hero-bg/`;

/**
 * Full-bleed hero background with art direction: a portrait 9:16 crop below `lg`
 * and the landscape 4:3 photo from `lg` up (AVIF first, WebP fallback). The
 * `<source>` order matters — the first one whose media + type match wins.
 *
 * This image is the LCP element, so it is eager, `fetchPriority="high"` and
 * carries width/height. It fills the section (`absolute inset-0`) so its box
 * never depends on the file, i.e. no layout shift. `object-position` keeps the
 * boats and shoreline in frame on desktop (centre 60%). On phones the image is
 * scaled to the hero's height (~1100px), so only ~60% of its width fits and the
 * rest is cropped sideways. x=95% shows the big blue-white sail on the right and
 * the centre paddle boarder; the two boarders on the left are cropped (they sit
 * ~84% of the image width away from the sail, which no phone-width crop can
 * hold). From ~640px the image scales by width instead and nothing is cropped
 * sideways, so x no longer matters; from md (768px) the crop is shifted up
 * (y=20%) so sky stays under the dark header logo/nav.
 */
function HeroBackground() {
  const desktop = (ext: "avif" | "webp") =>
    `${HERO_BG}hero-bg-1280.${ext} 1280w, ${HERO_BG}hero-bg-1920.${ext} 1920w`;
  const mobile = (ext: "avif" | "webp") =>
    `${HERO_BG}hero-bg-mobile-640.${ext} 640w, ${HERO_BG}hero-bg-mobile-828.${ext} 828w`;
  return (
    <picture>
      <source media="(min-width: 1024px)" type="image/avif" srcSet={desktop("avif")} sizes="100vw" width={1920} height={1438} />
      <source media="(min-width: 1024px)" type="image/webp" srcSet={desktop("webp")} sizes="100vw" width={1920} height={1438} />
      <source type="image/avif" srcSet={mobile("avif")} sizes="100vw" width={828} height={1472} />
      <source type="image/webp" srcSet={mobile("webp")} sizes="100vw" width={828} height={1472} />
      <img
        src={`${HERO_BG}hero-bg-1280.webp`}
        alt="Діти на сапбордах і парусниках біля табору Pine Beach, Хорватія"
        width={1920}
        height={1438}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[95%_center] md:object-[95%_20%] lg:object-[center_60%]"
      />
    </picture>
  );
}

/**
 * Polaroid photo collage — one node, two layouts.
 *
 * DESKTOP (lg+): the hero's right grid column. Central card in flow (large,
 * static -3° tilt); the two side cards are pinned to opposite corners. The
 * squad card sits far enough left that it never covers the central caption.
 *
 * MOBILE/TABLET (<lg): the same node falls into normal flow BELOW the CTAs and
 * ABOVE the quick-facts, rendering as a horizontal three-card fan (crew ·
 * jump · duck) with tilts -6° / 2° / 7°. The centre card is wider and in front
 * so its caption "Point Camp · Croatia" fits on one line at 11px; neighbours
 * overlap by only ~10px (~10% of a side card) so every photo and caption
 * stays readable — the tilts add to the visual overlap. Card widths use clamp() so the row scales
 * down on narrow phones instead of overflowing. The hero copy fills the first
 * viewport, so the fan sits under it: H1 and the primary CTA stay uncovered.
 *
 * A single `<img>` per card (no duplicate hidden block) keeps mobile to the
 * 400px variants: each `sizes` value maps the on-screen width. Every card
 * carries width/height + `aspect-square` so the box is reserved before load
 * (no layout shift).
 */
function HeroCollage() {
  return (
    <div className="relative mx-auto flex w-full min-w-0 max-w-[26rem] items-center justify-center [--overlap:clamp(8px,6.1vw,22px)] [--w-mid:clamp(130px,43.5vw,170px)] [--w-side:clamp(91px,30.4vw,120px)] lg:block lg:w-[414px] lg:max-w-none">
      {/* Central card. Desktop: first in DOM (bottom of the stack), static -3°
          tilt. Mobile: middle of the row, in front, wider than its neighbours.
          `relative` so its corner tape strips anchor to it. */}
      <figure className="polaroid relative z-10 order-2 shrink-0 -mx-[var(--overlap)] w-[var(--w-mid)] rotate-2 lg:z-auto lg:mx-0 lg:w-full lg:-rotate-3">
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-jump"
            alt="Хлопчик стрибає з водної гірки в море"
            sizes="(min-width:1024px) 414px, 170px"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Tape on the diagonal — TL + BR corners (the other two are covered by
            the side cards on desktop). Yellow, per brand tokens. */}
        <span
          className="tape -left-3 -top-2.5 lg:-left-[18px] lg:-top-4"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "-35deg" } as CSSProperties}
        />
        <span
          className="tape -bottom-2.5 -right-3 lg:-bottom-4 lg:-right-[11px] xl:-right-[18px]"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "35deg" } as CSSProperties}
        />
        <figcaption className="mt-2 text-center font-display text-[11px] font-semibold leading-tight text-foreground lg:mt-3 lg:text-base">
          Point Camp · Croatia
        </figcaption>
      </figure>

      {/* Duck card — mobile: right of the row (7°); desktop: top-right corner (6°) */}
      <figure
        className="polaroid polaroid-tilt relative order-3 shrink-0 w-[var(--w-side)] [--tilt:7deg] lg:absolute lg:-right-[4px] lg:-top-[55px] lg:w-[184px] lg:[--tilt:6deg] xl:-right-[55px]"
      >
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-duck"
            alt="Дівчинка в касці з гумовою качкою у мотузковому парку"
            sizes="(min-width:1024px) 184px, 120px"
            className="h-full w-full object-cover"
          />
        </div>
        <span
          className="tape tape-sm -top-2 lg:-top-3"
          aria-hidden
          style={{ "--tape-color": "var(--mint)", "--tape-rotate": "-4deg", left: "50%", transform: "translateX(-50%)" } as CSSProperties}
        />
        <figcaption className="mt-2 text-balance text-center font-display text-[11px] font-semibold leading-tight text-foreground lg:text-[13px]">
          Helmet on. Duck on.
        </figcaption>
      </figure>

      {/* Crew card — mobile: left of the row (-6°); desktop: bottom-left corner
          (-8°), shifted well left so it clears the central caption. */}
      <figure
        className="polaroid polaroid-tilt relative order-1 shrink-0 w-[var(--w-side)] [--tilt:-6deg] lg:absolute lg:-bottom-[62px] lg:-left-[83px] lg:w-[184px] lg:[--tilt:-8deg]"
      >
        <div className="relative aspect-square overflow-hidden rounded-[2px]">
          <ResponsiveImage
            image="hero-crew"
            alt="Діти й вожаті табору разом"
            sizes="(min-width:1024px) 184px, 120px"
            className="h-full w-full object-cover"
          />
        </div>
        <span
          className="tape tape-sm -top-2 lg:-top-3"
          aria-hidden
          style={{ "--tape-color": "var(--sun)", "--tape-rotate": "5deg", left: "50%", transform: "translateX(-50%)" } as CSSProperties}
        />
        <figcaption className="mt-2 text-balance text-center font-display text-[11px] font-semibold leading-tight text-foreground lg:text-[13px]">
          The squad
        </figcaption>
      </figure>
    </div>
  );
}
