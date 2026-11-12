import { Suspense } from "react";
import type { Metadata } from "next";
import { DevelopmentsHero } from "@/components/developments/DevelopmentsHero";
import { DevelopmentsBrowser } from "@/components/developments/DevelopmentsBrowser";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Developments",
  description:
    "Explore Select Group's portfolio of off plan, completed and branded residential developments across Dubai.",
  alternates: { canonical: "/developments" },
};

const FAQ_ITEMS = [
  {
    question: "What does 'off plan' mean?",
    answer:
      "Off plan developments are sold before or during construction, typically with a staged payment plan through to handover.",
  },
  {
    question: "How do payment plans work?",
    answer:
      "Payment plans vary by development — most split payments between the construction period and handover, shown as a ratio (e.g. 40/60) on each development's page.",
  },
  {
    question: "How do I get in touch about a development?",
    answer: "Use the \"Speak To Our Team\" or \"Request A Callback\" options below, or contact us directly.",
  },
];

export default function DevelopmentsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: "Developments" }]} />
      <DevelopmentsHero />
      <Suspense fallback={null}>
        <DevelopmentsBrowser />
      </Suspense>
      <FAQAccordion items={FAQ_ITEMS} />
      <Section tone="black" padding="standard" className="relative overflow-hidden" fullBleed>
        <ImagePlaceholder label="Contact CTA background" sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-sg-black/82" aria-hidden />
        <div className="relative flex flex-col items-center gap-6 px-5 text-center tablet:px-10 desktop:px-16">
          <Eyebrow tone="inverse">Get In Touch</Eyebrow>
          <h2 className="max-w-[20ch] text-h2 text-white">Find The Right Address</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="filled">
              Speak To Our Team
            </Button>
            <Button href="/contact" variant="outline-inverse">
              Request A Callback
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
