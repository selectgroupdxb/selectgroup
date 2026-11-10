import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { verticals } from "@/data/homepage";

export function WhatWeDo() {
  return (
    <Section tone="white" padding="standard">
      <Reveal className="grid gap-10 desktop:grid-cols-[0.7fr_3.4fr] desktop:gap-12">
        <div className="flex flex-col items-start gap-5">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="text-h2 text-sg-black">Four Verticals, One Standard</h2>
          <p className="text-body text-sg-grey-1">
            Select Group invests and develops across residential, hospitality, retail and strategic verticals in
            the Middle East, the United Kingdom and Europe, supported by a global team of over 750 people.
          </p>
          <Button href="/about" variant="outline">
            About Select Group
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 desktop:grid-cols-4">
          {verticals.map((vertical) => (
            <Link
              key={vertical.title}
              href={`/investments/${vertical.invPage}`}
              className="group relative block h-[480px] overflow-hidden desktop:h-[620px]"
            >
              <ImagePlaceholder
                label={vertical.title}
                src={vertical.image}
                alt={vertical.title}
                sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 transition-opacity duration-320 group-hover:opacity-90"
                style={{ background: "var(--scrim-card)" }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-h3 text-white">{vertical.title}</h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-420 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 text-body-sm text-white/82 opacity-0 transition-opacity duration-320 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                      {vertical.body}
                    </p>
                    <span className="mt-3 inline-block text-button font-bold tracking-button text-white uppercase opacity-0 transition-opacity duration-320 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
