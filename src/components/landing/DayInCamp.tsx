import { Fragment } from "react";
import { SCHEDULE } from "./data";
import { PhotoSlot } from "./PhotoSlot";
import { WavePattern } from "./decor/WavePattern";
import { AccentDot } from "./decor/AccentDot";
import dayMorning from "@/assets/photos/day-morning-sea.webp";
import dayNoon from "@/assets/photos/day-noon-beach.webp";
import dayEvening from "@/assets/photos/day-evening-gathering.webp";

/** Photo bands keyed by the schedule row's time — anchored by row identity, so
 *  they stay at the right moment of day even if rows are added/reordered.
 *  9:00 (after breakfast) → morning · 13:00 (lunch) → noon · 20:00 (evening event) → evening. */
const PHOTO_AFTER: Record<
  string,
  { src: string; width: number; height: number; alt: string; label: string; tone: "sea" | "sun" | "primary" }
> = {
  "9:00": { src: dayMorning, width: 2000, height: 857, alt: "Ранок біля моря в таборі Point Camp, Хорватія", label: "Ранок", tone: "sea" },
  "13:00": { src: dayNoon, width: 2000, height: 857, alt: "Денний відпочинок на пляжі Адріатики в таборі", label: "Полудень", tone: "sun" },
  "20:00": { src: dayEvening, width: 2000, height: 857, alt: "Вечірнє зібрання табору біля моря на заході сонця", label: "Вечір", tone: "primary" },
};

export function DayInCamp() {
  return (
    <section
      id="day"
      aria-labelledby="day-heading"
      className="relative scroll-mt-24 overflow-hidden bg-secondary/40 py-24 md:py-32"
    >
      <WavePattern color="var(--primary)" opacity={0.05} />
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            <AccentDot color="var(--mint)" size={10} />
            День у кемпі
          </p>
          <h2
            id="day-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Від «Good morning» до «Lights out».
          </h2>
        </div>

        <ol className="relative mt-14 border-l-2 border-primary/20 pl-6 md:ml-1/2 md:border-l-0 md:pl-0">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-primary/20 md:block"
          />
          {SCHEDULE.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isHighlight = item.time === "22:00";
            const photo = PHOTO_AFTER[item.time];
            return (
              <Fragment key={item.time}>
                {isHighlight ? (
                  /* Key brand moment — compact, centered group on the plate. */
                  <li className="relative mb-8 rounded-2xl bg-[#FFE8C7] px-4 py-5 ring-1 ring-[#452B70]/20 md:mb-12 md:px-6">
                    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
                      <div className="shrink-0 rounded-full bg-[#452B70] px-3 py-1 text-sm font-semibold text-[#FFE8C7]">
                        {item.time}
                      </div>
                      <span
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#452B70] ring-4 ring-[#FFE8C7]"
                      />
                      <div>
                        <span className="mb-2 inline-flex items-center rounded-full bg-[#452B70] px-2.5 py-0.5 text-xs font-semibold text-[#FFE8C7]">
                          Ключовий момент
                        </span>
                        <p className="text-xl font-bold tracking-[-0.02em] text-foreground">{item.title}</p>
                        <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li
                    className={`relative mb-8 md:mb-12 md:grid md:grid-cols-2 md:gap-10 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* timeline dot */}
                    <span
                      aria-hidden
                      className="absolute -left-[31px] top-2 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2"
                    />
                    <div className={`${isLeft ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {item.time}
                      </div>
                    </div>
                    <div className={`${isLeft ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                      <p className="text-xl font-bold tracking-[-0.02em] text-foreground">{item.title}</p>
                      <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                )}
                {photo && (
                  <li
                    aria-hidden={false}
                    className="relative mb-10 md:mb-14"
                  >
                    <PhotoSlot
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      label={photo.label}
                      tone={photo.tone}
                      aspect="21/9"
                      className="shadow-md"
                    />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
}