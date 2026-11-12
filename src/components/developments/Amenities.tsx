import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { AmenityItem } from "@/data/developmentDetails";

export function Amenities({ title, body, items }: { title: string; body: string; items: AmenityItem[] }) {
  return (
    <Section tone="white" padding="standard">
      <div className="grid gap-10 desktop:grid-cols-2 desktop:gap-20">
        <div>
          <Eyebrow>Amenities</Eyebrow>
          <h2 className="mt-3 max-w-[18ch] text-h2 text-sg-black">{title}</h2>
          <p className="mt-5 max-w-prose text-body text-sg-grey-1">{body}</p>
        </div>
        <div className="border-t border-sg-grey-5">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center justify-between gap-6 border-b border-sg-grey-5 py-4">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-[0.2em] text-sg-grey-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body text-sg-black">{item.label}</span>
              </div>
              <span className="shrink-0 text-body-sm text-sg-grey-2">{item.level}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
