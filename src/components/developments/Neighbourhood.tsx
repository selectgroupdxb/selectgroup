import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { AreaStat } from "@/data/developmentDetails";

type NeighbourhoodProps = {
  title: string;
  paragraphs: string[];
  stats: AreaStat[];
  image?: string;
};

export function Neighbourhood({ title, paragraphs, stats, image }: NeighbourhoodProps) {
  return (
    <Section tone="white" padding="none" className="py-18 tablet:py-24 desktop:py-28">
      <div className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-18">
        <ImagePlaceholder label={title} src={image} className="h-[320px] tablet:h-[440px] desktop:h-[600px]" sizes="(min-width: 1200px) 50vw, 100vw" />
        <div>
          <Eyebrow>The Neighbourhood</Eyebrow>
          <h2 className="mt-3 max-w-[18ch] text-h2 text-sg-black">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? "mt-6 max-w-[48ch] text-body-lg font-light text-sg-black" : "mt-4 max-w-prose text-body text-sg-grey-1"}>
              {p}
            </p>
          ))}
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-sg-grey-4 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-h3 text-sg-black">{stat.value}</p>
                <p className="mt-1 text-body-sm text-sg-grey-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
