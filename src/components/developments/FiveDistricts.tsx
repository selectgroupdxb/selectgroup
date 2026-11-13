"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export type District = { name: string; image?: string };

export function FiveDistricts({ districts }: { districts: District[] }) {
  const [index, setIndex] = useState(0);
  const current = districts[index];
  const total = districts.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  return (
    <Section tone="white" padding="none" className="pb-18 tablet:pb-24 desktop:pb-28">
      <div className="grid gap-10 desktop:grid-cols-2 desktop:items-stretch desktop:gap-18">
        <div className="flex flex-col justify-center">
          <Eyebrow>Dubai Design District</Eyebrow>
          <h2 className="mt-3 text-h2 text-sg-black">Five Districts</h2>
          <div className="mt-8 flex flex-col border-t border-sg-grey-5">
            {districts.map((d, i) => {
              const active = i === index;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  className="flex items-baseline gap-6 border-b border-sg-grey-5 py-5 text-left"
                >
                  <span className={cn("text-[11px] font-bold tracking-[0.18em]", active ? "text-sg-pacific" : "text-sg-grey-3")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-[24px] font-display tracking-heading uppercase transition-colors duration-180", active ? "text-sg-black" : "text-sg-grey-3")}>
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous district"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-sg-black text-sg-black transition-colors duration-180 hover:bg-sg-black hover:text-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next district"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-sg-black text-sg-black transition-colors duration-180 hover:bg-sg-black hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        <div className="relative min-h-[380px] desktop:min-h-[640px]">
          <ImagePlaceholder label={current.name} src={current.image} className="absolute inset-0" sizes="(min-width: 1200px) 50vw, 100vw" />
          <div
            className="absolute inset-x-0 bottom-0 h-[45%]"
            style={{ background: "linear-gradient(to bottom, rgba(34,34,34,0) 0%, rgba(34,34,34,.72) 100%)" }}
            aria-hidden
          />
          <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-6">
            <span className="text-[clamp(28px,4vw,44px)] leading-[1.05] font-display tracking-heading text-white uppercase">{current.name}</span>
            <span className="shrink-0 text-[20px] font-display text-white">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
