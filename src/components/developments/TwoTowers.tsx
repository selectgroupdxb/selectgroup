import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { Tower } from "@/data/developmentDetails";

export function TwoTowers({ intro, towers }: { intro: string; towers: Tower[] }) {
  return (
    <Section tone="white" padding="none" className="py-18 tablet:py-24 desktop:py-28">
      <div className="mx-auto max-w-[720px] text-center">
        <Eyebrow>Two Towers</Eyebrow>
        <h2 className="mt-3 text-h2 text-sg-black">Artistry One And Artistry Two</h2>
        <p className="mt-5 text-body text-sg-grey-1">{intro}</p>
      </div>

      <div className="mt-16 grid gap-12 desktop:grid-cols-2 desktop:gap-12">
        {towers.map((tower) => (
          <div key={tower.name} className="flex flex-col">
            <ImagePlaceholder label={tower.name} src={tower.image} className="h-[320px] tablet:h-[420px] desktop:h-[520px]" sizes="(min-width: 1200px) 50vw, 100vw" />
            <h3 className="mt-8 text-h3 text-sg-black">{tower.name}</h3>
            <div className="mt-6 border-t border-sg-grey-5">
              {tower.facts.map((fact) => (
                <div key={fact.k} className="flex items-start justify-between gap-6 border-b border-sg-grey-5 py-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-sg-grey-2 uppercase">{fact.k}</span>
                  <span className="text-right text-body-sm text-sg-black">{fact.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
