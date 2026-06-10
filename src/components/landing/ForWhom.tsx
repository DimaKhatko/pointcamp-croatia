import { PhotoSlot } from "./PhotoSlot";
import forWhomYoung from "@/assets/photos/spare-young-boy-beach.webp";
import forWhomTeens from "@/assets/photos/spare-evening-group.webp";

export function ForWhom() {
  return (
    <section
      aria-labelledby="forwhom-heading"
      className="scroll-mt-24 bg-[#FFE8C7] py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
          Для кого
        </p>
        <h2
          id="forwhom-heading"
          className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
        >
          Діти та підлітки <span className="underline decoration-[#452B70]/30 decoration-4 underline-offset-4">8–17 років</span> із базовою англійською.
        </h2>
        <p className="mt-5 text-lg text-[#452B70]/80">
          Усі рівні комфорту: тих, хто щойно почав говорити, і тих, хто вже мріє про
          обмін за кордоном. Команда підбирає підхід під кожну дитину.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <PhotoSlot
            src={forWhomYoung}
            width={560}
            height={700}
            alt="Молодший учасник табору на пляжі Адріатики"
            tone="sea"
            aspect="4/3"
            className="shadow-md"
          />
          <PhotoSlot
            src={forWhomTeens}
            width={560}
            height={420}
            alt="Старші підлітки разом на вечірній прогулянці в таборі"
            tone="sun"
            aspect="4/3"
            className="shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
