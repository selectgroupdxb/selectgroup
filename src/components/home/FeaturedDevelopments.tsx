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

type TabKey = "all" | DevelopmentCategory;

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "offplan", label: "Off Plan" },
  { key: "completed", label: "Completed" },
  { key: "branded", label: "Branded" },
];

const ITEMS_PER_PAGE = 4;

function DevelopmentCard({ item, feature }: { item: Development; feature: boolean }) {
  return (
    <Link
      href={`/developments/${item.slug}`}
      className={cn("group relative block min-h-[360px] overflow-hidden", feature && "md:col-span-2 md:row-span-2")}
    >
      <ImagePlaceholder label={item.name} className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]" />
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
  const [tab, setTab] = useState<TabKey>("all");
  const [page, setPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (tab === "all" ? developments : developments.filter((d) => d.cats.includes(tab))),
    [tab],
  );

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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 md:mt-10">
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Development status">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => { setTab(t.key); setPage(0); }}
              className={cn(
                "min-h-11 shrink-0 rounded-pill px-5 py-2 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
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
        className="mt-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth md:mt-8 [scrollbar-width:none]"
      >
        <div ref={scrollerRef} className="flex w-full">
          {pages.map((pageItems, i) => (
            <div
              key={i}
              className="grid w-full shrink-0 snap-start auto-rows-[360px] grid-cols-1 gap-5 md:grid-cols-2 desktop:grid-cols-4"
            >
              {pageItems.map((item, itemIndex) => (
                <DevelopmentCard key={item.slug} item={item} feature={i === 0 && itemIndex === 0} />
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
