import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-pointcamp.svg";

const NAV = [
  { href: "#program", label: "Програма" },
  { href: "#day", label: "День" },
  { href: "#resort", label: "Резорт" },
  { href: "#dates", label: "Дати" },
  { href: "#faq", label: "FAQ" },
  { href: "https://japan.pointcamp.com.ua/", label: "Japan'26", external: true },
];

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6 md:py-2.5">
        <a href="#top" className="flex items-center" aria-label="PointCamp — на початок">
          <img src={logo} alt="PointCamp" className="h-14 w-auto" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Розділи сторінки">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="default" className="hidden md:inline-flex">
            <a href="#apply">Залишити заявку</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background/70 backdrop-blur md:hidden"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Мобільне меню">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="#apply" onClick={() => setOpen(false)}>
                Залишити заявку
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}