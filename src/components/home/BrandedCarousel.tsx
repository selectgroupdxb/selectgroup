"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { brandedCarousel } from "@/data/homepage";

export function BrandedCarousel() {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const count = brandedCarousel.length;

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(next, count - 1));
    setIndex(clamped);
    const node = scrollerRef.current;
    const slide = node?.children[clamped] as HTMLElement | undefined;
    if (node && slide) {
      node.scrollTo({ left: slide.offsetLeft - 64, behavior: "smooth" });
    }
  }

  function handleScroll() {
    const node = scrollerRef.current;
    if (!node) return;
    const children = Array.from(node.children) as HTMLElement[];
    const center = node.scrollLeft + 100;
    let closest = 0;
    let closestDistance = Infinity;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setIndex(closest);
  }

  return (
    <Section tone="black" padding="none" className="pt-32 pb-26" fullBleed>
      <div className="mx-auto mb-10 flex max-w-[var(--page-max)] flex-col gap-5 px-5 tablet:px-10 tablet:flex-row tablet:items-end tablet:justify-between desktop:px-16">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inverse">In Partnership With</Eyebrow>
          <h2 className="max-w-[22ch] text-h2 text-white">
            Global hospitality, translated into exceptional homes
          </h2>
          <p className="max-w-prose text-body-lg font-light text-white/82">
            Branded residences developed alongside the world&rsquo;s most respected hospitality names.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous"
            className="flex h-13 w-13 items-center justify-center rounded-pill border border-white/40 text-white transition-colors duration-180 hover:bg-white hover:text-sg-black"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next"
            className="flex h-13 w-13 items-center justify-center rounded-pill border border-white/40 text-white transition-colors duration-180 hover:bg-white hover:text-sg-black"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <Reveal>
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pl-5 [scrollbar-width:none] tablet:pl-10 desktop:pl-16"
        >
          {brandedCarousel.map((slide) => (
            <div
              key={slide.name}
              className="relative h-[560px] w-[min(1000px,calc(100vw-40px))] shrink-0 snap-start overflow-hidden desktop:h-[580px] desktop:w-[1000px]"
            >
              <ImagePlaceholder
                label={slide.name}
                src={slide.image}
                alt={slide.name}
                sizes="(min-width: 1200px) 1000px, 100vw"
                className="absolute inset-0 transition-transform duration-600 hover:scale-[1.03]"
              />
              <div className="absolute inset-0" style={{ background: "var(--scrim-carousel)" }} aria-hidden />
              <div className="absolute top-8 left-8 flex h-18 w-18 items-center justify-center bg-white/90 text-meta font-bold tracking-chip text-sg-black uppercase">
                {slide.partner}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 desktop:max-w-[520px]">
                <p className="text-eyebrow tracking-eyebrow text-white/82 uppercase">{slide.eyebrow}</p>
                <h3 className="mt-3 text-h2 text-white">{slide.name}</h3>
                <p className="mt-3 text-body text-white/82">{slide.body}</p>
                <span className="mt-5 inline-block text-button font-bold tracking-button text-white uppercase">
                  Explore Residence →
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-[var(--page-max)] flex-col gap-6 px-5 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10 desktop:px-16">
        <div className="flex flex-1 items-center gap-4">
          <div className="h-px flex-1 bg-white/24">
            <div
              className="h-px bg-white transition-[width] duration-320"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-body-sm text-white/72 tabular-nums" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <Button href="/investments/hospitality" variant="outline-inverse" className={cn("shrink-0")}>
          Explore Branded Residences
        </Button>
      </div>
    </Section>
  );
}
