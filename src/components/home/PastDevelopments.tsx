"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pastDevelopments, pastDevelopmentsStats } from "@/data/homepage";

export function PastDevelopments() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="border-t border-sg-grey-5 bg-white pt-14 pb-14 tablet:pb-20 desktop:pb-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-5 px-5 tablet:flex-row tablet:items-end tablet:justify-between tablet:px-10 desktop:px-16">
        <div className="flex flex-col gap-3">
          <Eyebrow>Past Developments</Eyebrow>
          <h2 className="text-h2 text-sg-black">Delivered across Dubai since 2007</h2>
          <p className="max-w-prose text-body-lg font-light text-sg-grey-1">
            A portfolio of completed and in-delivery developments spanning Dubai Marina, Business Bay and beyond.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden gap-2 tablet:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="flex h-13 w-13 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll right"
              className="flex h-13 w-13 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
          <Button href="/journey" variant="filled" className="w-full tablet:w-auto">
            View Our Journey
          </Button>
        </div>
      </div>

      <Reveal>
        <div
          ref={scrollerRef}
          className="mt-8 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] tablet:px-10 desktop:px-16"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {pastDevelopments.map((item) => (
            <div
              key={item.name}
              className="group relative h-[320px] w-[240px] shrink-0 overflow-hidden tablet:h-[360px] tablet:w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ImagePlaceholder
                label={`${item.name}, ${item.displayYear}`}
                src={item.image}
                alt={`${item.name}, ${item.displayYear}`}
                sizes="(min-width: 768px) 300px, 240px"
                className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(34,34,34,.88) 0%, rgba(34,34,34,0) 60%)" }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <span className="font-display text-h3 text-white">{item.upcoming ? item.year : item.displayYear}</span>
                <span className="mt-1 text-body-sm font-bold tracking-[0.14em] text-white uppercase">{item.name}</span>
                <span className="mt-1 text-meta text-white/72">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-[var(--page-max)] grid-cols-2 gap-6 border-t border-sg-grey-5 px-5 pt-8 tablet:grid-cols-4 tablet:px-10 desktop:px-16">
        {pastDevelopmentsStats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-display text-h3 text-sg-black">{stat.value}</span>
            <span className="text-body-sm text-sg-grey-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
