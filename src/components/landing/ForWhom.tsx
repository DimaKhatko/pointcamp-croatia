import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { PhotoSlot } from "./PhotoSlot";
import { TakeawayCallout } from "./TakeawayCallout";
import dotsAmber from "@/assets/Group-1.svg";
import ropeBridge from "@/assets/photos/activity-rope-bridge.webp";
import mentorTable from "@/assets/photos/team-mentor-table.webp";
import kayakSelfie from "@/assets/photos/act-kayak.webp";

const AGE_BLOCKS = [
  {
    age: "8–11",
    body: "Наймолодші вперше сідають на каяк і сап, ночують без батьків, заводять друзів з інших міст. Для багатьох це перший самостійний досвід — і додому повертаються сміливішими.",
    photo: {
      src: ropeBridge,
      width: 900,
      height: 1200,
      alt: "Дівчинка в шоломі балансує на дерев'яній балці мотузкового парку серед сосен, тримаючись за канати",
    },
    tilt: "-2deg",
    tape: "-3deg",
  },
  {
    age: "12–14",
    body: "Вік пригод і нон-стоп руху. Ігри, командні челенджі, нові захоплення. Тут щиро радіють кожному дню — і знаходять друзів, з якими списуються потім весь рік.",
    photo: {
      src: mentorTable,
      width: 900,
      height: 1200,
      alt: "Двоє хлопців сміються над спільним завданням за столом, а вожата нахилилася до них допомогти",
    },
    tilt: "1.5deg",
    tape: "2deg",
  },
  {
    age: "15–17",
    body: "У цьому віці важливо, щоб тебе сприймали серйозно. Тут підлітки говорять на рівних з дорослими, беруть відповідальність, вчаться вирішувати самі. Це найкраща підготовка до дорослого життя.",
    photo: {
      src: kayakSelfie,
      width: 560,
      height: 560,
      alt: "Компанія підлітків у помаранчевих рятувальних жилетах на спільному каяку, на тлі моря й соснового берега",
    },
    tilt: "-1deg",
    tape: "-2deg",
  },
];

type AgeBlock = (typeof AGE_BLOCKS)[number];

/**
 * White-framed photo with a handwritten age label on the bottom margin and a mint
 * washi-tape strip (CSS only). Statically tilted; from md the tilt eases to 0 and the
 * card lifts on hover (transform only, off for reduced motion).
 */
function Polaroid({ block, labelId }: { block: AgeBlock; labelId?: string }) {
  return (
    <figure
      className="relative mx-auto w-full max-w-[300px] rounded-[3px] bg-white p-3 pb-14 shadow-[0_1px_2px_rgba(69,43,112,0.12),0_18px_34px_-16px_rgba(69,43,112,0.4)] [transform:rotate(var(--tilt))] md:transition-transform md:duration-300 md:ease-out md:motion-safe:hover:[transform:translateY(-8px)_rotate(0deg)]"
      style={{ "--tilt": block.tilt } as CSSProperties}
    >
      <span
        aria-hidden
        className="tape tape-fw left-1/2 -top-3.5 -translate-x-1/2"
        style={{ "--tape-color": "var(--mint)", "--tape-rotate": block.tape } as CSSProperties}
      />
      <PhotoSlot
        src={block.photo.src}
        width={block.photo.width}
        height={block.photo.height}
        alt={block.photo.alt}
        aspect="4/5"
        tone="mint"
        rounded="rounded-[2px]"
      />
      <figcaption
        id={labelId}
        className="absolute inset-x-0 bottom-0 flex h-14 items-center justify-center font-hand text-[2rem] font-bold leading-none text-[#452B70]"
      >
        {block.age}
      </figcaption>
    </figure>
  );
}

const BODY_CLASS = "text-pretty text-base leading-relaxed text-[#452B70]/80 md:text-lg";

/** Below md: age chips above one polaroid + text. All three panels share one grid cell, so the height is the tallest panel and switching never shifts the layout. */
function AgeSwitcher() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus = false) => {
    setSelected(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = AGE_BLOCKS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = selected === last ? 0 : selected + 1;
    else if (event.key === "ArrowLeft") next = selected === 0 ? last : selected - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <div className="md:hidden">
      <div
        role="tablist"
        aria-label="Вікова група"
        onKeyDown={onKeyDown}
        className="flex justify-center gap-2"
      >
        {AGE_BLOCKS.map((block, i) => {
          const active = i === selected;
          return (
            <button
              key={block.age}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`forwhom-tab-${i}`}
              aria-selected={active}
              aria-controls={`forwhom-panel-${i}`}
              tabIndex={active ? 0 : -1}
              onClick={() => select(i)}
              className={`min-h-11 min-w-[5.5rem] rounded-full border px-4 text-base font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452B70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFE8C7] ${
                active
                  ? "border-[#452B70] bg-[#452B70] text-white"
                  : "border-[#452B70]/25 bg-white text-[#452B70]"
              }`}
            >
              {block.age}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid">
        {AGE_BLOCKS.map((block, i) => {
          const active = i === selected;
          return (
            <div
              key={block.age}
              role="tabpanel"
              id={`forwhom-panel-${i}`}
              aria-labelledby={`forwhom-tab-${i}`}
              className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
                active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <Polaroid block={block} />
              <p className={`mx-auto mt-6 max-w-md text-center ${BODY_CLASS}`}>{block.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ForWhom() {
  return (
    <section
      aria-labelledby="forwhom-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFE8C7] py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
            Для кого
          </p>
          <h2
            id="forwhom-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
          >
            Наш кемп для дітей{" "}
            <span className="underline decoration-[#452B70]/30 decoration-4 underline-offset-4">
              8–17 років
            </span>{" "}
            із базовою англійською.
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Decorative yellow-dots pattern (same asset as the «Моменти» section),
              peeking out from behind the first polaroid (kept off the text). */}
          <img
            src={dotsAmber}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-14 z-0 w-[380px] max-w-none opacity-70 md:-left-20"
          />

          {/* md+: three polaroids in a row, each with its text below */}
          <div className="relative z-10 hidden gap-8 md:grid md:grid-cols-3 lg:gap-12">
            {AGE_BLOCKS.map((block, i) => (
              <article key={block.age} aria-labelledby={`forwhom-age-${i}`}>
                <Polaroid block={block} labelId={`forwhom-age-${i}`} />
                <p className={`mt-7 text-center ${BODY_CLASS}`}>{block.body}</p>
              </article>
            ))}
          </div>

          {/* Below md: age switcher (tabs) */}
          <div className="relative z-10">
            <AgeSwitcher />
          </div>
        </div>

        <TakeawayCallout label="Головне" className="mt-14">
          Самостійність, сміливість, уміння домовлятися й друзі на роки — те, що дає фору в дорослому
          житті.
        </TakeawayCallout>
      </div>
    </section>
  );
}
