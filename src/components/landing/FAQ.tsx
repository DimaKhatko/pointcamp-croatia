import { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FAQS } from "./data";

/**
 * Every answer is always in the HTML (forceMount), closed ones are only collapsed
 * with CSS. Crawlers and AI search read raw HTML and never click, so an accordion
 * that mounts its content on open would hide all the answers from them.
 * Closed answers are `inert`: skipped by screen readers and keyboard focus.
 */
export function FAQ() {
  const [open, setOpen] = useState("");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 bg-secondary/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-balance text-3xl font-extrabold text-foreground md:text-5xl"
          >
            Те, про що питають батьки.
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="mt-12 w-full"
        >
          {FAQS.map((f, i) => {
            const value = `item-${i}`;
            const isOpen = open === value;
            return (
              <AccordionItem
                key={f.q}
                value={value}
                className="border-b border-border last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionPrimitive.Content forceMount>
                  <div
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-4 text-base leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
