import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectGallery } from "./ProjectGallery";
import type { Development } from "@/data/homepage";
import type { DevelopmentDetail, GalleryItem } from "@/data/developmentDetails";

type ProjectHeroProps = {
  development: Development;
  hero: DevelopmentDetail["hero"];
  gallery: GalleryItem[];
  /** Where "Register Your Interest" points — "#register" only works when an EnquiryForm is on the page. */
  registerHref?: string;
};

export function ProjectHero({ development, hero, gallery, registerHref = "#register" }: ProjectHeroProps) {
  return (
    <>
      <section id="hero" className="relative mt-16 flex h-[min(880px,86svh)] min-h-[420px] items-end overflow-hidden bg-sg-black desktop:mt-22">
        <ImagePlaceholder
          label={`${development.name} hero`}
          src={hero.image}
          alt={development.name}
          sizes="100vw"
          priority
          className="absolute inset-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(34,34,34,.28) 0%, rgba(34,34,34,.14) 40%, rgba(34,34,34,.72) 100%)" }}
          aria-hidden
        />

        <div className="absolute top-9 left-5 tablet:left-10 desktop:left-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developments", href: "/developments" }, { label: development.name }]} />
        </div>

        <div className="absolute top-[140px] right-5 hidden max-w-[460px] border border-white/34 bg-black/42 px-8 py-7 text-right backdrop-blur-md tablet:right-10 tablet:block desktop:right-16">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/78 uppercase">{hero.priceLabel}</p>
          <p className="mt-[18px] text-[40px] leading-none font-display tracking-[0.02em] text-white tablet:text-[48px] desktop:text-[56px]">{hero.price}</p>
          <p className="mt-[18px] border-t border-white/28 pt-4 text-[12px] font-light text-white/70">{hero.priceNote}</p>
        </div>

        <div className="relative w-full px-5 pb-16 tablet:px-10 desktop:px-16">
          {hero.logo ? (
            <Image
              src={hero.logo}
              alt={hero.brandName ?? development.name}
              width={320}
              height={170}
              className="mb-1.5 ml-[-18px] h-[72px] w-auto object-contain tablet:h-[110px] desktop:ml-[-42px] desktop:h-[170px]"
            />
          ) : null}
          {hero.brandName ? (
            <div className="flex items-baseline gap-4">
              <p className="text-[clamp(32px,5vw,48px)] font-display tracking-heading text-white uppercase">{hero.brandName}</p>
              <span className="text-[14px] font-light tracking-[0.3em] text-white/82 uppercase">{hero.brandSub}</span>
            </div>
          ) : !hero.logo ? (
            <p className="max-w-[22ch] text-[clamp(36px,5.5vw,56px)] font-display tracking-heading text-white uppercase">{development.name}</p>
          ) : null}
          <p className="mt-5 max-w-[48ch] text-body-lg font-light text-white/82">{hero.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            {development.status !== "Completed" ? (
              <Button href={registerHref} variant="outline-inverse">
                Register Your Interest
              </Button>
            ) : null}
            {gallery.length > 0 ? <ProjectGallery items={gallery} /> : null}
          </div>
        </div>
      </section>

      <section className="bg-sg-white px-5 pt-14 tablet:px-10 tablet:pt-18 desktop:px-16 desktop:pt-20">
        <div className="grid gap-10 desktop:grid-cols-2 desktop:gap-20">
          <div>
            <Eyebrow>{hero.introEyebrow}</Eyebrow>
            <h1 className="mt-3 max-w-[22ch] text-h1 text-sg-black">{development.name}</h1>
          </div>
          <p className="max-w-prose text-body-lg font-light text-sg-grey-1">{hero.introBody}</p>
        </div>
      </section>
    </>
  );
}
