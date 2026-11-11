"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
              <Star size={16} className="text-sg-pacific" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

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
    <Section tone="grey" padding="medium">
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

        <div className="mt-10 flex w-full max-w-[760px] items-center gap-4 tablet:gap-8">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <div className="relative min-h-[160px] flex-1">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-320",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <p className="w-full min-w-0 max-w-[40ch] font-body text-[22px] leading-[1.3] font-light text-sg-black tablet:text-[36px]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 text-body-sm font-bold text-sg-black">{t.name}</p>
                <p className="text-body-sm text-sg-grey-2">{t.meta}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % count)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <span className="mt-6 text-body-sm text-sg-grey-2 tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </Section>
  );
}
