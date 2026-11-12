import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

const STATS = [
  { value: "24.7M sq.ft.", label: "Developed" },
  { value: "2002", label: "Founded in Dubai" },
  { value: "750+", label: "People across three regions" },
];

/**
 * Fixed company copy shown on every project page — not per-development data.
 * Replaces the earlier per-development "Partnership" cross-sell card, which
 * the newer prototype no longer carries for any project.
 */
export function SelectDifference() {
  return (
    <Section tone="white" padding="standard">
      <div className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-20">
        <div>
          <Eyebrow>The Select Difference</Eyebrow>
          <h2 className="mt-3 max-w-[18ch] text-h2 text-sg-black">Developing Premium Real Estate Since 2002</h2>
          <p className="mt-5 max-w-prose text-body text-sg-grey-1">
            Founded in 2002 and headquartered in Dubai, Select Group has delivered 24.7 million square feet across the Middle East, the United Kingdom and Europe.
          </p>
          <p className="mt-4 max-w-prose text-body text-sg-grey-1">
            A track record built on quality construction, considered design and a long view of asset performance keeps owners returning to Select Group for their next investment.
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
        <ImagePlaceholder label="Select Group development" aspect="4/5" sizes="(min-width: 1200px) 50vw, 100vw" />
      </div>
    </Section>
  );
}
