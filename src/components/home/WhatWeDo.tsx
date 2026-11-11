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

        <div className="grid grid-cols-1 items-center gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
          {verticals.map((vertical) => (
            <Link
              key={vertical.title}
              href={`/investments/${vertical.invPage}`}
              className="group relative block h-[520px] overflow-hidden"
            >
              <ImagePlaceholder
                label={vertical.title}
                src={vertical.image}
                alt={vertical.title}
                sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0" style={{ background: "var(--scrim-tile-base)" }} aria-hidden />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-320 group-hover:opacity-100 group-focus-within:opacity-100"
                style={{ background: "var(--scrim-tile-hover)" }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col pb-7" style={{ paddingLeft: 24, paddingRight: 24 }}>
                <h3
                  className="text-[22px] leading-[1.22] text-white"
                  style={{ textShadow: "0 1px 20px rgba(0,0,0,.5)" }}
                >
                  {vertical.title}
                </h3>
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
