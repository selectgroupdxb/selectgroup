import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { NearbyPlace } from "@/data/developmentDetails";

export function ProjectLocation({ body, nearby }: { body: string; nearby: NearbyPlace[] }) {
  return (
    <Section tone="black" padding="standard">
      <div className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-20">
        <div>
          <Eyebrow tone="inverse">Location</Eyebrow>
          <h2 className="mt-3 max-w-[18ch] text-h2 text-white">Where you&rsquo;ll live</h2>
          <p className="mt-5 max-w-prose text-body text-white/86">{body}</p>
          <div className="mt-7 grid grid-cols-1 gap-x-6 border-t border-white/18 tablet:grid-cols-2">
            {nearby.map((place) => (
              <div key={place.name} className="flex items-center justify-between border-b border-white/18 py-3.5 text-body-sm text-white/86">
                <span>{place.name}</span>
                {place.time ? <span className="text-white/60">{place.time}</span> : null}
              </div>
            ))}
          </div>
        </div>
        <ImagePlaceholder label="Location map" aspect="1/1" sizes="(min-width: 1200px) 50vw, 100vw" />
      </div>
    </Section>
  );
}
