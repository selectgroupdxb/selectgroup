"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { developments, heroSlides } from "@/data/homepage";
import { HeroSearch } from "./HeroSearch";

const AUTO_ADVANCE_MS = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onVisibility() {
      setHidden(document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (held || locked || hidden) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [held, locked, hidden]);

  return (
    <section className="relative flex h-[100svh] min-h-[760px] flex-col overflow-hidden bg-sg-black">
      {/* Background layer — image + scrim only, cross-fading per slide. */}
      {heroSlides.map((slide, i) => {
        const isBrand = !slide.name;
        return (
          <div
            key={slide.title}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <ImagePlaceholder
              label={isBrand ? "Hero — Peninsula, brand slide" : `Hero — ${slide.name}`}
              className="absolute inset-0 motion-safe:animate-[sg-slow-zoom_24s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0" style={{ background: "var(--scrim-hero)" }} />
          </div>
        );
      })}

      {/* Foreground layer — text, search and dots share the viewport via flex,
          so tall copy never overlaps the pinned search bar at short heights. */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="relative flex-1">
          {heroSlides.map((slide, i) => {
            const isBrand = !slide.name;
            const matchedDevelopment = developments.find((d) => d.name === slide.name);
            const href = matchedDevelopment ? `/developments/${matchedDevelopment.slug}` : "#developments";
            return (
              <div
                key={slide.title}
                aria-hidden={i !== index}
                className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center transition-opacity duration-1000"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                {isBrand ? (
                  <div className="mb-4 flex items-center gap-4">
                    <span className="h-px w-14 bg-white/70" aria-hidden />
                    <span className="font-display text-[28px] tracking-lockup text-white uppercase">Select Group</span>
                    <span className="h-px w-14 bg-white/70" aria-hidden />
                  </div>
                ) : (
                  <p className="mb-3 text-eyebrow tracking-eyebrow text-white/82 uppercase">{slide.eyebrow}</p>
                )}
                <h1 className="w-full min-w-0 max-w-[24ch] text-h1 text-white">{slide.title}</h1>
                <p className="mt-4 w-full min-w-0 max-w-[60ch] text-body-lg font-light text-white/90">{slide.body}</p>
                <Link
                  href={href}
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-pill border border-white/40 bg-black/18 px-8 text-button font-bold tracking-button text-white uppercase backdrop-blur-md transition-colors duration-180 hover:bg-white hover:text-sg-black"
                >
                  Find Out More
                </Link>
              </div>
            );
          })}
        </div>

        <div className="shrink-0 px-5 pb-8 md:pb-10 desktop:pb-12">
          <HeroSearch onPointerHold={setHeld} onInteract={() => setLocked(true)} />
        </div>

        <div className="flex shrink-0 items-center justify-center gap-2 pb-6 md:pb-9" role="tablist" aria-label="Hero slides">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => { setIndex(i); setLocked(true); }}
              className={`h-1.5 rounded-pill bg-white transition-[width,opacity] duration-600 ${
                i === index ? "w-8 opacity-100" : "w-1.5 opacity-56"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
