"use client";

import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { developments, type Development } from "@/data/homepage";
import { useLocalStorageList } from "@/lib/useLocalStorageList";

const RECENT_KEY = "sg-recent";

/**
 * Reads the shared "recently viewed" slug list from localStorage. Nothing
 * writes to this key yet — that happens on the individual development page
 * (not built yet), so this will render nothing until that page exists and a
 * visitor has actually opened a project.
 */
export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const [slugs, setSlugs] = useLocalStorageList(RECENT_KEY);

  const items = slugs
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => developments.find((d) => d.slug === slug))
    .filter((d): d is Development => Boolean(d))
    .slice(0, 5);

  function clear() {
    setSlugs([]);
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-10 border-t border-sg-grey-5 pt-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-eyebrow font-bold tracking-eyebrow text-sg-grey-2 uppercase">Recently Viewed</span>
        <button type="button" onClick={clear} className="text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific">
          Clear
        </button>
      </div>
      <div className="mt-4 flex gap-4 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => (
          <Link key={item.slug} href={`/developments/${item.slug}`} className="group relative h-24 w-36 shrink-0 overflow-hidden">
            <ImagePlaceholder
              label={item.name}
              src={item.image}
              alt={item.name}
              sizes="144px"
              className="absolute inset-0 transition-transform duration-600 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-sg-black/40" aria-hidden />
            <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate text-[11px] font-bold tracking-chip text-white uppercase">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
