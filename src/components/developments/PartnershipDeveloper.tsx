import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

type PartnershipDeveloperProps = {
  partnership?: { title: string; body: string; linkLabel: string; image?: string };
  developerBlurb: string;
};

export function PartnershipDeveloper({ partnership, developerBlurb }: PartnershipDeveloperProps) {
  return (
    <Section tone="white" padding="standard">
      <div className="grid gap-6 desktop:grid-cols-2">
        {partnership ? (
          <div className="flex flex-col border border-sg-grey-5 bg-sg-white">
            <ImagePlaceholder label={partnership.title} src={partnership.image} aspect="16/10" sizes="(min-width: 1200px) 50vw, 100vw" />
            <div className="flex flex-1 flex-col p-8 tablet:p-11">
              <Eyebrow>Partnership</Eyebrow>
              <h3 className="mt-3 text-h3 text-sg-black">{partnership.title}</h3>
              <p className="mt-4 flex-1 text-body text-sg-grey-1">{partnership.body}</p>
              <Link href="/developments" className="mt-6 inline-flex items-center gap-2 text-body-sm font-bold text-sg-cobalt uppercase tracking-chip transition-colors duration-180 hover:text-sg-pacific">
                {partnership.linkLabel} →
              </Link>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col bg-sg-tint-2 p-8 tablet:p-11">
          <Image src="/brand/logo.svg" alt="Select Group" width={120} height={44} className="h-11 w-auto self-start" />
          <Eyebrow className="mt-9">Developer</Eyebrow>
          <h3 className="mt-3 text-h3 text-sg-black">Developed by Select Group</h3>
          <p className="mt-4 text-body text-sg-grey-1">{developerBlurb}</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-body-sm font-bold text-sg-cobalt uppercase tracking-chip transition-colors duration-180 hover:text-sg-pacific">
            Discover Select Group →
          </Link>
        </div>
      </div>
    </Section>
  );
}
