import { Star } from "lucide-react";

const reviews = [
  {
    name: "Мама Андрія",
    text: "Хлопці, від нашої родини вам велика подяка) Андрій у дикому захопленні від поїздки) я такого щасливого сина давно не бачила)",
    rotate: "-rotate-2",
  },
  {
    name: "Батьки Кості",
    text: "Добрий вечір! Сьогодні отримали дуже приємний сюрприз у вигляді фото, Костя щасливий, а ми ще раз безмежно вам вдячні за прекрасну та незабутню подорож до Японії ❤️🙏",
    rotate: "rotate-1",
  },
  {
    name: "Мама учасника",
    text: "Добрий день, Дмитро. Дуже дякую за неймовірну подорож до далекої Японії, за новий безцінний досвід, що отримав мій син. Дитина приїхала не тільки з новими враженнями та почуттями, а й з новою мотивацією до життя.",
    rotate: "rotate-2",
  },
];

export function Reviews() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-primary font-semibold tracking-widest text-xs uppercase">
            声 · Голоси учасників
          </div>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl text-ink text-balance">
            Найцінніше — це емоції учасників
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 items-center justify-center lg:justify-start">
          <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-card flex items-center gap-3">
            <div className="font-display font-black text-3xl text-primary flex items-center gap-1.5">
              4,8 <Star className="h-6 w-6 fill-current" aria-hidden />
            </div>
            <div className="text-sm">
              <div className="font-semibold">Google Maps · Point Camp</div>
              <div className="text-ink/60">(17) · Дитячий табір</div>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-card flex items-center gap-3">
            <div className="font-display font-black text-3xl text-primary">98%</div>
            <div className="text-sm">
              <div className="font-semibold">рекомендували · Facebook</div>
              <div className="text-ink/60">Point Camp · 64 відгуки</div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className={`relative polaroid ${r.rotate} hover:rotate-0 transition`}
            >
              <div className="bg-sakura/40 rounded-sm p-5 min-h-[180px] flex items-center">
                <blockquote className="text-ink/90 italic">“{r.text}”</blockquote>
              </div>
              <figcaption className="text-center mt-3 font-display text-sm text-ink">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
