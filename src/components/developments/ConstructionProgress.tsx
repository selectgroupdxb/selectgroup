"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { ConstructionMilestone, ConstructionQuarter } from "@/data/developmentDetails";

const statusColor: Record<ConstructionMilestone["status"], string> = {
  Complete: "text-sg-cobalt",
  "In progress": "text-sg-pacific",
  "Not started": "text-sg-grey-2",
};

type ConstructionProgressProps = {
  updated: string;
  handover: string;
  pct: number;
  milestones: ConstructionMilestone[];
  quarters: ConstructionQuarter[];
};

export function ConstructionProgress({ updated, handover, pct, milestones, quarters }: ConstructionProgressProps) {
  const [activeQuarter, setActiveQuarter] = useState(0);
  const quarter = quarters[activeQuarter];

  return (
    <Section tone="white" padding="none" className="py-18 tablet:py-24 desktop:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Construction Progress</Eyebrow>
          <h2 className="mt-3 text-h2 text-sg-black">Building Six Senses Residences Dubai Marina</h2>
        </div>
        <p className="text-body-sm text-sg-grey-2">Last updated {updated}</p>
      </div>

      <div className="mt-10 grid items-stretch gap-12 desktop:mt-14 desktop:grid-cols-2 desktop:gap-16">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2" role="tablist">
            {quarters.map((q, i) => (
              <button
                key={q.period}
                type="button"
                role="tab"
                aria-selected={activeQuarter === i}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "rounded-pill px-4 py-2 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
                  activeQuarter === i ? "bg-sg-black text-white" : "border border-sg-grey-4 text-sg-black",
                )}
              >
                {q.period}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-1 gap-4 overflow-x-auto [scrollbar-width:none]">
            {quarter.shots.map((shot) => (
              <div key={shot.caption} className="relative aspect-[4/3] h-full shrink-0 overflow-hidden">
                <ImagePlaceholder label={shot.caption} src={shot.image} className="absolute inset-0" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(34,34,34,.78) 0%, rgba(34,34,34,0) 50%)" }}
                  aria-hidden
                />
                <p className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] text-body-sm text-white">{shot.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[clamp(56px,7vw,84px)] font-display leading-none text-sg-black">{pct}</span>
            <span className="text-[32px] font-display text-sg-grey-2">%</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-sg-grey-5">
            <div className="h-full bg-sg-pacific" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-body-sm text-sg-grey-2">
            <span>Groundbreaking</span>
            <span>Handover {handover}</span>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {milestones.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-body-sm text-sg-black">{m.label}</span>
                  <span className={`text-[11px] font-bold tracking-[0.1em] uppercase ${statusColor[m.status]}`}>{m.status}</span>
                </div>
                <div className="mt-2 h-[3px] w-full bg-sg-grey-5">
                  <div className="h-full bg-sg-pacific" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
