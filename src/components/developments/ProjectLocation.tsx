import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { ProximityPlace } from "@/data/developmentDetails";

type ProjectLocationProps = {
  proximity: ProximityPlace[];
  mapNote: string;
};

export function ProjectLocation({ proximity, mapNote }: ProjectLocationProps) {
  return (
    <Section tone="black" padding="none" className="py-18 tablet:py-24 desktop:py-28">
      <div className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-18">
        <div>
          <Eyebrow tone="inverse">Location &amp; Connectivity</Eyebrow>
          <h2 className="mt-3 max-w-[20ch] text-h2 text-white">Proximity To Key Areas</h2>
          {proximity.length > 0 ? (
            <>
              <div className="mt-7 border-t border-white/18">
                {proximity.map((place) => (
                  <div key={place.place} className="flex items-center justify-between gap-4 border-b border-white/18 py-3.5 text-body-sm text-white/86">
                    <span>{place.place}</span>
                    <span className="flex gap-4 text-white/60">
                      <span>{place.time}</span>
                      <span>{place.dist}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-white/50">Drive times indicative, off-peak.</p>
            </>
          ) : null}
        </div>
        <div className="relative">
          <ImagePlaceholder label="Location map" className="h-[300px] tablet:h-[420px] desktop:h-[560px]" sizes="(min-width: 1200px) 50vw, 100vw" />
          <p className="mt-3 text-body-sm text-white/50">{mapNote}</p>
        </div>
      </div>
    </Section>
  );
}
