import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { news, newsLeadStory } from "@/data/homepage";

const underline =
  "relative inline-block text-button font-bold tracking-button uppercase text-sg-cobalt after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-320 group-hover:text-sg-pacific group-hover:after:scale-x-100";

export function LatestNews() {
  return (
    <Section tone="white" padding="none" className="pt-16 pb-18 md:pb-24 desktop:pb-32">
      <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow>Newsroom</Eyebrow>
          <h2 className="text-h2 text-sg-black">Latest News</h2>
        </div>
        <Button href="/media" variant="outline">
          View All News
        </Button>
      </div>

      <Reveal>
        <Link href="/insights" className="group grid grid-cols-1 gap-6 md:grid-cols-[460px_1fr] md:items-center md:gap-10">
          <ImagePlaceholder label={newsLeadStory.headline} aspect="4/3" className="transition-transform duration-600 group-hover:scale-[1.04]" />
          <div>
            <p className="text-meta tracking-chip text-sg-grey-2 uppercase">
              {newsLeadStory.outlet} · {newsLeadStory.date}
            </p>
            <h3 className="mt-3 max-w-[28ch] text-h3 text-sg-black">{newsLeadStory.headline}</h3>
            <p className="mt-3 max-w-prose text-body text-sg-grey-1">{newsLeadStory.body}</p>
            <span className={underline}>Read Article</span>
          </div>
        </Link>
      </Reveal>

      <Reveal className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 desktop:mt-16 desktop:grid-cols-4">
        {news.map((card) => (
          <Link key={card.title} href="/insights" className="group flex flex-col gap-4">
            <ImagePlaceholder label={card.title} aspect="15/7" className="transition-transform duration-600 group-hover:scale-[1.04]" />
            <p className="text-meta tracking-chip text-sg-grey-2 uppercase">{card.meta}</p>
            <h4 className="font-body text-[18px] leading-snug font-bold text-sg-black">{card.title}</h4>
            <p className="text-body-sm text-sg-grey-1">{card.excerpt}</p>
            <span className={underline}>Read More</span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
