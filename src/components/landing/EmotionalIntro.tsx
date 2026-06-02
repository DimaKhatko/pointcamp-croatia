export function EmotionalIntro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
          Quietcation
        </p>
        <h2
          id="intro-heading"
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] text-foreground md:text-6xl"
        >
          Літо без екранів. <span className="text-primary">Справжні зв'язки.</span> Море.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80 md:text-xl">
          <p>
            Десять днів, у яких дитина не гортає стрічку, а дивиться у вічі другові.
            Купається на світанку. Сміється в колі біля ватри. Знаходить «свою» команду
            на ціле життя.
          </p>
          <p>
            Ми не продаємо «кемп біля моря». Ми створюємо тишу, у якій нарешті чути себе —
            і простір, де дружба не вимагає вайфаю.
          </p>
        </div>
      </div>
    </section>
  );
}