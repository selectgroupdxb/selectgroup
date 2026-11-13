import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function DevelopmentsHero() {
  return (
    <section className="relative flex h-[480px] items-end overflow-hidden bg-sg-black">
      <ImagePlaceholder
        label="Developments hero — Dubai skyline"
        src="/images/developments/hero-developments.jpg"
        alt="Dubai skyline"
        sizes="100vw"
        priority
        className="absolute inset-0"
      />
      <div className="absolute inset-0" style={{ background: "var(--scrim-hero-slide-linear)" }} aria-hidden />
      <div className="relative w-full px-5 pb-12 tablet:px-10 desktop:px-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developments" }]} />
        <h1 className="mt-3 max-w-[20ch] text-[44px] leading-[1.1] text-white uppercase">Off Plan Properties In Dubai</h1>
        <p className="mt-4 max-w-prose text-body-lg font-light text-white/90">
          Explore Select Group&rsquo;s distinguished portfolio of off plan properties across Dubai, from waterfront
          icons and branded developments to thoughtfully designed villas, encompassing some of the city&rsquo;s most
          sought-after locations.
        </p>
      </div>
    </section>
  );
}
