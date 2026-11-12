import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { TwoColBlock as ContentBlockData } from "@/data/developmentDetails";

type ContentBlockProps = {
  block: ContentBlockData;
  tone?: "white" | "tint" | "cobalt";
  /** The brand-blue accent rule under the title — used only on the Introduction block. */
  accent?: boolean;
  cta?: { label: string; href: string };
  headingAs?: "h2" | "h3";
  imageRight?: boolean;
};

const toneClass = {
  white: "bg-sg-white",
  tint: "bg-sg-tint-2",
  cobalt: "bg-sg-cobalt text-white",
};

export function ContentBlock({ block, tone = "white", accent = false, cta, headingAs = "h2", imageRight = false }: ContentBlockProps) {
  const inverse = tone === "cobalt";
  const Heading = headingAs;
  const [lede, ...rest] = block.paragraphs;

  return (
    <Section tone="white" padding="standard" className={cn(toneClass[tone])}>
      <div className={cn("grid items-center gap-10 desktop:grid-cols-2 desktop:gap-20", imageRight && "desktop:[&>*:first-child]:order-1")}>
        <div>
          <Eyebrow tone={inverse ? "inverse" : "muted"}>{block.eyebrow}</Eyebrow>
          <Heading className={cn("mt-3 max-w-[20ch] text-h2", inverse ? "text-white" : "text-sg-black")}>
            {block.title}
          </Heading>
          {accent ? <div className="mt-6 h-px w-16 bg-sg-pacific" aria-hidden /> : null}
          {lede ? (
            <p className={cn("mt-6 max-w-[44ch] text-body-lg font-light", inverse ? "text-white" : "text-sg-black")}>
              {lede}
            </p>
          ) : null}
          {rest.map((p) => (
            <p key={p} className={cn("mt-4 max-w-prose text-body", inverse ? "text-white/86" : "text-sg-grey-1")}>
              {p}
            </p>
          ))}
          {cta ? (
            <Button href={cta.href} variant={inverse ? "filled" : "outline"} className="mt-8">
              {cta.label}
            </Button>
          ) : null}
        </div>
        <ImagePlaceholder
          label={block.title}
          src={block.image}
          alt={block.alt}
          aspect="4/5"
          sizes="(min-width: 1200px) 50vw, 100vw"
        />
      </div>
    </Section>
  );
}
