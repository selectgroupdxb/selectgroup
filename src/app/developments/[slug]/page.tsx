import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developments } from "@/data/homepage";
import { developmentDetails } from "@/data/developmentDetails";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ProjectHero } from "@/components/developments/ProjectHero";
import { KeyFacts } from "@/components/developments/KeyFacts";
import { ContentBlock } from "@/components/developments/ContentBlock";
import { Amenities } from "@/components/developments/Amenities";
import { TwoTowers } from "@/components/developments/TwoTowers";
import { SixSensesExperience } from "@/components/developments/SixSensesExperience";
import { Neighbourhood } from "@/components/developments/Neighbourhood";
import { FiveDistricts } from "@/components/developments/FiveDistricts";
import { ProjectLocation } from "@/components/developments/ProjectLocation";
import { SelectDifference } from "@/components/developments/SelectDifference";
import { ConstructionProgress } from "@/components/developments/ConstructionProgress";
import { EnquiryForm } from "@/components/developments/EnquiryForm";
import { ProjectFAQ } from "@/components/developments/ProjectFAQ";
import { ProjectCTA } from "@/components/developments/ProjectCTA";
import { StickyEnquiryBar } from "@/components/developments/StickyEnquiryBar";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

function findDevelopment(slug: string) {
  return developments.find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const development = findDevelopment(slug);
  if (!development) return {};

  const detail = developmentDetails[development.slug];
  const description = detail?.hero.introBody ?? development.blurb;

  return {
    title: development.name,
    description,
    alternates: { canonical: `/developments/${development.slug}` },
    openGraph: { title: development.name, description, images: development.image ? [development.image] : undefined },
  };
}

export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const development = findDevelopment(slug);
  if (!development) notFound();

  const detail = developmentDetails[development.slug];
  const isBranded = development.cats.includes("branded");
  const isHandedOver = development.status === "Completed";

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ label: "Home", href: "/" }, { label: "Developments", href: "/developments" }, { label: development.name }]}
      />

      {detail ? (
        <>
          <ProjectHero development={development} hero={detail.hero} gallery={detail.gallery ?? []} />
          <ContentBlock block={detail.theTower} imageRight={false} noBottomPadding />
          <KeyFacts facts={detail.keyFacts} id="key-facts" />
          {detail.twoTowers ? <TwoTowers intro={detail.twoTowers.intro} towers={detail.twoTowers.towers} /> : null}
          <ContentBlock block={detail.theResidences} imageRight />
          <Amenities title={detail.amenitiesIntro.title} body={detail.amenitiesIntro.body} items={detail.amenities} />
          {isBranded && detail.experience ? (
            <SixSensesExperience
              image={detail.experience.image}
              eyebrow={detail.experience.eyebrow}
              title={detail.experience.title}
              body={detail.experience.body}
              pillars={detail.experience.pillars}
            />
          ) : null}
          <Neighbourhood
            title={detail.neighbourhood.title}
            paragraphs={detail.neighbourhood.paragraphs}
            stats={detail.neighbourhood.stats}
            image={detail.neighbourhood.image}
          />
          {detail.fiveDistricts ? <FiveDistricts districts={detail.fiveDistricts} /> : null}
          {detail.location ? <ProjectLocation proximity={detail.location.proximity} mapNote={detail.location.mapNote} /> : null}
          <SelectDifference />
          {!isHandedOver && detail.constructionProgress ? (
            <ConstructionProgress
              updated={detail.constructionProgress.updated}
              handover={detail.constructionProgress.handover}
              pct={detail.constructionProgress.pct}
              milestones={detail.constructionProgress.milestones}
              quarters={detail.constructionProgress.quarters}
            />
          ) : null}
          <EnquiryForm developmentName={development.name} image={detail.enquireImage} />
          {detail.faq ? <ProjectFAQ items={detail.faq} /> : null}
          <StickyEnquiryBar
            name={development.name}
            heroSub={detail.hero.heroSub}
            priceLabel={detail.hero.priceLabel}
            price={detail.hero.price}
            priceNote={detail.hero.priceNote}
            triggerId="hero"
          />
        </>
      ) : (
        <>
          <ProjectHero
            development={development}
            hero={{
              image: development.image,
              heroSub: `${development.location} · ${development.types}`,
              price: development.price.replace(/^From\s+/i, ""),
              priceLabel: "Starting From",
              priceNote: development.units,
              introEyebrow: development.location,
              introBody: development.blurb,
            }}
            gallery={[]}
          />
          <KeyFacts
            facts={[
              { label: "Location", value: development.location },
              { label: "Types", value: development.types },
              { label: "Units", value: development.units },
              { label: "Handover", value: development.handover },
              { label: "Price", value: development.price },
            ]}
          />
          <ProjectCTA title={`Enquire about ${development.name}`} image={development.image} />
        </>
      )}
    </>
  );
}
