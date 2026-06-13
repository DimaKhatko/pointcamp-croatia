import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const FORM_ID = "apply";

/**
 * Mobile-only sticky "Залишити заявку" CTA. Rendered once at page level.
 * Appears after the user scrolls ~1 viewport past the hero, and hides while the
 * application form itself is on screen (so the same button never shows twice).
 */
export function StickyApplyButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let scrolledEnough = false;
    let formInView = false;
    const update = () => setShow(scrolledEnough && !formInView);

    const onScroll = () => {
      scrolledEnough = window.scrollY > window.innerHeight * 0.9;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const form = document.getElementById(FORM_ID);
    const observer = new IntersectionObserver(
      ([entry]) => {
        formInView = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    if (form) observer.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-2 pb-[calc(0.75rem_+_env(safe-area-inset-bottom))] transition-all duration-300 md:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <Button
        onClick={scrollToForm}
        size="lg"
        className="h-12 w-full text-base shadow-lg"
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
      >
        🏖️ Залишити заявку
      </Button>
    </div>
  );
}
