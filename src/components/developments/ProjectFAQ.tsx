"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { ProjectFAQItem } from "@/data/developmentDetails";

export function ProjectFAQ({ items }: { items: ProjectFAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="white" padding="standard" className="bg-sg-grey-5">
      <div className="flex flex-col gap-10 tablet:flex-row tablet:gap-16">
        <div className="tablet:w-[280px] tablet:shrink-0">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-h2 text-sg-black">Ownership questions</h2>
        </div>
        <div className="flex-1 border-t border-sg-grey-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="border-b border-sg-grey-3">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-body-lg text-sg-black">{item.question}</span>
                  <span
                    aria-hidden
                    className={cn("shrink-0 text-[24px] font-light text-sg-grey-1 transition-transform duration-320", isOpen && "rotate-45")}
                  >
                    +
                  </span>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-420", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="max-w-prose pb-6 whitespace-pre-line text-body text-sg-grey-1">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
