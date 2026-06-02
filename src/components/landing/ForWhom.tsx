export function ForWhom() {
  return (
    <section
      aria-labelledby="forwhom-heading"
      className="scroll-mt-24 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
          Для кого
        </p>
        <h2
          id="forwhom-heading"
          className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
        >
          Діти та підлітки <span className="text-primary">8–17 років</span> із базовою англійською.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Усі рівні комфорту: тих, хто щойно почав говорити, і тих, хто вже мріє про
          обмін за кордоном. Команда підбирає підхід під кожну дитину.
        </p>
      </div>
    </section>
  );
}