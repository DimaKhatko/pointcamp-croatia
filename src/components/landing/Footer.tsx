import { Mail, Phone, MessageCircle, Send, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo-pointcamp.svg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={logo} alt="PointCamp" className="h-11 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Англомовний літній кемп у Хорватії для дітей і підлітків 8–17 років.
              16 років турботи, тепла й справжнього літа.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Контакти
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+380662217373"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden /> +38 066 221 73 73
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pointcamp"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  rel="noopener"
                >
                  <Send className="h-4 w-4" aria-hidden /> Telegram
                </a>
              </li>
              <li>
                <a
                  href="viber://chat?number=%2B380662217373"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> Viber
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@pointcamp.com.ua"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4" aria-hidden /> contact@pointcamp.com.ua
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Соцмережі
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://facebook.com/pointcamp"
                aria-label="Facebook"
                rel="noopener"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/pointcamp"
                aria-label="Instagram"
                rel="noopener"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-foreground">
              Документи
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Публічна оферта
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Обробка персональних даних
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Point Camp. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}