import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import dotsAmber from "@/assets/Group-1.svg";
import { TakeawayCallout } from "./TakeawayCallout";

/** Rating chips (aggregate scores). */
const RATING_CHIPS = [
  { big: "4,8", star: true, title: "Google Maps · Point Camp", meta: "(17) · Дитячий табір" },
  { big: "98%", title: "рекомендували · Facebook", meta: "Point Camp · 86 відгуків" },
];

/** Research-report cards: a survey question, its headline metric, and a verbatim
 *  parent quote answering that question. Edit freely — order = display order.
 *  `rotate` is the desktop-only polaroid tilt (mobile stays straight & readable). */
const REVIEWS = [
  {
    question: "Чи задоволені Ви нашим табором загалом?",
    percent: "86%",
    label: "повністю задоволені",
    quote: "Стан абсолютного щастя від відпочинку у таборі — дуже сподобалось!",
    name: "Любов",
    rotate: "lg:-rotate-2",
  },
  {
    question: "Чи порекомендували б Ви PointCamp друзям?",
    percent: "95%",
    label: "так, порадили б",
    quote: "Дитина повернулася справді відпочинутою і спокійною.",
    name: "Наталія",
    rotate: "lg:rotate-1",
  },
  {
    question: "Скільки родин повертаються до нас знову?",
    percent: "85%",
    label: "родин повертаються",
    quote: "Перший раз хвилювалась до поїздки, але вже обидва наступні рази лише чекали з нетерпінням.",
    name: "Юлія",
    rotate: "lg:-rotate-1",
  },
];

/** Quote-only cards (no survey question or numbers), shown after the stat cards. */
const QUOTES = [
  {
    quote:
      "Чудовий формат саме для підлітків: їм дають достатньо свободи, можливість бути самостійними й приймати власні рішення, але водночас вони під ненав'язливим і турботливим контролем дорослих.",
    name: "Катерина",
    rotate: "lg:rotate-[1.5deg]",
  },
  {
    quote:
      "Програма продумана до дрібниць: зранку зарядка, потім заняття, спорт, творчі майстерні. Діти постійно зайняті, телефони — мінімально. Безпека на вищому рівні, смачна їжа, фотозвіти щодня.",
    name: "Ірина",
    rotate: "lg:-rotate-[1.5deg]",
  },
  {
    quote:
      "На початку ми з татом хвилювалися — син уперше їхав у такий табір без нас. Але вже під час табору, бачачи його задоволеним, я заспокоїлася. Найбільше він згадує друзів і щоденне купання в морі, а ще — що програма була настільки насиченою, що на телефон майже не залишалося часу.",
    name: "Олена",
    rotate: "lg:rotate-1",
  },
];

const SOFT_SHADOW = "shadow-[0_14px_32px_-20px_rgba(69,43,112,0.45)]";

/** Below lg every card is a slide (85% wide on phones, so the next one peeks ~15%; narrower on tablets); from lg they are grid cells. */
const SLIDE =
  "basis-[85%] shrink-0 grow-0 snap-start sm:basis-[60%] md:basis-[44%] lg:basis-auto lg:shrink";
const CARD_COUNT = REVIEWS.length + QUOTES.length;
/** The strip's start padding (it bleeds to the screen edge: 1rem on phones, 1.5rem from md). */
const stripPad = (el: HTMLElement) => parseFloat(getComputedStyle(el).paddingLeft) || 0;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Six reviews: a 3×2 grid from lg; below lg one horizontal scroll-snap strip with
 * dots below it (same pattern as the resort carousel).
 */
