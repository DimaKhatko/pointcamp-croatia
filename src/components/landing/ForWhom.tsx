import dotsAmber from "@/assets/Group-1.svg";

const AGE_BLOCKS = [
  {
    age: "8–11",
    body: "Наймолодші вперше сідають на каяк і сап, ночують без батьків, заводять друзів з інших міст. Для багатьох це перший самостійний досвід — і додому повертаються сміливішими.",
  },
  {
    age: "12–14",
    body: "Вік пригод і нон-стоп руху. Ігри, командні челенджі, нові захоплення. Тут щиро радіють кожному дню — і знаходять друзів, з якими списуються потім весь рік.",
  },
  {
    age: "15–17",
    body: "У цьому віці важливо, щоб тебе сприймали серйозно. Тут підлітки говорять на рівних з дорослими, беруть відповідальність, вчаться вирішувати самі. Це найкраща підготовка до дорослого життя.",
  },
];

export function ForWhom() {
  return (
    <section
      aria-labelledby="forwhom-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFE8C7] py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
            Для кого
          </p>
          <h2
            id="forwhom-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
          >
            Наш кемп для дітей{" "}
            <span className="underline decoration-[#452B70]/30 decoration-4 underline-offset-4">
              8–17 років
            </span>{" "}
            із базовою англійською.
          </h2>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl">
          {/* Decorative yellow-dots pattern (same asset as the «Моменти» section),
              behind the cards — opaque white cards stay fully readable on top. */}
          <img
            src={dotsAmber}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -right-12 z-0 w-[420px] max-w-none opacity-70"
          />
          <div className="relative z-10 space-y-4">
            {AGE_BLOCKS.map(({ age, body }) => (
              <div
                key={age}
                className="flex flex-col gap-2 rounded-2xl border border-[#452B70]/15 bg-card p-5 text-left shadow-[0_14px_32px_-20px_rgba(69,43,112,0.45)] md:flex-row md:items-center md:gap-6 md:p-6"
              >
                <span className="shrink-0 whitespace-nowrap text-3xl font-medium leading-none text-[#452B70] md:w-[104px] md:text-4xl">
                  {age}
                </span>
                <p className="text-base leading-relaxed text-[#452B70]/80 md:text-lg">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-[#452B70]/70 md:text-lg">
          Тому наш кемп працює для кожного віку. Тут діти набувають того, що дає
          фору в дорослому житті: самостійності, сміливості, живої англійської та
          знайомств, що залишаються на роки.
        </p>
      </div>
    </section>
  );
}
