"use client";

import { useRef } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pastDevelopments, pastDevelopmentsStats } from "@/data/homepage";

const arrowButtonClass =
  "flex h-13 w-13 items-center justify-center rounded-pill border border-sg-grey-3 text-sg-black transition-colors duration-180 hover:border-sg-black hover:bg-sg-black hover:text-white";

export function PastDevelopments() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="border-t border-sg-grey-5 bg-white pt-14 pb-14 tablet:pb-20 desktop:pb-24">
      <div className="flex flex-col gap-5 px-5 tablet:flex-row tablet:items-end tablet:justify-between tablet:px-10 desktop:px-16">
        <div className="flex flex-col gap-3">
          <Eyebrow>Past Developments</Eyebrow>
          <h2 className="text-h2 text-sg-black">Delivered across Dubai since 2007</h2>
          <p className="max-w-prose text-body-lg font-light text-sg-grey-1">
            Twenty-one developments completed or under delivery, from the first towers in Dubai Marina to the
            Peninsula master waterfront community in Business Bay.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden gap-2 tablet:flex">
            <button type="button" onClick={() => scrollByAmount(-1)} aria-label="Scroll left" className={arrowButtonClass}>
              ←
            </button>
            <button type="button" onClick={() => scrollByAmount(1)} aria-label="Scroll right" className={arrowButtonClass}>
              →
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
          className="mt-14 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] tablet:px-10 desktop:px-16"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {pastDevelopments.map((item) => (
            <Link
              key={item.name}
              href="/journey"
              className="group relative h-[360px] w-[clamp(220px,22vw,300px)] shrink-0 overflow-hidden"
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
                style={{
                  background:
                    "linear-gradient(to top, rgba(34,34,34,.88) 0%, rgba(34,34,34,.6) 26%, rgba(34,34,34,.2) 46%, rgba(34,34,34,0) 60%)",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <span className="font-display text-h3 tracking-[0.04em] text-white">{item.displayYear}</span>
                <span className="mt-1 text-[13px] font-bold tracking-[0.14em] text-white uppercase">{item.name}</span>
                <span className="mt-1 text-[12px] text-white/72">{item.meta}</span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-6 border-t border-sg-grey-5 px-5 pt-9 tablet:grid-cols-4 tablet:px-10 desktop:px-16">
        {pastDevelopmentsStats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-display text-[34px] text-sg-black">{stat.value}</span>
            <span className="text-[13px] text-sg-grey-1">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