function ReviewCards() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Below lg the container scrolls, so it is a labelled, focusable region; on the lg+ grid it is not.
  const [scrolls, setScrolls] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setScrolls(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Track the slide at the start edge of the strip to drive the dots.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(el.children) as HTMLElement[];
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          setActive(slides.length - 1);
          return;
        }
        let best = 0;
        let bestDist = Infinity;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - stripPad(el) - el.scrollLeft);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = stripRef.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({
      left: slide.offsetLeft - stripPad(el),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-12">
      <div
        ref={stripRef}
        role={scrolls ? "region" : undefined}
        aria-label={scrolls ? "Відгуки батьків" : undefined}
        tabIndex={scrolls ? 0 : undefined}
        className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 pt-1 md:-mx-6 md:scroll-px-6 md:px-6 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFE8C7] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
      >
        {/* Research-report polaroid cards */}
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            className={`flex min-h-[19rem] flex-col lg:h-full rounded-2xl border border-[#452B70]/15 bg-card p-6 text-left transition-transform duration-300 hover:-translate-y-0.5 ${SLIDE} ${r.rotate} lg:hover:rotate-0 ${SOFT_SHADOW}`}
          >
            {/* Survey question — the research-report anchor */}
            <p className="text-xs font-medium uppercase tracking-wide text-[#452B70]/60">
              {r.question}
            </p>

            {/* Headline metric */}
            <p className="mt-3 text-5xl font-extrabold leading-none text-[#452B70]">
              {r.percent}
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#452B70]/70">{r.label}</p>

            <hr className="my-5 border-t border-[#452B70]/15" />

            {/* Verbatim parent quote */}
            <blockquote className="flex-1 text-[15px] italic leading-relaxed text-[#452B70]/85">
              «{r.quote}»
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold not-italic text-[#452B70]">
              — {r.name}
            </figcaption>
          </figure>
        ))}

        {/* Quote-only cards: big opening mark, no numbers */}
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className={`flex min-h-[19rem] flex-col lg:h-full rounded-2xl border border-[#452B70]/15 bg-card p-6 text-left transition-transform duration-300 hover:-translate-y-0.5 ${SLIDE} ${q.rotate} lg:hover:rotate-0 ${SOFT_SHADOW}`}
          >
            <span
              aria-hidden
              className="select-none font-display text-6xl font-extrabold leading-[0.6] text-[#452B70]/25"
            >
              «
            </span>
            <blockquote className="mt-3 flex-1 text-base italic leading-relaxed text-[#452B70]/90">
              {q.quote}
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold not-italic text-[#452B70]">
              — {q.name}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Dots (mobile strip only) */}
      <div className="mt-1 flex justify-center gap-1 lg:hidden">
        {Array.from({ length: CARD_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Перейти до відгуку ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className="grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70]"
          >
            <span
              className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                i === active ? "w-5 bg-[#452B70]" : "w-2 bg-[#452B70]/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFE8C7] py-24 md:py-32"
    >
      {/* Decorative yellow-dots pattern (same asset as other blocks), behind the
          cards in the bottom-right corner — opaque cards stay readable on top. */}
      <img
        src={dotsAmber}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 z-0 w-[340px] max-w-none opacity-70 md:w-[480px]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
            Відгуки
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
          >
            Ми запитали — батьки відповіли
          </h2>
        </div>

        {/* Rating chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {RATING_CHIPS.map((chip) => (
            <div
              key={chip.big}
              className={`flex items-center gap-3 rounded-2xl border border-[#452B70]/15 bg-card px-5 py-4 ${SOFT_SHADOW}`}
            >
              <span className="flex items-center gap-1 text-3xl font-extrabold leading-none text-[#452B70]">
                {chip.big}
                {chip.star && (
                  <Star className="h-5 w-5 fill-[#452B70] text-[#452B70]" aria-hidden />
                )}
              </span>
              <div className="text-left text-xs leading-snug text-[#452B70]/70">
                <p className="font-semibold text-[#452B70]/90">{chip.title}</p>
                <p>{chip.meta}</p>
              </div>
            </div>
          ))}
        </div>

        <ReviewCards />

        {/* Closing takeaway — the section's key insight */}
        <TakeawayCallout label="Головний висновок" note="Спокійно, впевнено, без хвилювань.">
          Поки дитина в кемпі, батьки найчастіше описують свій стан одним словом —{" "}
          <span className="relative whitespace-nowrap text-white">
            «спокій»
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-[#FFE8C7]/60"
            />
          </span>
        </TakeawayCallout>
      </div>
    </section>
  );
}
