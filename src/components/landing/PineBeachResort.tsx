import { MapPin, Utensils, Trees, Bath } from "lucide-react";
import { PhotoSlot } from "./PhotoSlot";
import { DotGrid } from "./decor/DotGrid";
import { AccentDot } from "./decor/AccentDot";
import pineFeatured from "@/assets/photos/pine-featured-bungalow-sea.webp";
import pine01 from "@/assets/photos/pine-01-bungalow-interior.webp";
import pine03 from "@/assets/photos/pine-03-bungalow-exterior.webp";
import pine05 from "@/assets/photos/pine-05-sanitary.webp";
import pine06 from "@/assets/photos/pine-06-sanitary-kids.webp";
import pine07 from "@/assets/photos/pine-07-food.webp";
import pine09 from "@/assets/photos/pine-09-aerial-bay.webp";

// Warm, brand-tinted soft shadow — shared by photos and fact cards.
const SOFT_SHADOW = "shadow-[0_14px_30px_-16px_rgba(69,43,112,0.45)]";

const FEATURES = [
  { icon: Trees, title: "Затишні бунгало", body: "Прохолодний сосновий ліс просто над морем." },
  { icon: Bath, title: "Сучасний санітарний блок", body: "Поруч із житлом, охайно й комфортно." },
  { icon: Utensils, title: "All-inclusive 4 рази", body: "Середземноморська кухня щодня." },
  { icon: MapPin, title: "Pakoštane, Далмація", body: "Між Адріатикою і озером Врана, 4 нацпарки поруч." },
];

const HERO = {
  src: pineFeatured,
  width: 900,
  height: 1200,
  alt: "Бунгало Pine Beach Pakoštane серед сосон біля Адріатичного моря",
  tone: "mint" as const,
};

// Six diverse, equal-size tiles. Similar shots (two sanitary frames) are spread
// apart; the duplicate buffet/dining pair is reduced to a single food frame.
const TILES: {
  src: string;
  width: number;
  height: number;
  alt: string;
  tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix";
}[] = [
  { src: pine01, width: 400, height: 400, alt: "Інтер'єр бунгало в Pine Beach — спальні місця для учасників табору", tone: "sea" },
  { src: pine05, width: 400, height: 400, alt: "Сучасний санвузол у таборі Pine Beach", tone: "sand" },
  { src: pine03, width: 400, height: 400, alt: "Бунгало серед сосен у кемпі Pine Beach", tone: "primary" },
  { src: pine07, width: 400, height: 400, alt: "Харчування в таборі — страви на шведському столі", tone: "sun" },
  { src: pine06, width: 400, height: 400, alt: "Діти біля сучасного санітарного блоку Pine Beach", tone: "mint" },
  { src: pine09, width: 400, height: 400, alt: "Бухта Pine Beach з висоти — місце проведення табору", tone: "sea" },
];

export function PineBeachResort() {
  return (
    <section
      id="resort"
      aria-labelledby="resort-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFE8C7] py-24 md:py-32"
    >
      <DotGrid color="#452B70" opacity={0.06} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch lg:gap-12">
          {/* Left column — copy + 2×2 facts */}
          <div className="flex flex-col">
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
              Camp розташований у курорті Pine Beach — на самому березі Адріатики,
              у Pakoštane. Між морем і озером Врана, у годині від чотирьох
              національних парків Хорватії.
            </p>

            <dl className="mt-8 grid gap-4 sm:auto-rows-fr sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className={`flex h-full gap-3 rounded-2xl border border-[#452B70]/15 bg-card p-4 ${SOFT_SHADOW}`}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#452B70]" aria-hidden />
                  <div>
                    <dt className="font-semibold text-[#452B70]">{title}</dt>
                    <dd className="mt-0.5 text-sm text-[#452B70]/75">{body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column — vertical hero + even tile grid.
              On md+ the grid fills the left column's height (items-stretch),
              so both columns close on the same line. Tile heights come from
              the grid tracks, keeping every preview the exact same size. */}
          <div
            className="grid grid-cols-2 gap-3 md:h-full md:grid-cols-[1.35fr_1fr_1fr] md:grid-rows-3"
            aria-label="Галерея кемпу Pine Beach"
          >
            <PhotoSlot
              src={HERO.src}
              width={HERO.width}
              height={HERO.height}
              alt={HERO.alt}
              tone={HERO.tone}
              aspect="4/3"
              className={`col-span-2 md:col-span-1 md:row-span-3 md:!aspect-auto md:h-full ${SOFT_SHADOW}`}
            />
            {TILES.map((t) => (
              <PhotoSlot
                key={t.src}
                src={t.src}
                width={t.width}
                height={t.height}
                alt={t.alt}
                tone={t.tone}
                aspect="1/1"
                className={`md:!aspect-auto md:h-full ${SOFT_SHADOW}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
