import { PhotoSlot } from "./PhotoSlot";
import { Blob } from "./decor/Blob";
import { AccentDot } from "./decor/AccentDot";
import m1 from "@/assets/photos/moments-m1-sunset-girls.webp";
import m2 from "@/assets/photos/moments-m2-sea-joy.webp";
import m3 from "@/assets/photos/moments-m3-mentor-hug.webp";
import m4 from "@/assets/photos/moments-m4-kayak-group.webp";
import m5 from "@/assets/photos/moments-m5-team-huddle.webp";
import m6 from "@/assets/photos/moments-m6-ducks.webp";
import m7 from "@/assets/photos/moments-m7-duck-selfie.webp";
import m8 from "@/assets/photos/moments-m8-dinner-selfie.webp";
import m9 from "@/assets/photos/spare-sup-group.webp";
import roofPurple from "@/assets/Group.svg";
import roofAmber from "@/assets/Group-1.svg";

type Tile = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix";
  aspect: string;
  rotate?: string; // tailwind rotate class, motion-safe only
  span?: string; // grid span classes
};

const TILES: Tile[] = [
  { src: m1, width: 560, height: 700, alt: "Підлітки сміються на заході сонця біля Адріатики — табір Point Camp", label: "Друзі", tone: "sea", aspect: "4/5", rotate: "motion-safe:-rotate-2", span: "row-span-2" },
  { src: m2, width: 560, height: 560, alt: "Діти радіють у бірюзовій воді Адріатики", label: "Команда", tone: "sun", aspect: "1/1", rotate: "motion-safe:rotate-1" },
  { src: m3, width: 560, height: 560, alt: "Вожатий-ментор обіймає підлітка — підтримка в Point Camp", label: "Вайб", tone: "mint", aspect: "1/1" },
  { src: m4, width: 1100, height: 825, alt: "Підлітки на каяках біля берега під драматичним небом Адріатики", label: "Літо", tone: "sand", aspect: "4/3", rotate: "motion-safe:-rotate-1", span: "col-span-2" },
  { src: m5, width: 560, height: 560, alt: "Командна гра підлітків у таборі Point Camp", label: "Пригода", tone: "primary", aspect: "1/1", rotate: "motion-safe:rotate-2" },
  { src: m6, width: 560, height: 560, alt: "Хлопці жартують із табірними каченятами", label: "Свобода", tone: "sun", aspect: "1/1" },
  { src: m7, width: 1100, height: 825, alt: "Селфі друзів із каченям на тлі моря", label: "Море", tone: "mint", aspect: "4/3", rotate: "motion-safe:-rotate-1", span: "col-span-2" },
  { src: m8, width: 560, height: 560, alt: "Друзі роблять спільне селфі за вечерею", label: "Драйв", tone: "sea", aspect: "1/1", rotate: "motion-safe:rotate-1" },
  { src: m9, width: 720, height: 900, alt: "Група учасників із сап-бордами на березі Адріатики", label: "Ми", tone: "sea", aspect: "1/1", rotate: "motion-safe:-rotate-1" },
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
          Щасливі миті, які діти згадують роками.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Кілька кадрів із минулих заїздів — і та сама атмосфера, з якої народжується
          дружба на роки.
        </p>

        <div className="relative mt-12">
          {/* Roof-pattern texture behind the grid — visible only through the
              gaps between the opaque photos (which sit at z-10). */}
          <img
            src={roofPurple}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-10 top-1/3 z-0 w-[440px] max-w-none md:w-[580px] motion-safe:animate-[pc-float_8s_ease-in-out_infinite_alternate] [animation-delay:-1s]"
          />
          <img
            src={roofAmber}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 z-0 w-[420px] max-w-none md:w-[560px] motion-safe:animate-[pc-float_9s_ease-in-out_infinite_alternate] [animation-delay:-3s]"
          />

          <div className="relative z-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {TILES.map((t) => (
              <PhotoSlot
                key={t.label}
                src={t.src}
                width={t.width}
                height={t.height}
                alt={t.alt}
                label={t.label}
                tone={t.tone}
                aspect={t.aspect}
                className={`${t.rotate ?? ""} ${t.span ?? ""} shadow-md transition-transform hover:rotate-0`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}