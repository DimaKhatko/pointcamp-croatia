import { SCHEDULE } from "./data";

export function DayInCamp() {
  return (
    <section
      id="day"
      aria-labelledby="day-heading"
      className="scroll-mt-24 bg-secondary/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            День у кемпі
          </p>
          <h2
            id="day-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Від «Good morning» до «Lights out».
          </h2>
        </div>

        <ol className="relative mt-14 border-l-2 border-primary/20 pl-6 md:ml-1/2 md:border-l-0 md:pl-0">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-primary/20 md:block"
          />
          {SCHEDULE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={item.time}
                className={`relative mb-8 md:mb-12 md:grid md:grid-cols-2 md:gap-10 ${
                  isLeft ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                {/* timeline dot */}
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-2 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2"
                />
                <div className={`${isLeft ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                  <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {item.time}
                  </div>
                </div>
                <div className={`${isLeft ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}