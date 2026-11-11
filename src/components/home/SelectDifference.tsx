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
        <h2 className="text-h2 text-sg-black">A more considered way to live</h2>
        <p className="max-w-prose text-body-lg font-light text-sg-grey-1">
          A Select home is shaped by four principles: a carefully chosen location, generous living space, complete
          vertical-community planning and hospitality-led service where relevant.
        </p>
      </Reveal>

      <Reveal className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
        {principles.map((principle) => (
          <div key={principle.num} className="group relative h-[440px] overflow-hidden desktop:h-[520px]">
            <ImagePlaceholder
              label={principle.title}
              src={principle.image}
              alt={principle.title}
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="absolute inset-0"
            />
            <div className="absolute inset-0" style={{ background: "var(--scrim-card)" }} aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="font-display text-h3 text-white/60">{principle.num}</span>
              <h3 className="mt-2 text-h3 text-white">{principle.title}</h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-600 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 text-body-sm text-white/82">{principle.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
