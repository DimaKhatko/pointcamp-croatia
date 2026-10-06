import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/submitLead";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Введіть ім'я (мінімум 2 символи)" })
    .max(80, { message: "Ім'я задовге" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Вкажіть e-mail" })
    .email({ message: "Некоректний e-mail" })
    .max(120),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Вкажіть номер телефону" })
    .max(25)
    .regex(/^[+\d\s()\-]+$/, { message: "Лише цифри, +, пробіли і дужки" }),
  participant: z
    .string()
    .trim()
    .min(1, { message: "Будь ласка, заповніть це поле." })
    .max(1000),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "sending" | "sent" | "error";

const TG_CONFIRM_LINK = "https://t.me/PointCampAdmin_Bot?start=6ac4bd10747f188b2b087050";
const TG_CHAT_LINK = "https://t.me/point_camp";

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", participant: "" },
    mode: "onTouched",
  });

  // Values are read from the DOM via FormData; react-hook-form only validates and shows errors.
  const send = async (formData: FormData) => {
    const field = (key: string) => String(formData.get(key) ?? "").trim();
    setStatus("sending");
    const result = await submitLead({
      name: field("name"),
      phone: field("phone"),
      email: field("email"),
      participant: field("participant"),
    });
    if (result.ok) {
      setStatus("sent");
      toast.success("Заявку прийнято!", {
        description: "Зв'яжемося впродовж робочого дня.",
      });
      form.reset();
    } else {
      setStatus("error");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Honeypot: a bot filled the hidden field (named so autofill does not guess it), so pretend success without calling the webhook.
    if (String(formData.get("pc_hp_field") ?? "") !== "") {
      setStatus("sent");
      return;
    }
    void form.handleSubmit(() => send(formData))(event);
  };

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="scroll-mt-24 bg-[#FFE8C7] py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#452B70]/70">
            Заявка
          </p>
          <h2
            id="apply-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-[#452B70] md:text-5xl"
          >
            Забронюйте місце для дитини.
          </h2>
          <p className="mt-4 text-lg text-[#452B70]/80">
            Будь ласка, залиште контактні дані — зв'яжемося з вами впродовж
            робочого дня, щоб відповісти на питання й уточнити деталі.
          </p>
        </div>

        {status === "sent" ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-12 rounded-3xl border border-mint/60 bg-mint/20 p-10 text-center"
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
            <h3 className="mt-5 text-2xl font-bold text-foreground">
              Готово! Заявку отримали.
            </h3>
            <p className="mt-3 text-base text-foreground/80">
              Отримайте підтвердження й деталі бронювання в Telegram.
            </p>
            <Button asChild className="mt-5">
              <a href={TG_CONFIRM_LINK} target="_blank" rel="noopener noreferrer">
                Підтвердити в Telegram
              </a>
            </Button>
            <p className="mt-3 text-base text-foreground/80">
              Зв'яжемося з вами впродовж робочого дня, щоб уточнити деталі.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setStatus("idle")}
            >
              Залишити ще одну заявку
            </Button>
          </div>
        ) : status === "error" ? (
          <div
            role="alert"
            className="mt-12 rounded-3xl border border-destructive/40 bg-card p-10 text-center"
          >
            <h3 className="text-2xl font-bold text-foreground">Не вдалося надіслати заявку</h3>
            <p className="mt-3 text-base text-foreground/80">
              Спробуйте ще раз або напишіть нам у Telegram — відповімо швидко.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <a href={TG_CHAT_LINK} target="_blank" rel="noopener noreferrer">
                  Написати в Telegram
                </a>
              </Button>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Спробувати ще раз
              </Button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            className="mt-12 grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
          >
            {/* Honeypot: visually hidden, not reachable by keyboard; humans never fill it. */}
            <div className="sr-only">
              <input
                type="text"
                id="pc_hp_field"
                name="pc_hp_field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                defaultValue=""
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                id="name"
                label="Ім'я"
                required
                error={form.formState.errors.name?.message}
              >
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Як до Вас звертатись"
                  aria-invalid={!!form.formState.errors.name}
                  {...form.register("name")}
                />
              </Field>
              <Field
                id="phone"
                label="Телефон"
                required
                error={form.formState.errors.phone?.message}
              >
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+380 ..."
                  aria-invalid={!!form.formState.errors.phone}
                  {...form.register("phone")}
                />
              </Field>
            </div>

            <Field
              id="email"
              label="E-mail"
              required
              error={form.formState.errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ilovemykids@gmail.com"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
            </Field>

            <Field
              id="participant"
              label="Інформація про учасника"
              required
              error={form.formState.errors.participant?.message}
            >
              <Textarea
                id="participant"
                rows={4}
                placeholder="Ім'я та вік дитини, рівень англійської, особливі побажання"
                {...form.register("participant")}
              />
            </Field>

            <Button
              type="submit"
              size="lg"
              className="h-12 text-base"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Надсилаємо…" : "🏖️ Забронювати"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Натискаючи кнопку, Ви погоджуєтесь з обробкою персональних даних.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}