import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { ContentBlock, AmenityLevel } from "@/data/developmentDetails";

export function WellnessAmenities({ intro, levels }: { intro: ContentBlock; levels: AmenityLevel[] }) {
  return (
    <>
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-sg-black">
        <ImagePlaceholder label={intro.title} src={intro.image} sizes="100vw" className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(20,26,38,.82) 0%, rgba(20,26,38,.5) 50%, rgba(20,26,38,.1) 100%)" }}
          aria-hidden
        />
        <div className="relative max-w-[60ch] px-5 py-18 tablet:px-10 tablet:py-24 desktop:px-16 desktop:py-32">
          <Eyebrow tone="inverse">{intro.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(30px,3.6vw,48px)] font-display tracking-heading text-white uppercase">
            {intro.title}
          </h2>
          {intro.paragraphs.map((p, i) => (
            <p key={p} className={cn("mt-4 text-white", i === 0 ? "text-body-lg" : "text-white/86")}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <Section tone="white" padding="standard">
        <div className="flex flex-col gap-18 tablet:gap-24">
          {levels.map((level) => {
            const imageRight = Boolean(level.imageRight);
            return (
              <div key={level.numeral} className="grid items-center gap-10 desktop:grid-cols-2 desktop:gap-20">
                <div className={cn(imageRight && "desktop:order-2")}>
                  <ImagePlaceholder label={level.label} src={level.image} aspect="5/4" sizes="(min-width: 1200px) 50vw, 100vw" />
                </div>
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-[clamp(56px,6vw,88px)] font-display tracking-[0.02em] text-sg-pacific">
                      {level.numeral}
                    </span>
                    <Eyebrow>{`Level ${level.numeral}`}</Eyebrow>
                  </div>
                  <h3 className="mt-2 text-[clamp(26px,2.8vw,36px)] font-display tracking-heading text-sg-black uppercase">
                    {level.label}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-body text-sg-grey-1">{level.body}</p>
                  <p className="mt-7 text-[10px] font-bold tracking-[0.2em] text-sg-grey-2 uppercase">Highlights</p>
                  <div className="mt-3 grid grid-cols-1 gap-x-6 tablet:grid-cols-2">
                    {level.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-3 border-b border-sg-grey-5 py-3 text-body-sm text-sg-grey-1">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-sg-pacific" aria-hidden />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 flex justify-center">
          <Button href="#plans" variant="outline">
            Explore the amenity plans
          </Button>
        </div>
      </Section>
    </>
  );
}
