import { PILLARS } from "./data";
import { PhotoSlot } from "./PhotoSlot";
import { Blob } from "./decor/Blob";
import { AccentDot } from "./decor/AccentDot";
import pillarSea from "@/assets/photos/pillar-sea.webp";
import pillarActivities from "@/assets/photos/pillar-activities.webp";
import pillarFun from "@/assets/photos/pillar-fun.webp";
import pillarSea2 from "@/assets/photos/pillar-sea-2.webp";
import pillarActivities2 from "@/assets/photos/pillar-activities-2.webp";
import pillarFun2 from "@/assets/photos/pillar-fun-2.webp";

/**
 * Aligned by index with PILLARS: Море, Активності, Розваги. `second` is a small
 * inset photo (360px square thumbnail) shown top-right of the main photo, tilted
 * like a polaroid; `tilt` is its angle in degrees.
 */
const PILLAR_IMG = [
  {
    src: pillarSea,
    alt: "Подруги біля бірюзової води, позаду водний парк — море в таборі",
    second: { src: pillarSea2, alt: "Троє дітей в помаранчевих жилетах на сап-бордах біля берега" },
    tilt: 5,
  },
  {
    src: pillarActivities,
    alt: "Група з веслами та сапами на пляжі — активності табору",
    second: { src: pillarActivities2, alt: "Підлітки й дорослий грають у міні-гольф на зеленій площадці біля сосен і моря" },
    tilt: -4,
  },
  {
    src: pillarFun,
    alt: "Діти з гігантським м'ячем і вожатим — розваги в таборі",
    second: { src: pillarFun2, alt: "Підлітки з піднятими руками радісно позують на скелястому березі" },
    tilt: 4,
  },
];

const TONE = { sea: "sea", mint: "mint", sun: "sun" } as const;
const BADGE_BG: Record<"sea" | "mint" | "sun", string> = {
  sea: "linear-gradient(160deg, color-mix(in oklab, white 25%, var(--sea)), var(--sea))",
  mint: "linear-gradient(160deg, color-mix(in oklab, white 25%, var(--mint)), var(--mint))",
  sun: "linear-gradient(160deg, color-mix(in oklab, white 25%, var(--sun)), var(--sun))",
};

export function ThreePillars() {
  return (
    <section
      id="program"
      aria-labelledby="pillars-heading"
      className="relative scroll-mt-24 overflow-hidden bg-secondary/40 py-24 md:py-32"
    >
      <Blob className="-top-24 -left-24 h-[380px] w-[380px]" color="var(--mint)" opacity={0.3} />
      <Blob className="-bottom-24 -right-24 h-[420px] w-[420px]" color="var(--sea)" opacity={0.25} />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            <AccentDot color="var(--sea)" size={10} />
            Програма
          </p>
          <h2
            id="pillars-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Три причини, чому звідси не хочеться додому.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <PhotoSlot
                src={PILLAR_IMG[i].src}
                width={720}
                height={540}
                alt={PILLAR_IMG[i].alt}
                tone={TONE[p.accent]}
                aspect="4/3"
                rounded=""
                className="border-0"
              >
                <span
                  className="absolute left-5 top-5 grid h-12 min-w-[3rem] place-items-center rounded-full px-3 text-base font-extrabold text-white"
                  style={{
                    background: BADGE_BG[p.accent],
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.35) inset, 0 10px 22px -10px color-mix(in oklab, var(--primary) 55%, transparent)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={PILLAR_IMG[i].second.src}
                  alt={PILLAR_IMG[i].second.alt}
                  width={360}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="absolute right-3 top-3 aspect-square w-[34%] max-w-[9.5rem] rounded-lg border-[3px] border-white object-cover shadow-lg"
                  style={{ transform: `rotate(${PILLAR_IMG[i].tilt}deg)` }}
                />
              </PhotoSlot>
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