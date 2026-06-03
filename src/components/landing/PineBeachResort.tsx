import { MapPin, Utensils, Trees, Bath } from "lucide-react";
import { PhotoSlot } from "./PhotoSlot";
import { DotGrid } from "./decor/DotGrid";
import { AccentDot } from "./decor/AccentDot";

const FEATURES = [
  { icon: Trees, title: "Затишні бунгало", body: "Прохолодний сосновий ліс просто над морем." },
  { icon: Bath, title: "Сучасний санітарний блок", body: "Поруч із житлом, охайно й комфортно." },
  { icon: Utensils, title: "All-inclusive 4 рази", body: "Середземноморська кухня щодня." },
  { icon: MapPin, title: "Pakoštane, Далмація", body: "Між Адріатикою і озером Врана, 4 нацпарки поруч." },
];

const GALLERY: { label: string; alt: string; tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix" }[] = [
  { label: "Бунгало серед сосон", alt: "Бунгало у сосновому лісі Pine Beach", tone: "mint" },
  { label: "Пляж Pine Beach", alt: "Пляж Pine Beach з бірюзовою водою", tone: "sea" },
  { label: "Зона активностей", alt: "Спортивна зона на території кемпу", tone: "sun" },
  { label: "Вечір біля моря", alt: "Захід сонця над Адріатикою", tone: "primary" },
  { label: "Озеро Врана", alt: "Озеро Врана поруч із кемпом", tone: "mint" },
  { label: "Стара Хорватія", alt: "Стародавнє хорватське містечко поруч", tone: "sand" },
  { label: "Сосновий ліс", alt: "Прохолодний сосновий ліс над морем", tone: "mint" },
  { label: "Каякі на березі", alt: "Каякі на пляжі готові до виходу", tone: "sea" },
  { label: "Ранкова зарядка", alt: "Ранкова зарядка біля моря", tone: "sun" },
  { label: "Спільні вечори", alt: "Спільні вечори на території", tone: "primary" },
];

export function PineBeachResort() {
  return (
    <section
      id="resort"
      aria-labelledby="resort-heading"
      className="relative scroll-mt-24 overflow-hidden bg-background py-24 md:py-32"
    >
      <DotGrid color="var(--primary)" opacity={0.06} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/70">
              <AccentDot color="var(--sea)" size={10} />
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

          <div
            className="grid grid-cols-3 gap-3"
            aria-label="Галерея кемпу (фото додаються)"
          >
            {GALLERY.map((g, i) => (
              <PhotoSlot
                key={g.label}
                alt={g.alt}
                label={g.label}
                tone={g.tone}
                aspect={i === 0 ? "4/5" : "1/1"}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}