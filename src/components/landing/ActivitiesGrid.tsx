import { ACTIVITIES } from "./data";

export function ActivitiesGrid() {
  return (
    <section
      aria-labelledby="activities-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
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
          {ACTIVITIES.map((a, i) => (
            <li
              key={a}
              className={`rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary ${
                i % 5 === 0 ? "sm:col-span-1" : ""
              }`}
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-sun align-middle" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}