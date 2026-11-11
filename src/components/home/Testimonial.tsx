"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { testimonials, testimonialsRatingLine } from "@/data/homepage";

const ROTATE_MS = 7000;

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star size={16} className="absolute inset-0 text-sg-grey-3" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={16} className="text-[#F5A623]" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-sg-grey-3 text-[15px] text-sg-black transition-colors duration-180 hover:border-sg-black hover:bg-sg-black hover:text-white";

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    <Section tone="grey" padding="none" className="bg-sg-grey-5 py-18 desktop:py-26">
      <div
        className="flex flex-col items-center text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center gap-3">
          <StarRating value={4.5} />
          <span className="text-body-sm text-sg-grey-1">{testimonialsRatingLine}</span>
        </div>
        <h2 className="mt-6 text-h2 text-sg-black">What Our Customers Say</h2>

        <div className="mt-10 flex w-full items-center gap-6 desktop:gap-12">
          <button type="button" onClick={() => setIndex((i) => (i - 1 + count) % count)} aria-label="Previous testimonial" className={arrowButtonClass}>
            ←
          </button>

          <div className="relative min-h-[180px] flex-1">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-320",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <div className="relative px-10 desktop:px-16">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 font-display text-[60px] leading-none text-sg-grey-3 desktop:text-[90px]"
                  >
                    &ldquo;
                  </span>
                  <p className="w-full min-w-0 max-w-[40ch] font-body text-[22px] leading-[1.3] font-light text-sg-black desktop:text-[36px]">
                    {t.text}
                  </p>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 bottom-0 font-display text-[60px] leading-none text-sg-grey-3 desktop:text-[90px]"
                  >
                    &rdquo;
                  </span>
                </div>
                <p className="mt-4 font-display text-[16px] tracking-[0.06em] text-sg-black uppercase">{t.name}</p>
                <p className="text-body-sm text-sg-grey-2">{t.meta}</p>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => setIndex((i) => (i + 1) % count)} aria-label="Next testimonial" className={arrowButtonClass}>
            →
          </button>
        </div>

        <span className="mt-8 text-[11px] font-bold tracking-[0.2em] text-sg-grey-2 tabular-nums uppercase" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </Section>
  );
}
