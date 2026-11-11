import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { insights } from "@/data/insights";

const [leadInsight, ...rest] = insights;
const cardInsights = rest.slice(0, 4);

const underlineBase =
  "relative inline-block font-bold tracking-button uppercase text-sg-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-320 group-hover:after:scale-x-100";
const underlineLead = `${underlineBase} text-[12px]`;
const underlineCard = `${underlineBase} text-[11px]`;

export function LatestNews() {
  return (
    <Section tone="white" padding="none" className="pt-16 pb-18 tablet:pb-24 desktop:pb-32">
      <div className="mb-12 flex flex-col gap-5 tablet:flex-row tablet:items-end tablet:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow>Newsroom</Eyebrow>
          <h2 className="text-h2 text-sg-black">Latest News</h2>
        </div>
        <Button href="/insights" variant="outline">
          View All News
        </Button>
      </div>

      <Reveal>
        <Link
          href={`/insights/${leadInsight.slug}`}
          className="group grid grid-cols-1 gap-6 border-b border-sg-grey-4 pb-14 tablet:grid-cols-2 tablet:items-center tablet:gap-14"
        >
          <ImagePlaceholder
            label={leadInsight.title}
            className="h-[300px] transition-transform duration-600 group-hover:scale-[1.04] tablet:h-[460px]"
          />
          <div>
            <p className="text-eyebrow font-bold tracking-eyebrow text-sg-grey-2 uppercase">
              {leadInsight.categoryLabel} · {leadInsight.date}
            </p>
            <h3 className="mt-6 max-w-[22ch] text-[24px] leading-[1.22] tracking-[0.03em] font-normal text-sg-black normal-case">
              {leadInsight.title}
            </h3>
            <p className="mt-6 max-w-[52ch] text-body leading-[1.8] text-sg-grey-1">{leadInsight.excerpt}</p>
            <span className={`mt-8 ${underlineLead}`}>Read Article</span>
          </div>
        </Link>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
        {cardInsights.map((article) => (
          <Link key={article.slug} href={`/insights/${article.slug}`} className="group flex flex-col">
            <ImagePlaceholder
              label={article.title}
              className="h-[200px] transition-transform duration-600 group-hover:scale-[1.04]"
            />
            <p className="mt-5 text-eyebrow font-bold tracking-eyebrow text-sg-grey-2 uppercase">
              {article.categoryLabel} · {article.date}
            </p>
            <h4 className="mt-3 min-h-[76px] text-[18px] leading-[1.4] tracking-[0.03em] font-normal text-sg-black normal-case">
              {article.title}
            </h4>
            <p className="mb-[18px] text-[13px] leading-[1.7] text-sg-grey-2">{article.excerpt}</p>
            <span className={underlineCard}>Read More</span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
