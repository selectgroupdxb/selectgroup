"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { awards, type Award, awardsBackgroundImage } from "@/data/homepage";

const HOMEPAGE_AWARDS = awards.slice(0, 5);

export function Awards() {
  const [hovered, setHovered] = useState<Award | null>(null);

  return (
    <Section tone="black" padding="standard" className="relative overflow-hidden" fullBleed>
      <ImagePlaceholder
        label="Awards background"
        src={awardsBackgroundImage}
        alt=""
        sizes="100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-sg-black/88" aria-hidden />
      <div className="relative grid gap-10 px-5 tablet:px-10 desktop:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] desktop:gap-16 desktop:px-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="inverse">Recognition</Eyebrow>
          <h2 className="text-h2 text-white">Industry Awards</h2>
          <p className="max-w-prose text-body-lg font-light text-white/82">Awarded across development, design and delivery.</p>
          <div
            className="mt-4 hidden transition-opacity duration-320 desktop:block"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <ImagePlaceholder
              label={hovered ? `Award photograph — ${hovered.name}` : "Award photograph"}
              src={hovered?.image}
              alt={hovered?.name ?? ""}
              aspect="3/2"
            />
          </div>
        </Reveal>

        <Reveal>
          <ul className="border-t border-white/24">
            {HOMEPAGE_AWARDS.map((award) => {
              const isHovered = hovered?.name === award.name;
              return (
                <li key={award.name} className="border-b border-white/24">
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(award)}
                    onFocus={() => setHovered(award)}
                    onMouseLeave={() => setHovered(null)}
                    onBlur={() => setHovered(null)}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-5 text-left transition-colors duration-180"
                  >
                    <span
                      className={cn(
                        "flex items-baseline gap-2 text-[34px] font-display uppercase [transition:color_180ms,transform_600ms]",
                        isHovered ? "translate-x-5 text-sg-pacific" : "translate-x-0 text-white/90",
                      )}
                    >
                      {award.name}
                      <span className="text-body-sm text-white/44">{award.roman}</span>
                    </span>
                    <span
                      className={cn(
                        "text-body-sm transition-colors duration-180",
                        isHovered ? "text-sg-pacific" : "text-white/60",
                      )}
                    >
                      {award.year}
                    </span>
                    <div
                      className={cn(
                        "col-span-2 grid grid-rows-[1fr] desktop:transition-[grid-template-rows] desktop:duration-600",
                        isHovered ? "desktop:grid-rows-[1fr]" : "desktop:grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-2 text-body-sm text-white/78">{award.body}</p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <Button href="/awards" variant="outline-inverse" className="mt-8">
            See All Awards
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
