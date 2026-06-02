import { MapPin, Utensils, Trees, Bath } from "lucide-react";

const FEATURES = [
  { icon: Trees, title: "Затишні бунгало", body: "Прохолодний сосновий ліс просто над морем." },
  { icon: Bath, title: "Сучасний санітарний блок", body: "Поруч із житлом, охайно й комфортно." },
  { icon: Utensils, title: "All-inclusive 4 рази", body: "Середземноморська кухня щодня." },
  { icon: MapPin, title: "Pakoštane, Далмація", body: "Між Адріатикою і озером Врана, 4 нацпарки поруч." },
];

const GALLERY_LABELS = [
  "Бунгало серед сосон",
  "Пляж Pine Beach",
  "Зона активностей",
  "Вечір біля моря",
  "Озеро Врана",
  "Стара Хорватія",
];

export function PineBeachResort() {
  return (
    <section
      id="resort"
      aria-labelledby="resort-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
              Pine Beach Resort
            </p>
            <h2
              id="resort-heading"
              className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
            >
              Сосни. Море. Тиша. Дім на десять днів.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Camp розташований у курорті Pine Beach — на самому березі Адріатики,
              у Pakoštane. Між морем і озером Врана, у годині від чотирьох
              національних парків Хорватії.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold text-foreground">{title}</dt>
                    <dd className="mt-0.5 text-sm text-muted-foreground">{body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-3 gap-3" aria-label="Галерея кемпу (фото додаються)">
            {GALLERY_LABELS.map((label, i) => (
              <div
                key={label}
                className={`relative overflow-hidden rounded-2xl border border-border ${
                  i === 0 ? "col-span-2 row-span-2 aspect-[4/5]" : "aspect-square"
                }`}
                style={{
                  background: `linear-gradient(135deg, color-mix(in oklab, var(--sea) ${
                    35 + i * 8
                  }%, transparent), color-mix(in oklab, var(--sun) ${
                    20 + i * 6
                  }%, transparent))`,
                }}
              >
                <div className="absolute inset-0 grid place-items-end p-3">
                  <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}