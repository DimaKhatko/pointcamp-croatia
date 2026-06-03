import { ACTIVITY_ITEMS } from "./data";
import { PhotoSlot } from "./PhotoSlot";
import { AccentDot } from "./decor/AccentDot";

export function ActivitiesGrid() {
  return (
    <section
      aria-labelledby="activities-heading"
      className="relative scroll-mt-24 py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--background), color-mix(in oklab, var(--sand) 18%, var(--background)))",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            <AccentDot color="var(--sun)" size={10} />
            Активності
          </p>
          <h2
            id="activities-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Більше, ніж може здатися з першого погляду.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Кожен день — нова грань: спорт, творчість, англійська, дослідження себе.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {ACTIVITY_ITEMS.map((item) => {
            if (item.photo) {
              return (
                <li key={item.label} className="group">
                  <PhotoSlot
                    alt={`Активність у кемпі: ${item.label}`}
                    tone={item.tone ?? "mix"}
                    aspect="1/1"
                    className="shadow-sm transition-transform group-hover:-translate-y-0.5"
                  />
                  <p className="mt-2 px-1 text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                </li>
              );
            }
            return (
              <li
                key={item.label}
                className="flex items-center rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-sun" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}