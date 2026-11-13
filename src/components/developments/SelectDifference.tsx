import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

const STATS = [
  { value: "24.7M", label: "Sq.ft. developed" },
  { value: "2002", label: "Founded in Dubai" },
  { value: "750+", label: "People across three regions" },
];

/**
 * Fixed company copy shown on every project page — not per-development data.
 * Replaces the earlier per-development "Partnership" cross-sell card, which
 * the newer prototype no longer carries for any project. Image left / text
 * right matches the source's flipA/flipB order for non-Artistry projects.
 */
export function SelectDifference() {
  return (
    <Section tone="white" padding="none" className="py-18 tablet:py-24 desktop:py-28">
      <div className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-18">
        <ImagePlaceholder
          label="Select Group development"
          src="/images/developments/the-select-difference.jpg"
          className="h-[320px] tablet:h-[440px] desktop:h-[600px]"
          sizes="(min-width: 1200px) 50vw, 100vw"
        />
        <div>
          <Eyebrow>The Select Difference</Eyebrow>
          <h2 className="mt-3 max-w-[18ch] text-h2 text-sg-black">Developing Premium Real Estate Since 2002</h2>
          <p className="mt-5 max-w-prose text-body text-sg-grey-1">
            Select Group was founded in Dubai in 2002 and has since delivered a portfolio spanning 24.7 million square feet of residential, commercial, hospitality, retail and mixed-use developments, supported by a team of over 750 people across the Middle East, the United Kingdom and Europe.
          </p>
          <p className="mt-4 max-w-prose text-body text-sg-grey-1">
            Buyers return to the group for the same three reasons: sites chosen for long-term value rather than availability, residences delivered to the specification they were sold on, and partnerships with operators such as Six Senses and Jumeirah that keep a building performing long after handover.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-sg-grey-4 pt-6">
            {STATS.map((stat) => (
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
