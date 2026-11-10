import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatBlock } from "@/components/ui/StatBlock";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { statisticsBackgroundImage } from "@/data/homepage";

const STATS = [
  { value: "24.7M", unit: "Sq.Ft.", label: "Properties Developed" },
  { value: "8,701", unit: "Units", label: "Units Handed Over" },
  { value: "35.2B", unit: "AED", label: "Gross Development Value" },
  { value: "20+", unit: "Years", label: "Established in Dubai" },
];

export function Statistics() {
  return (
    <Section tone="black" padding="stats" className="relative overflow-hidden" fullBleed>
      <ImagePlaceholder
        label="Statistics background"
        src={statisticsBackgroundImage}
        alt=""
        sizes="100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0" style={{ background: "var(--scrim-stats)" }} aria-hidden />
      <div className="relative mx-auto max-w-[var(--page-max)] px-5 md:px-10 desktop:px-16">
        <Eyebrow tone="inverse" className="mb-16 text-center">
          Developing Premium Real Estate Since 2002
        </Eyebrow>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 desktop:grid-cols-4 desktop:gap-0 desktop:divide-x desktop:divide-white/28">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
