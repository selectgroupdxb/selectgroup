"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  eyebrow?: string;
  title?: string;
  items: FAQItem[];
};

export function FAQAccordion({ eyebrow = "FAQ", title = "Common Questions", items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="grey" padding="standard">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-[800px] border-t border-sg-grey-4 tablet:mt-14">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-sg-grey-4">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[20px] tracking-heading text-sg-black uppercase">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-[14px] text-sg-grey-1 transition-transform duration-320",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-420",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-prose pb-6 text-body text-sg-grey-1">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
