import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendToTelegram } from "@/lib/sendToTelegram";

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
  details: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

async function submitApplication(data: FormValues) {
  return sendToTelegram(data);
}

export function ApplicationForm() {
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", details: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await submitApplication(values);
      if (res.ok) {
        // GTM conversion event — fires ONLY on real success.
        // TODO: GTM-side trigger + Google Ads conversion import is configured separately in GTM UI.
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "lead_submit",
            form: "croatia_application",
          });
        }
        setSuccess(true);
        toast.success("Заявку прийнято!", {
          description: "Зв'яжемося впродовж робочого дня.",
        });
        form.reset();
      }
    } catch {
      toast.error("Не вдалося надіслати заявку", {
        description: "Спробуйте ще раз або напишіть нам на contact@pointcamp.com.ua",
      });
    }
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

        {success ? (
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
              Зв'яжемося з вами впродовж робочого дня, щоб уточнити деталі.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSuccess(false)}
            >
              Залишити ще одну заявку
            </Button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-12 grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
          >
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
              id="details"
              label="Інформація про учасника"
              error={form.formState.errors.details?.message}
            >
              <Textarea
                id="details"
                rows={4}
                placeholder="Ім'я та вік дитини, рівень англійської, особливі побажання"
                {...form.register("details")}
              />
            </Field>

            <Button
              type="submit"
              size="lg"
              className="h-12 text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Надсилаємо…" : "🏖️ Залишити заявку"}
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