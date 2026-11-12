"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { GalleryCategory, GalleryItem } from "@/data/developmentDetails";

const TABS: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "exterior", label: "Exterior" },
  { key: "residences", label: "Residences" },
  { key: "amenities", label: "Amenities" },
  { key: "views", label: "Views" },
];

/**
 * Gallery is a lightbox only — triggered from the hero's "View Gallery" button,
 * no separate inline grid section on the page (per the authoritative prototype).
 */
export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => (tab === "all" ? items : items.filter((i) => i.category === tab)), [items, tab]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length]);

  const active = filtered[index] ?? filtered[0];

  return (
    <>
      <Button onClick={() => { setOpen(true); setIndex(0); }} variant="glass">
        {`View Gallery · ${items.length}`}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-sg-black/94 p-6" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => { setTab(t.key); setIndex(0); }}
                  className={cn(
                    "rounded-pill px-4 py-2 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
                    tab === t.key ? "bg-white text-sg-black" : "border border-white/40 text-white",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button href="#register" variant="outline-inverse" size="compact">
                Register Interest
              </Button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close gallery" className="text-[24px] text-white">
                ×
              </button>
            </div>
          </div>

          <div className="relative mt-6 flex-1">
            {active?.image ? (
              <Image src={active.image} alt={active.caption} fill sizes="100vw" className="object-contain" />
            ) : (
              <div className="flex h-full items-center justify-center text-body-sm text-white/50">{active?.caption ?? "No images in this category"}</div>
            )}
          </div>

          {active ? (
            <div className="mt-4 flex items-center justify-center gap-6 text-white">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + filtered.length) % filtered.length)}
                aria-label="Previous image"
                className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 transition-colors duration-180 hover:bg-white hover:text-sg-black"
              >
                ‹
              </button>
              <p className="text-body-sm">
                {active.caption} — {index + 1} / {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % filtered.length)}
                aria-label="Next image"
                className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 transition-colors duration-180 hover:bg-white hover:text-sg-black"
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
