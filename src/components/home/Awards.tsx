"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { awards, awardsBackgroundImage } from "@/data/homepage";

const HOMEPAGE_AWARDS = awards.slice(0, 5);

export function Awards() {
  const [hovered, setHovered] = useState(HOMEPAGE_AWARDS[0]);

  return (
    <Section tone="black" padding="standard" className="relative my-16 overflow-hidden" fullBleed>
      <ImagePlaceholder
        label="Awards background"
        src={awardsBackgroundImage}
        alt=""
        sizes="100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-sg-black/88" aria-hidden />
      <div className="relative mx-auto grid max-w-[var(--page-max)] gap-10 px-5 md:px-10 desktop:grid-cols-2 desktop:gap-16 desktop:px-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="inverse">Recognition</Eyebrow>
          <h2 className="text-h2 text-white">Industry Awards</h2>
          <p className="max-w-prose text-body-lg font-light text-white/82">
            Recognised across the region for residential, hospitality and branded-residence development.
          </p>
          <ImagePlaceholder
            label={`Award photograph — ${hovered.name}`}
            src={hovered.image}
            alt={hovered.name}
            aspect="3/2"
            sizes="(min-width: 1200px) 50vw, 100vw"
            className="mt-4 transition-opacity duration-320"
          />
        </Reveal>

        <Reveal>
          <ul className="divide-y divide-white/28 border-y border-white/28">
            {HOMEPAGE_AWARDS.map((award) => (
              <li key={award.name}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(award)}
                  onFocus={() => setHovered(award)}
                  className={cn(
                    "group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-5 text-left transition-colors duration-180",
                  )}
                >
                  <span
                    className={cn(
                      "text-h3 uppercase transition-colors duration-180",
                      hovered.name === award.name ? "text-sg-pacific" : "text-white",
                    )}
                  >
                    {award.name} <sup className="text-body-sm normal-case">{award.roman}</sup>
                  </span>
                  <span className="text-body-sm text-white/60">{award.year}</span>
                  <div
                    className={cn(
                      "col-span-2 grid transition-[grid-template-rows] duration-600",
                      hovered.name === award.name ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-2 text-body-sm text-white/72">{award.body}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <Button href="/awards" variant="outline-inverse" className="mt-8">
            See All Awards
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
