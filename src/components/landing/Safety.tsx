import { HeartPulse, ShieldCheck, Users, Sparkles } from "lucide-react";
import safetyTeam from "@/assets/photos/safety-team-alt.webp";

const ITEMS = [
  { icon: HeartPulse, title: "Лікар 24/7", body: "Кваліфікований медик постійно в кемпі." },
  { icon: ShieldCheck, title: "Страхування", body: "Повне покриття на весь період заїзду." },
  { icon: Users, title: "10 дорослих у команді", body: "Тренована команда, що не лишає дітей без уваги." },
  { icon: Sparkles, title: "Лише 55 місць", body: "Камерність і увага до кожної дитини." },
];

export function Safety() {
  return (
    <section
      aria-labelledby="safety-heading"
      className="scroll-mt-24 bg-primary text-primary-foreground py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
            Безпека
          </p>
          <h2
            id="safety-heading"
            className="mt-3 text-balance text-3xl font-extrabold md:text-5xl"
          >
            Ви передаєте дитину команді, яка знає, що робить.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/80">
            15+ років досвіду, чіткі протоколи і людська увага — у кожному дні
            заїзду.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/15">
          <img
            src={safetyTeam}
            alt="Вожата з бейджем «team» проводить заняття з молодшими дітьми — догляд і присмотр у таборі"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-sm"
            >
              <Icon className="h-7 w-7 text-sun" aria-hidden />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}