"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { developments, type Development, type DevelopmentCategory } from "@/data/homepage";

type TabKey = "featured" | "available" | DevelopmentCategory;

const TABS: { key: TabKey; label: string }[] = [
  { key: "featured", label: "Featured Projects" },
  { key: "available", label: "Available" },
  { key: "completed", label: "Completed" },
  { key: "branded", label: "Branded Residences" },
];

const ITEMS_PER_PAGE = 4;

// The signed-off design curates "Available" by hand rather than deriving it
// from the off-plan filter (which would also surface sold-out-but-tagged
// items like Nautica) — matched here by name against `developments`.
const AVAILABLE_NAMES = ["Six Senses Residences Dubai Marina", "Artistry One Residences", "Artistry Two Residences"];

// "Completed" leads with this exact curated set (matching the signed-off
// page 1) before falling back to the rest of the completed-tagged
// developments for subsequent pages.
const COMPLETED_HEAD_NAMES = ["Six Senses Residences The Palm", "Peninsula Four, The Plaza", "The EDGE", "Jumeirah Living Business Bay"];

function byNames(names: string[]) {
  return names
    .map((name) => developments.find((d) => d.name === name))
    .filter((d): d is Development => Boolean(d));
}

/**
 * Bento grid — a fixed 6-column / 2-row cell system lifted directly from the
 * signed-off design file, not a generic "feature + compact tiles" guess.
 * Column/row spans differ by how many items are actually on the page: a
 * 2-item page reads as two equal cards, a 3-item page is now also three equal
 * (tall) cards — same shape as the single-feature card — and a 4-item page
 * keeps the feature-plus-three-compact layout.
 */
function containerClass(total: number) {
  if (total <= 1) return "grid-cols-1 auto-rows-[360px] desktop:auto-rows-[540px]";
  if (total === 2) return "grid-cols-1 tablet:grid-cols-2 auto-rows-[360px] desktop:auto-rows-[540px]";
  if (total === 3) return "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 auto-rows-[360px] desktop:auto-rows-[540px]";
  return "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-6 auto-rows-[360px] desktop:auto-rows-[260px]";
}

function itemClass(index: number, total: number) {
  if (total <= 3) return "";
  // total === 4
  if (index === 0) return "desktop:[grid-column:1/3] desktop:[grid-row:1/3]";
  if (index === 1) return "desktop:[grid-column:3/5] desktop:[grid-row:1/2]";
  if (index === 2) return "desktop:[grid-column:5/7] desktop:[grid-row:1/2]";
  return "desktop:[grid-column:3/7] desktop:[grid-row:2/3]";
}

function DevelopmentCard({ item, index, total }: { item: Development; index: number; total: number }) {
  const isFeature = total === 4 && index === 0;
  return (
    <Link
      href={`/developments/${item.slug}`}
      className={cn("group relative block h-full overflow-hidden", itemClass(index, total))}
    >
      <ImagePlaceholder
        label={item.name}
        src={item.image}
        alt={item.name}
        sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        objectPosition="top"
        className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 transition-opacity duration-320 group-hover:opacity-90"
        style={{ background: "var(--scrim-card)" }}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-320 group-hover:-translate-y-1.5">
        <p className="text-meta tracking-chip text-white/72 uppercase">{item.location}</p>
        <h3 className="mt-1 max-w-[18ch] text-h3 text-white">{item.name}</h3>
        <div className="mt-3 flex flex-col gap-1 border-t border-white/24 pt-3 text-body-sm">
          <div className="flex justify-between gap-4 text-white/72">
            <span>{item.types}</span>
            <span className="text-white">{item.price}</span>
          </div>
          {item.paymentPlan ? (
            <div className="flex justify-between gap-4 text-white/72">
              <span>Payment plan</span>
              <span className="font-bold tracking-[0.1em] text-white">{item.paymentPlan}</span>
            </div>
          ) : null}
        </div>
        <span className="relative mt-5 inline-flex h-10 w-fit items-center overflow-hidden rounded-pill border border-white/56 px-5 text-chip font-bold tracking-chip text-white uppercase">
          <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-320 group-hover:scale-x-100" aria-hidden />
          <span className="relative transition-colors duration-320 group-hover:text-sg-black">Explore Development</span>
        </span>
      </div>
    </Link>
  );
}

export function FeaturedDevelopments() {
  const [tab, setTab] = useState<TabKey>("featured");
  const [page, setPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (tab === "featured") return developments.filter((d) => d.featured);
    if (tab === "available") return byNames(AVAILABLE_NAMES);
    if (tab === "completed") {
      const head = byNames(COMPLETED_HEAD_NAMES);
      const headNames = new Set(head.map((d) => d.name));
      const rest = developments.filter((d) => d.cats.includes("completed") && !headNames.has(d.name));
      return [...head, ...rest];
    }
    return developments.filter((d) => d.cats.includes(tab));
  }, [tab]);

  const pages = useMemo(() => {
    const chunks: Development[][] = [];
    for (let i = 0; i < filtered.length; i += ITEMS_PER_PAGE) {
      chunks.push(filtered.slice(i, i + ITEMS_PER_PAGE));
    }
    return chunks;
  }, [filtered]);

  function goToPage(next: number) {
    const clamped = Math.max(0, Math.min(next, pages.length - 1));
    setPage(clamped);
    const node = scrollerRef.current;
    if (node) node.scrollTo({ left: clamped * node.clientWidth, behavior: "smooth" });
  }

  return (
    <Section id="developments" tone="white" padding="standard">
      <Reveal>
        <SectionHeading
          eyebrow="Developments"
          title="Places to live. Assets to believe in"
          maxWidthCh={20}
          action={
            <Button href="/developments" variant="outline">
              View All Developments
            </Button>
          }
        />
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 tablet:mt-10">
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Development status">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => { setTab(t.key); setPage(0); }}
              className={cn(
                "min-h-11 shrink-0 cursor-pointer rounded-pill px-5 py-2 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
                tab === t.key ? "bg-sg-black text-white" : "border border-sg-grey-4 text-sg-grey-1",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {pages.length > 1 ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="flex h-13 w-13 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black disabled:opacity-32"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === pages.length - 1}
              aria-label="Next page"
              className="flex h-13 w-13 items-center justify-center rounded-pill border border-sg-grey-4 text-sg-black transition-colors duration-180 hover:border-sg-black disabled:opacity-32"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        ) : null}
      </div>

      <Reveal
        as="div"
        className="mt-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth tablet:mt-8 [scrollbar-width:none]"
      >
        <div ref={scrollerRef} className="flex w-full">
          {pages.map((pageItems, i) => (
            <div key={i} className={cn("grid w-full shrink-0 snap-start gap-5", containerClass(pageItems.length))}>
              {pageItems.map((item, itemIndex) => (
                <DevelopmentCard key={item.slug} item={item} index={itemIndex} total={pageItems.length} />
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
