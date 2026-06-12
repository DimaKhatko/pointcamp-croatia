import { Star } from "lucide-react";

/** Rating chips (aggregate scores). */
const RATING_CHIPS = [
  { big: "4,8", star: true, title: "Google Maps · Point Camp", meta: "(17) · Дитячий табір" },
  { big: "98%", title: "рекомендували · Facebook", meta: "Point Camp · 86 відгуків" },
];

/** Research-report cards: a survey question, its headline metric, and a verbatim
 *  parent quote answering that question. Edit freely — order = display order.
 *  `rotate` is the desktop-only polaroid tilt (mobile stays straight & readable). */
const REVIEWS = [
  {
    question: "Чи задоволені Ви нашим табором загалом?",
    percent: "86%",
    label: "повністю задоволені",
    quote: "Стан абсолютного щастя від відпочинку у таборі — дуже сподобалось!",
    name: "Любов",
    rotate: "md:-rotate-2",
  },
  {
    question: "Чи порекомендували б Ви PointCamp друзям?",
    percent: "95%",
    label: "так, порадили б",
    quote: "Дитина повернулася справді відпочинутою і спокійною.",
    name: "Наталія",
    rotate: "md:rotate-1",
  },
  {
    question: "Скільки родин повертаються до нас знову?",
    percent: "85%",
    label: "родини повертаються",
    quote: "Перший раз хвилювалась до поїздки, але вже обидва наступні рази лише чекали з нетерпінням.",
    name: "Юлія",
    rotate: "md:-rotate-1",
  },
];

const SOFT_SHADOW = "shadow-[0_14px_32px_-20px_rgba(69,43,112,0.45)]";

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 bg-[#FFE8C7] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
            Відгуки
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
          >
            Ми запитали — батьки відповіли
          </h2>
        </div>

        {/* Rating chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {RATING_CHIPS.map((chip) => (
            <div
              key={chip.big}
              className={`flex items-center gap-3 rounded-2xl border border-[#452B70]/15 bg-card px-5 py-4 ${SOFT_SHADOW}`}
            >
              <span className="flex items-center gap-1 text-3xl font-extrabold leading-none text-[#452B70]">
                {chip.big}
                {chip.star && (
                  <Star className="h-5 w-5 fill-[#452B70] text-[#452B70]" aria-hidden />
                )}
              </span>
              <div className="text-left text-xs leading-snug text-[#452B70]/70">
                <p className="font-semibold text-[#452B70]/90">{chip.title}</p>
                <p>{chip.meta}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Research-report polaroid cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className={`flex h-full min-h-[19rem] flex-col rounded-2xl border border-[#452B70]/15 bg-card p-6 text-left transition-transform duration-300 hover:-translate-y-0.5 ${r.rotate} md:hover:rotate-0 ${SOFT_SHADOW}`}
            >
              {/* Survey question — the research-report anchor */}
              <p className="text-xs font-medium uppercase tracking-wide text-[#452B70]/60">
                {r.question}
              </p>

              {/* Headline metric */}
              <p className="mt-3 text-5xl font-extrabold leading-none text-[#452B70]">
                {r.percent}
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#452B70]/70">{r.label}</p>

              <hr className="my-5 border-t border-[#452B70]/15" />

              {/* Verbatim parent quote */}
              <blockquote className="flex-1 text-[15px] italic leading-relaxed text-[#452B70]/85">
                «{r.quote}»
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold not-italic text-[#452B70]">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Sample size */}
        <p className="mt-8 text-center text-sm text-[#452B70]/60">
          Опитування родин, які відправляли дітей у 2021–2025 роках
        </p>
      </div>
    </section>
  );
}
