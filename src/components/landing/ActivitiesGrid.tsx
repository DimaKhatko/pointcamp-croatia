import { ACTIVITY_ITEMS } from "./data";
import { PhotoSlot } from "./PhotoSlot";
import { AccentDot } from "./decor/AccentDot";
import actKayak from "@/assets/photos/act-kayak-kids.webp";
import actReflection from "@/assets/photos/act-reflection.webp";
import actArchery from "@/assets/photos/act-archery.webp";
import actPaddleboard from "@/assets/photos/act-paddleboard.webp";
import actually from "@/assets/actually.svg";

/** Photo source per labelled activity (all exported at 560×560). */
const PHOTO_SRC: Record<string, string> = {
  "Каякінг": actKayak,
  "Рефлексія": actReflection,
  "Стрільба з лука": actArchery,
  "Педдлбординг": actPaddleboard,
};

const photoItems = ACTIVITY_ITEMS.filter((item) => item.photo);
const chipItems = ACTIVITY_ITEMS.filter((item) => !item.photo);

export function ActivitiesGrid() {
  return (
    <section
      aria-labelledby="activities-heading"
      className="relative scroll-mt-24 bg-[#FFE8C7] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading — full width, with the "actually" decoration in the right gutter */}
        <div className="relative">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
              <AccentDot color="var(--sun)" size={10} />
              Активності
            </p>
            <h2
              id="activities-heading"
              className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
            >
              Більше, ніж може здатися з першого погляду.
            </h2>
            <p className="mt-4 text-lg text-[#452B70]/80">
              Кожен день — нова грань: спорт, творчість, англійська, дослідження себе.
            </p>
          </div>
          {/* Decorative character — bottom-anchored to the heading block (never
              reaches the activity cards), tucked into the right gutter. */}
          <img
            src={actually}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 hidden h-[350px] w-auto lg:block motion-safe:animate-[pc-float_7s_ease-in-out_infinite_alternate] [animation-delay:-2s]"
          />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photoItems.map((item) => (
            <li key={item.label} className="group">
              <PhotoSlot
                src={PHOTO_SRC[item.label]}
                width={560}
                height={560}
                alt={item.alt ?? `Активність у кемпі: ${item.label}`}
                tone={item.tone ?? "mix"}
                aspect="1/1"
                className="shadow-sm transition-transform group-hover:-translate-y-0.5"
              />
              <p className="mt-2 px-1 text-sm font-medium text-[#452B70]">
                {item.label}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-3">
          {chipItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center rounded-2xl border border-[#452B70]/15 bg-card px-4 py-4 text-sm font-medium text-[#452B70] transition-colors hover:border-[#452B70]/40 hover:bg-[#452B70]/5"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-sun" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}