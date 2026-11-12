import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import type { Development } from "@/data/homepage";

export function ProjectHero({ development, tagline, body }: { development: Development; tagline: string; body: string }) {
  return (
    <section className="relative flex min-h-[640px] h-[100svh] max-h-[880px] items-end overflow-hidden bg-sg-black">
      <ImagePlaceholder
        label={`${development.name} hero`}
        src={development.image}
        alt={development.name}
        sizes="100vw"
        priority
        className="absolute inset-0"
      />
      <div className="absolute inset-0" style={{ background: "var(--scrim-hero-slide-linear)" }} aria-hidden />
      <div className="relative w-full px-5 pb-14 tablet:px-10 desktop:px-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developments", href: "/developments" }, { label: development.name }]} />
        <div className="mt-4 flex flex-wrap items-baseline gap-4">
          <h1 className="max-w-[24ch] text-h1 text-white uppercase">{development.name}</h1>
          <span className="text-body text-white/60">{development.location}</span>
        </div>
        <p className="mt-3 max-w-[48ch] text-[20px] font-light text-white/90">{tagline}</p>
        <p className="mt-4 max-w-prose text-body-lg font-light text-white/82">{body}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <span className="text-h3 text-white">{development.price}</span>
          <Button href="/contact" variant="filled">
            Enquire
          </Button>
        </div>
      </div>
    </section>
  );
}
