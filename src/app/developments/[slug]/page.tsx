import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developments } from "@/data/homepage";
import { developmentDetails } from "@/data/developmentDetails";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ProjectHero } from "@/components/developments/ProjectHero";
import { KeyFacts } from "@/components/developments/KeyFacts";
import { ContentBlock } from "@/components/developments/ContentBlock";
import { ResidenceTypes } from "@/components/developments/ResidenceTypes";
import { WellnessAmenities } from "@/components/developments/WellnessAmenities";
import { ProjectGallery } from "@/components/developments/ProjectGallery";
import { ProjectLocation } from "@/components/developments/ProjectLocation";
import { PartnershipDeveloper } from "@/components/developments/PartnershipDeveloper";
import { ProjectFAQ } from "@/components/developments/ProjectFAQ";
import { ProjectCTA } from "@/components/developments/ProjectCTA";

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
  const description = detail?.heroBody ?? development.blurb;

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

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ label: "Home", href: "/" }, { label: "Developments", href: "/developments" }, { label: development.name }]}
      />
      <ProjectHero
        development={development}
        tagline={detail?.heroTagline ?? development.blurb}
        body={detail?.heroBody ?? development.blurb}
      />

      {detail ? (
        <>
          <KeyFacts facts={detail.keyFacts} />
          <ContentBlock block={detail.introduction} accent />
          {detail.residenceTypes ? <ResidenceTypes items={detail.residenceTypes} /> : null}
          {detail.wellnessIntro && detail.amenityLevels ? (
            <WellnessAmenities intro={detail.wellnessIntro} levels={detail.amenityLevels} />
          ) : null}
          {detail.design?.map((block, i) => (
            <ContentBlock key={block.title} block={block} tone="tint" headingAs={i === 0 ? "h2" : "h3"} />
          ))}
          {detail.service ? (
            <ContentBlock block={detail.service} tone="cobalt" cta={{ label: "Request the owner services guide", href: "/contact" }} />
          ) : null}
          {detail.gallery ? <ProjectGallery items={detail.gallery} title={`Inside ${development.name}`} /> : null}
          <ProjectLocation body={detail.locationBody} nearby={detail.locationNearby} />
          <PartnershipDeveloper partnership={detail.partnership} developerBlurb={detail.developerBlurb} />
          {detail.faq ? <ProjectFAQ items={detail.faq} /> : null}
          <ProjectCTA title={detail.ctaTitle} image={detail.gallery?.[0]?.image} />
        </>
      ) : (
        <>
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
