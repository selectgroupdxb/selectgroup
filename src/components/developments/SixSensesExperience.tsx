import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { ExperiencePillar } from "@/data/developmentDetails";

type ExperienceProps = {
  image?: string;
  eyebrow: string;
  title: string;
  body: string;
  pillars: ExperiencePillar[];
};

export function SixSensesExperience({ image, eyebrow, title, body, pillars }: ExperienceProps) {
  return (
    <section className="relative overflow-hidden bg-sg-black">
      <ImagePlaceholder label={title} src={image} sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-sg-black/78" aria-hidden />
      <Section tone="black" padding="standard" className="relative">
        <div className="grid gap-10 desktop:grid-cols-2 desktop:gap-20">
          <div className="border-t border-white/18 desktop:order-1">
            {pillars.map((pillar) => (
              <div key={pillar.num} className="border-b border-white/18 py-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px] font-bold tracking-[0.2em] text-sg-pacific">{pillar.num}</span>
                  <h3 className="text-[18px] tracking-heading text-white uppercase">{pillar.title}</h3>
                </div>
                <p className="mt-2 max-w-[48ch] text-body-sm text-white/78">{pillar.body}</p>
              </div>
            ))}
          </div>
          <div className="desktop:order-2">
            <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-[18ch] text-h2 text-white">{title}</h2>
            <p className="mt-5 max-w-prose text-body text-white/86">{body}</p>
          </div>
        </div>
      </Section>
    </section>
  );
}
