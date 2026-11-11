import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { principles } from "@/data/homepage";

export function SelectDifference() {
  return (
    <Section id="select-difference" tone="white" padding="standard">
      <Reveal className="mb-10 flex flex-col items-start gap-3 tablet:mb-14">
        <Eyebrow>The Select Difference</Eyebrow>
        <h2 className="max-w-[20ch] text-h2 text-sg-black">A more considered way to live</h2>
        <p className="max-w-[70ch] text-body-lg font-light text-sg-grey-1">
          A Select home is shaped by four principles: a carefully chosen location, generous living space, complete
          vertical-community planning and hospitality-led service where relevant.
        </p>
      </Reveal>

      <Reveal className="grid grid-cols-1 items-center gap-5 tablet:grid-cols-2 desktop:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {principles.map((principle) => (
          <div key={principle.num} className="group relative h-[520px] overflow-hidden">
            <ImagePlaceholder
              label={principle.title}
              src={principle.image}
              alt={principle.title}
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
              <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white/92 uppercase">
                {principle.num}
              </span>
              <h3
                className="mt-4 text-[22px] leading-[1.22] text-white"
                style={{ textShadow: "0 1px 20px rgba(0,0,0,.5)" }}
              >
                {principle.title}
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-600 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 text-body-sm text-white/94">{principle.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
