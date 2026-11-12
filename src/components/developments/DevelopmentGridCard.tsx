import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Development } from "@/data/homepage";

/**
 * Uniform dev-index grid card — visually derived from the homepage's
 * FeaturedDevelopments bento card (same image/scrim/caption treatment), but
 * laid out in a plain equal-size grid with a status badge added, and no
 * "Explore Development" CTA pill (dropped for density per the signed-off
 * dev-index screenshot).
 */
export function DevelopmentGridCard({ item }: { item: Development }) {
  return (
    <Link href={`/developments/${item.slug}`} className="group relative block aspect-[6/5] overflow-hidden">
      <ImagePlaceholder
        label={item.name}
        src={item.image}
        alt={item.name}
        sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
        objectPosition={item.imagePosition}
        className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 transition-opacity duration-320 group-hover:opacity-90"
        style={{ background: "var(--scrim-card)" }}
        aria-hidden
      />
      <span className="absolute top-4 left-4 bg-sg-black/78 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase">
        {item.status}
      </span>
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="text-meta tracking-chip text-white/72 uppercase">{item.location}</p>
        <h3 className="mt-1 text-[18px] leading-[1.25] tracking-heading text-white uppercase">{item.name}</h3>
        <div className="mt-2 flex flex-col gap-1 border-t border-white/24 pt-2 text-body-sm">
          <div className="flex justify-between gap-4 text-white/72">
            <span>{item.types}</span>
            <span className="text-white">{item.price}</span>
          </div>
          <div className="flex justify-between gap-4 text-[12px] text-white/60">
            <span>{item.units}</span>
            <span>{item.handover}</span>
          </div>
          {item.paymentPlan ? (
            <div className="flex justify-between gap-4 text-white/72">
              <span>Payment plan</span>
              <span className="font-bold tracking-[0.1em] text-white">{item.paymentPlan}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
