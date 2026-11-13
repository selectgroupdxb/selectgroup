"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { developments } from "@/data/homepage";
import { DevelopmentGridCard } from "./DevelopmentGridCard";
import { FilterBar, BEDROOM_OPTIONS, type StatusFilter } from "./FilterBar";
import { RecentlyViewed } from "./RecentlyViewed";

// Real completion year per development (from the homepage's Past Developments
// timeline — see pastDevelopments in data/homepage.ts), keyed by slug for a
// reliable match. Used only to order the "Completed" developments newest
// first, after the Off Plan ones; developments without a known year (there
// shouldn't be any — every Completed entry has a real delivery year) sort to
// the end rather than guessing.
const COMPLETION_YEAR: Record<string, number> = {
  "jumeirah-living-business-bay": 2026,
  "peninsula-four-the-plaza": 2026,
  "the-edge": 2026,
  "peninsula-two": 2026,
  "six-senses-residences-the-palm-dubai": 2026,
  "nautica": 2026,
  "peninsula-three": 2025,
  "peninsula-one": 2025,
  "15-northside": 2024,
  "peninsula-five-the-signature-collection": 2024,
  "jumeirah-living-marina-gate": 2020,
  "studio-one": 2019,
  "the-residences-at-marina-gate": 2019,
  "residence-110": 2019,
  "no-9": 2018,
  "mushrif-village": 2018,
  "pacific": 2017,
  "west-avenue": 2014,
  "bay-central": 2012,
  "the-torch": 2011,
  "botanica": 2010,
  "the-royal-oceanic": 2009,
  "the-point": 2008,
  "yacht-bay": 2007,
};

export function DevelopmentsBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "map">("grid");

  // Filters live entirely in the URL (not local state) so results stay
  // shareable/back-button-safe, and so the homepage Hero search's own
  // `?developments=&beds=&max=` query lands here pre-applied with no sync step.
  const status: StatusFilter = useMemo(() => {
    const raw = searchParams.get("status");
    return raw === "offplan" || raw === "completed" || raw === "branded" ? raw : "all";
  }, [searchParams]);

  const bedrooms = useMemo(() => {
    const raw = searchParams.get("beds");
    if (!raw) return [];
    const labels = raw.split(",");
    return labels
      .map((label) => BEDROOM_OPTIONS.find((o) => o.label === label)?.value)
      .filter((v): v is number => v !== undefined);
  }, [searchParams]);

  const searchDevelopmentNames = useMemo(() => {
    const raw = searchParams.get("developments");
    return raw ? raw.split(",") : [];
  }, [searchParams]);

  const searchMax = searchParams.get("max");
  const searchMaxValue = searchMax && !Number.isNaN(Number(searchMax)) ? Number(searchMax) : null;

  const searchSummary = useMemo(() => {
    const parts: string[] = [];
    if (searchDevelopmentNames.length) parts.push(searchDevelopmentNames.join(", "));
    if (searchMax) parts.push(`Up to AED ${Number(searchMax).toLocaleString()}`);
    return parts.length ? parts.join(" · ") : null;
  }, [searchDevelopmentNames, searchMax]);

  function pushParams(patch: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/developments?${qs}` : "/developments", { scroll: false });
  }

  function handleStatusChange(next: StatusFilter) {
    pushParams({ status: next === "all" ? null : next });
  }

  function handleBedroomsChange(next: number[]) {
    const labels = next
      .map((value) => BEDROOM_OPTIONS.find((o) => o.value === value)?.label)
      .filter((l): l is string => Boolean(l));
    pushParams({ beds: labels.length ? labels.join(",") : null });
  }

  function clearSearch() {
    router.replace("/developments");
  }

  const filtered = useMemo(() => {
    return developments.filter((d) => {
      if (status !== "all" && !d.cats.includes(status)) return false;
      if (bedrooms.length > 0) {
        const matchesBedrooms = bedrooms.some((value) => {
          if (value === 5) return d.bedroomsMax >= 5;
          return d.bedroomsMin <= value && value <= d.bedroomsMax;
        });
        if (!matchesBedrooms) return false;
      }
      if (searchDevelopmentNames.length > 0 && !searchDevelopmentNames.includes(d.name)) return false;
      // Only developments with a quoted starting price can be judged against
      // a max-price filter — sold-out/unpriced listings have nothing to
      // compare, so they drop out rather than showing as a false match.
      if (searchMaxValue !== null && (d.priceFrom === undefined || d.priceFrom > searchMaxValue)) return false;
      return true;
    }).sort((a, b) => {
      // Off Plan first, then Completed/Branded newest-delivered first.
      const aOffPlan = a.cats.includes("offplan") ? 0 : 1;
      const bOffPlan = b.cats.includes("offplan") ? 0 : 1;
      if (aOffPlan !== bOffPlan) return aOffPlan - bOffPlan;
      const aYear = COMPLETION_YEAR[a.slug] ?? -Infinity;
      const bYear = COMPLETION_YEAR[b.slug] ?? -Infinity;
      return bYear - aYear;
    });
  }, [status, bedrooms, searchDevelopmentNames, searchMaxValue]);

  return (
    <div className="px-5 py-14 tablet:px-10 tablet:py-18 desktop:px-16 desktop:py-24">
      <FilterBar
        status={status}
        onStatusChange={handleStatusChange}
        bedrooms={bedrooms}
        onBedroomsChange={handleBedroomsChange}
        view={view}
        onViewChange={setView}
        searchSummary={searchSummary}
        onClearSearch={clearSearch}
      />

      <RecentlyViewed excludeSlug={undefined} />

      {view === "map" ? (
        <div className="mt-10 flex h-[520px] flex-col items-center justify-center gap-3 border border-dashed border-sg-grey-4 bg-sg-tint-1 text-center">
          <p className="font-display text-[22px] tracking-heading text-sg-black uppercase">Map view coming soon</p>
          <p className="max-w-prose text-body-sm text-sg-grey-1">
            The interactive map (clustering, area landmarks, and card-pin sync) is a separate build — switch back to Grid to browse for now.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 py-20 text-center">
          <p className="font-display text-[22px] tracking-heading text-sg-black uppercase">No developments match these filters</p>
          <button
            type="button"
            onClick={() => router.replace("/developments")}
            className="text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <Reveal className="mt-10 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
          {filtered.map((item) => (
            <DevelopmentGridCard key={item.slug} item={item} />
          ))}
        </Reveal>
      )}
    </div>
  );
}
