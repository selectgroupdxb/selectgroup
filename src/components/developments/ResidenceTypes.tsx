import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ResidenceType } from "@/data/developmentDetails";

export function ResidenceTypes({ items }: { items: ResidenceType[] }) {
  return (
    <Section tone="white" padding="standard" className="bg-sg-tint-2">
      <SectionHeading
        eyebrow="Residences"
        title="Residence types"
        body="Explore the residence configurations available across the development."
        maxWidthCh={16}
      />
      <div className="mt-10 grid gap-6 tablet:grid-cols-2 desktop:mt-16 desktop:grid-cols-4">
        {items.map((item) => (
          <div key={item.numeral} className="flex flex-col bg-sg-white">
            <div className="relative">
              <ImagePlaceholder label={item.title} src={item.image} aspect="4/5" sizes="(min-width: 1200px) 25vw, 50vw" />
              <span
                className={`absolute top-5 left-5 text-[11px] font-bold tracking-[0.2em] uppercase ${item.image ? "text-white" : "text-sg-grey-2"}`}
              >
                {item.numeral}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-6 py-7">
              <h3 className="text-[19px] tracking-heading text-sg-black uppercase">{item.title}</h3>
              <p className="mt-3 flex-1 text-body-sm text-sg-grey-1">{item.body}</p>
              <Link href="/contact" className="mt-6 border-t border-sg-grey-5 pt-5 text-body-sm font-bold text-sg-cobalt uppercase tracking-chip transition-colors duration-180 hover:text-sg-pacific">
                {item.ctaLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
