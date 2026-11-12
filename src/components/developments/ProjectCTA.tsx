import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function ProjectCTA({ title, image }: { title: string; image?: string }) {
  return (
    <Section id="enquire" tone="black" padding="standard" className="relative overflow-hidden" fullBleed>
      <ImagePlaceholder label="CTA background" src={image} sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-sg-black/66" aria-hidden />
      <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-6 px-5 text-center tablet:px-10 desktop:px-16">
        <Eyebrow tone="inverse">Enquire</Eyebrow>
        <h2 className="max-w-[20ch] text-h2 text-white">{title}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="filled">
            Enquire about available residences
          </Button>
          <Button href="/contact" variant="outline-inverse">
            Download the brochure
          </Button>
        </div>
      </div>
    </Section>
  );
}
