import { WavePattern } from "./decor/WavePattern";
import { Blob } from "./decor/Blob";
import { Underline } from "./decor/Underline";
import { AccentDot } from "./decor/AccentDot";

export function EmotionalIntro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative scroll-mt-24 overflow-hidden bg-background py-24 md:py-32"
    >
      <WavePattern color="var(--sea)" opacity={0.07} />
      <Blob className="-top-20 -right-20 h-[420px] w-[420px]" color="var(--sun)" opacity={0.3} />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/70">
          <AccentDot color="var(--mint)" size={10} />
          Quietcation
        </p>
        <h2
          id="intro-heading"
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] text-foreground md:text-6xl"
        >
          Літо без скролінгу. <span className="text-primary"><Underline color="mint">Справжні друзі.</Underline></span> Море.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80 md:text-xl">
          <p>
            Уявіть: дитина так захоплена, що майже не пише — бо зайнята морем,
            зйомками фільму, іграми й новими друзями. А ви спокійні: дні такі
            насичені, що на скролінг просто не лишається часу.
          </p>
          <p>
            Таким і має бути справжній кемп: не просто відпочинок біля моря,
            а оригінальний табір, звідки діти повертаються щасливими й трохи
            дорослішими.
          </p>
        </div>
      </div>
    </section>
  );
}