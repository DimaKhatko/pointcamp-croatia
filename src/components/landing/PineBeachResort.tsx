import { MapPin, Utensils, Trees, Bath } from "lucide-react";
import { PhotoSlot } from "./PhotoSlot";
import { DotGrid } from "./decor/DotGrid";
import { AccentDot } from "./decor/AccentDot";
import pineFeatured from "@/assets/photos/pine-featured-bungalow-sea.webp";
import pine01 from "@/assets/photos/pine-01-bungalow-interior.webp";
import pine02 from "@/assets/photos/pine-02-bungalow-interior.webp";
import pine03 from "@/assets/photos/pine-03-bungalow-exterior.webp";
import pine04 from "@/assets/photos/pine-04-bungalow-exterior.webp";
import pine05 from "@/assets/photos/pine-05-sanitary.webp";
import pine06 from "@/assets/photos/pine-06-sanitary-kids.webp";
import pine07 from "@/assets/photos/pine-07-food.webp";
import pine08 from "@/assets/photos/pine-08-dining.webp";
import pine09 from "@/assets/photos/pine-09-aerial-bay.webp";

const FEATURES = [
  { icon: Trees, title: "Затишні бунгало", body: "Прохолодний сосновий ліс просто над морем." },
  { icon: Bath, title: "Сучасний санітарний блок", body: "Поруч із житлом, охайно й комфортно." },
  { icon: Utensils, title: "All-inclusive 4 рази", body: "Середземноморська кухня щодня." },
  { icon: MapPin, title: "Pakoštane, Далмація", body: "Між Адріатикою і озером Врана, 4 нацпарки поруч." },
];

const GALLERY: {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  tone: "sea" | "sun" | "mint" | "sand" | "primary" | "mix";
}[] = [
  { src: pineFeatured, width: 720, height: 900, label: "Бунгало серед сосон", alt: "Бунгало Pine Beach Pakoštane біля Адріатичного моря", tone: "mint" },
  { src: pine01, width: 400, height: 400, label: "Пляж Pine Beach", alt: "Інтер'єр бунгало в Pine Beach — спальні місця для учасників табору", tone: "sea" },
  { src: pine02, width: 400, height: 400, label: "Зона активностей", alt: "Облаштування бунгало в таборі Pine Beach Pakoštane", tone: "sun" },
  { src: pine03, width: 400, height: 400, label: "Вечір біля моря", alt: "Бунгало серед сосен у кемпі Pine Beach", tone: "primary" },
  { src: pine04, width: 400, height: 400, label: "Озеро Врана", alt: "Зовнішній вигляд бунгало табору в Хорватії", tone: "mint" },
  { src: pine05, width: 400, height: 400, label: "Стара Хорватія", alt: "Сучасний санвузол у таборі Pine Beach", tone: "sand" },
  { src: pine06, width: 400, height: 400, label: "Сосновий ліс", alt: "Дитячий санітарний блок у кемпі Pine Beach", tone: "mint" },
  { src: pine07, width: 400, height: 400, label: "Каякі на березі", alt: "Харчування в таборі — страви на шведському столі", tone: "sea" },
  { src: pine08, width: 400, height: 400, label: "Ранкова зарядка", alt: "Їдальня табору Pine Beach Pakoštane", tone: "sun" },
  { src: pine09, width: 400, height: 400, label: "Спільні вечори", alt: "Бухта Pine Beach з висоти — місце проведення табору", tone: "primary" },
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
                src={g.src}
                width={g.width}
                height={g.height}
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