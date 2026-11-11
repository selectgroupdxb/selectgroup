"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { brandedCarousel } from "@/data/homepage";

const INITIAL_INDEX = 1;

export function BrandedCarousel() {
  const [index, setIndex] = useState(INITIAL_INDEX);
  const indexRef = useRef(INITIAL_INDEX);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const count = brandedCarousel.length;

  // Tracks the current index synchronously, so rapid repeat clicks each read
  // the latest value instead of the one captured when the button was last
  // rendered (state updates alone lag a render behind during fast clicking).
  function updateIndex(next: number) {
    indexRef.current = next;
    setIndex(next);
  }

  // Start one card in rather than at the very first — the last card's snap
  // point isn't reachable by continuing to scroll from 0, so landing there
  // already shows two residences and avoids the dead end at 03/04.
  useEffect(() => {
    const node = scrollerRef.current;
    const slide = node?.children[INITIAL_INDEX] as HTMLElement | undefined;
    if (node && slide) {
      node.scrollLeft = slide.offsetLeft - 64;
    }
  }, []);

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(next, count - 1));
    updateIndex(clamped);
    const node = scrollerRef.current;
    const slide = node?.children[clamped] as HTMLElement | undefined;
    if (node && slide) {
      // The last card can't always reach a flush-left scroll position (there's
      // no trailing gutter to match the leading one), so clamp the request to
      // what's actually scrollable rather than relying on the browser's own
      // silent clamping, which left `handleScroll`'s closest-card detection
      // resolving to the second-to-last card instead of the last one.
      const maxScroll = node.scrollWidth - node.clientWidth;
      const target = Math.max(0, Math.min(slide.offsetLeft - 64, maxScroll));
      node.scrollTo({ left: target, behavior: "smooth" });
    }
  }

  function handleScroll() {
    const node = scrollerRef.current;
    if (!node) return;
    const maxScroll = node.scrollWidth - node.clientWidth;
    // At either end of the scroll range, pin the index directly rather than
    // trust distance math — the last card frequently can't be scrolled
    // flush-left, so its "closest" comparison needs this explicit floor.
    if (node.scrollLeft >= maxScroll - 2) {
      updateIndex(count - 1);
      return;
    }
    if (node.scrollLeft <= 1) {
      updateIndex(0);
      return;
    }
    const children = Array.from(node.children) as HTMLElement[];
    const center = node.scrollLeft + node.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(childCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    updateIndex(closest);
  }

  return (
    <Section tone="black" padding="none" className="pt-32 pb-26" fullBleed>
      <div className="mb-10 flex flex-col gap-5 px-5 tablet:px-10 tablet:flex-row tablet:items-end tablet:justify-between desktop:px-16">
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
            onClick={() => goTo(indexRef.current - 1)}
            aria-label="Previous"
            className="flex h-13 w-13 items-center justify-center rounded-pill border border-white/40 text-white transition-colors duration-180 hover:bg-white hover:text-sg-black"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => goTo(indexRef.current + 1)}
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
              className="group relative h-[560px] w-[min(1000px,calc(100vw-40px))] shrink-0 snap-start overflow-hidden desktop:h-[580px] desktop:w-[1000px]"
            >
              <ImagePlaceholder
                label={slide.name}
                src={slide.image}
                alt={slide.name}
                sizes="(min-width: 1200px) 1000px, 100vw"
                className="absolute inset-0 transition-transform duration-600 hover:scale-[1.03]"
              />
              <div className="absolute inset-0" style={{ background: "var(--scrim-carousel)" }} aria-hidden />
              <div className="absolute top-14 left-14 flex h-18 items-center">
                {slide.logo ? (
                  <Image
                    src={slide.logo}
                    alt={`${slide.partner} logo`}
                    width={Math.round((slide.partner === "Jumeirah" ? 26 : 64) * (slide.logoAspect ?? 1))}
                    height={slide.partner === "Jumeirah" ? 26 : 64}
                    className={cn(
                      "w-auto object-contain",
                      slide.partner === "Jumeirah" ? "h-[26px]" : "h-16",
                    )}
                    style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,.5))" }}
                  />
                ) : (
                  <span
                    className="text-meta font-bold tracking-chip text-white uppercase"
                    style={{ textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
                  >
                    {slide.partner}
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex max-w-[560px] flex-col items-start p-14">
                <p className="text-eyebrow tracking-eyebrow text-white/82 uppercase">{slide.eyebrow}</p>
                <h3
                  className="mt-3 text-h2 text-white"
                  style={{ textShadow: "0 1px 24px rgba(0,0,0,0.45)" }}
                >
                  {slide.name}
                </h3>
                <p className="mt-3 text-body text-white/82">{slide.body}</p>
                <span className="mt-6 inline-flex h-13 items-center rounded-pill border border-white/60 px-7 text-button font-bold tracking-button text-white uppercase transition-colors duration-180 group-hover:border-white group-hover:bg-white group-hover:text-sg-black">
                  Explore Residence
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col gap-6 px-5 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10 desktop:px-16">
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
