import { useEffect, useRef, useState } from "react";
import { MapPin, Utensils, Trees, Bath, ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoSlot } from "./PhotoSlot";
import { DotGrid } from "./decor/DotGrid";
import { AccentDot } from "./decor/AccentDot";
import pineFeatured from "@/assets/photos/pine-featured-bungalow-sea.webp";
import pine01 from "@/assets/photos/pine-01-bungalow-interior.webp";
import pine02 from "@/assets/photos/pine-02-bungalow-interior.webp";
import pine03 from "@/assets/photos/pine-03-bungalow-exterior.webp";
import pine04 from "@/assets/photos/pine-04-bungalow-exterior.webp";
import pine05 from "@/assets/photos/pine-05-sanitary.webp";
import pine06 from "@/assets/photos/pine-06-sanitary-kids.webp";
import pine07 from "@/assets/photos/pine-07-food.webp";
import pine08 from "@/assets/photos/pine-08-dining.webp";
import pine09 from "@/assets/photos/pine-09-aerial-bay.webp";
import pineHut from "@/assets/photos/spare-branded-hut.webp";
import pineCourts from "@/assets/photos/spare-aerial-courts.webp";
import traveler from "@/assets/traveler.svg";

// Rich warm "glow + shadow" — purple base + amber glow so photos/cards lift
// off the beige #FFE8C7. Arbitrary box-shadow property (not the `shadow-*`
// utility) to keep all three layers intact. Defined once, reused.
const RICH_SHADOW =
  "[box-shadow:0_2px_6px_rgba(69,43,112,0.10),0_18px_40px_-10px_rgba(180,120,40,0.28),0_30px_60px_-16px_rgba(69,43,112,0.20)]";

// Lighter shadow for the small round arrow buttons.
const ARROW_SHADOW = "shadow-[0_8px_20px_-10px_rgba(69,43,112,0.45)]";

const FEATURES = [
  { icon: Trees, title: "Затишні бунгало", body: "Прохолодний сосновий ліс просто біля моря." },
  { icon: Bath, title: "Душові та санвузли поруч", body: "Сучасні й чисті, за кілька кроків від житла." },
  { icon: Utensils, title: "All-inclusive, 4 рази на день", body: "Середземноморська кухня — смачно й ситно щодня." },
  { icon: MapPin, title: "Піщаний пляж", body: "Рідкість для Адріатики — м'який пісок замість гальки." },
];

// Resort-only imagery, grouped: exterior/sea → interiors → facilities → dining → aerial.
// `imgClass` lets a single photo tune its crop without affecting the others —
// e.g. shift object-position so the important part stays in frame. Keep these
// as full static classes so Tailwind's scanner emits them (nudge the % by eye).
const SLIDES: {
  src: string;
  width: number;
  height: number;
  alt: string;
  tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix";
  imgClass?: string;
}[] = [
  // Native 3:2 (1536×1024) — matches the slide ratio, so default centering is fine.
  { src: pineFeatured, width: 1536, height: 1024, alt: "Бунгало Pine Beach серед сосен біля Адріатичного моря", tone: "mint" },
  { src: pine03, width: 1000, height: 750, alt: "Очеретяне бунгало у золотому світлі серед сосон", tone: "sun" },
  { src: pine04, width: 1000, height: 750, alt: "Зовнішній вигляд бунгало табору Pine Beach у Хорватії", tone: "sand" },
  { src: pineHut, width: 1000, height: 750, alt: "Брендований будиночок Pine Beach серед сосон", tone: "primary" },
  { src: pine01, width: 1000, height: 750, alt: "Інтер'єр бунгало — спальні місця з москітною сіткою", tone: "sea" },
  { src: pine02, width: 1000, height: 750, alt: "Інтер'єр бунгало зі шафами та полицями для речей", tone: "mint" },
  { src: pine05, width: 1000, height: 750, alt: "Сучасний санітарний блок просто неба в Pine Beach", tone: "sand" },
  { src: pine06, width: 1000, height: 750, alt: "Чистий санвузол із кольоровою плиткою, зручний для дітей", tone: "sea" },
  { src: pine07, width: 1000, height: 750, alt: "Шведський стіл — свіжі салати та страви середземноморської кухні", tone: "sun" },
  { src: pine08, width: 1000, height: 750, alt: "Простора їдальня табору під навісом серед дерев", tone: "primary" },
  { src: pineCourts, width: 1000, height: 750, alt: "Вигляд з висоти: спортивні корти й бухта резорту Pine Beach", tone: "sea" },
  { src: pine09, width: 1000, height: 750, alt: "Бухта Pine Beach з висоти — місце проведення табору", tone: "mint" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ResortCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track the slide nearest the viewport centre to drive the dots.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(el.children) as HTMLElement[];
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(slideCenter - center);
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

  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  const step = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const amount = first ? first.offsetWidth + 16 /* gap-4 */ : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior });
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.children[i] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft, behavior });
  };

  return (
    <div className="mt-12">
      <div className="relative">
        {/* Prev / next — desktop only, just outside the band edges */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Попереднє фото"
          className={`absolute top-1/2 -left-3 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#452B70] ring-1 ring-[#452B70]/10 transition hover:bg-[#452B70] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70] md:grid md:-left-5 ${ARROW_SHADOW}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Наступне фото"
          className={`absolute top-1/2 -right-3 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#452B70] ring-1 ring-[#452B70]/10 transition hover:bg-[#452B70] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70] md:grid md:-right-5 ${ARROW_SHADOW}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          aria-label="Галерея кемпу Pine Beach"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((s) => (
            <PhotoSlot
              key={s.src}
              src={s.src}
              width={s.width}
              height={s.height}
              alt={s.alt}
              tone={s.tone}
              aspect="3/2"
              className={`shrink-0 grow-0 basis-[82%] snap-start md:basis-[38%] ${s.imgClass ?? ""}`}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Перейти до фото ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFE8C7] ${
              i === active ? "w-6 bg-[#452B70]" : "w-2 bg-[#452B70]/30 hover:bg-[#452B70]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function PineBeachResort() {
  return (
    <section
      id="resort"
      aria-labelledby="resort-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFE8C7] py-24 md:py-32"
    >
      <DotGrid color="#452B70" opacity={0.06} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading — full width, with the traveler decoration in the right gutter */}
        <div className="relative">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
              <AccentDot color="var(--sea)" size={10} />
              Pine Beach Resort
            </p>
            <h2
              id="resort-heading"
              className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
            >
              Сосни. Море. Тиша. Дім на десять днів.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#452B70]/80">
              Живемо в курорті Pine Beach — просто на березі Адріатики,
              у Pakoštane. Повертаємось сюди не перший рік — бо тут справді комфортно.
            </p>
          </div>
          {/* Decorative traveler — bottom-anchored to the heading block (never
              reaches the fact cards), tucked into the right gutter. */}
          <img
            src={traveler}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 hidden h-[160px] w-auto lg:block motion-safe:animate-[pc-float_6s_ease-in-out_infinite_alternate]"
          />
        </div>

        {/* Fact cards — full-width row, equal height */}
        <dl className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className={`flex h-full gap-3 rounded-2xl border border-[#452B70]/15 bg-card p-4 ${RICH_SHADOW}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#452B70]" aria-hidden />
              <div>
                <dt className="font-semibold text-[#452B70]">{title}</dt>
                <dd className="mt-0.5 text-sm text-[#452B70]/75">{body}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Photo carousel */}
        <ResortCarousel />
      </div>
    </section>
  );
}
