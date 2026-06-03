import { PhotoSlot } from "./PhotoSlot";
import { Blob } from "./decor/Blob";
import { AccentDot } from "./decor/AccentDot";

type Tile = {
  alt: string;
  label: string;
  tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix";
  aspect: string;
  rotate?: string; // tailwind rotate class, motion-safe only
  span?: string; // grid span classes
};

const TILES: Tile[] = [
  { alt: "Ранок на пляжі — діти йдуть до моря", label: "Ранкове море", tone: "sea", aspect: "4/5", rotate: "motion-safe:-rotate-2", span: "row-span-2" },
  { alt: "Спільна гра на піску", label: "Команда", tone: "sun", aspect: "1/1", rotate: "motion-safe:rotate-1" },
  { alt: "Каякінг на Адріатиці", label: "Каякінг", tone: "mint", aspect: "1/1" },
  { alt: "Сміх біля води", label: "Друзі", tone: "sand", aspect: "4/3", rotate: "motion-safe:-rotate-1", span: "col-span-2" },
  { alt: "Вечірня ватра", label: "Ватра", tone: "primary", aspect: "1/1", rotate: "motion-safe:rotate-2" },
  { alt: "Танці на заході сонця", label: "Захід", tone: "sun", aspect: "1/1" },
  { alt: "Сосновий ліс і бунгало", label: "Сосни", tone: "mint", aspect: "4/3", rotate: "motion-safe:-rotate-1", span: "col-span-2" },
  { alt: "Усмішки після квесту", label: "Перемога", tone: "sea", aspect: "1/1", rotate: "motion-safe:rotate-1" },
];

export function MomentsGallery() {
  return (
    <section
      aria-labelledby="moments-heading"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--background), color-mix(in oklab, var(--sea) 7%, var(--background)))",
      }}
    >
      <Blob className="top-10 -left-32 h-[420px] w-[420px]" color="var(--sea)" opacity={0.25} />
      <Blob className="bottom-0 -right-24 h-[360px] w-[360px]" color="var(--sun)" opacity={0.25} />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex max-w-2xl items-center gap-3">
          <AccentDot color="var(--sun)" />
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            Моменти
          </p>
        </div>
        <h2
          id="moments-heading"
          className="mt-4 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
        >
          Літо, яке хочеться пам'ятати.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Невеликий зріз із минулих заїздів — атмосфера, з якої народжується дружба
          на роки.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {TILES.map((t) => (
            <PhotoSlot
              key={t.label}
              alt={t.alt}
              label={t.label}
              tone={t.tone}
              aspect={t.aspect}
              className={`${t.rotate ?? ""} ${t.span ?? ""} shadow-md transition-transform hover:rotate-0`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}