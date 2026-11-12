"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import type { GalleryCategory, GalleryItem } from "@/data/developmentDetails";

const TABS: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "residences", label: "Residences" },
  { key: "shared", label: "Shared spaces" },
  { key: "wellness", label: "Wellness" },
];

export function ProjectGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const [tab, setTab] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() => (tab === "all" ? items : items.filter((i) => i.category === tab)), [items, tab]);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <Section tone="white" padding="standard" id="gallery">
      <div className="mx-auto max-w-[60ch] text-center">
        <Eyebrow>Gallery</Eyebrow>
        <h2 className="mt-3 text-h2 text-sg-black">{title}</h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-pill px-5 py-2.5 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
              tab === t.key ? "bg-sg-black text-white" : "border border-sg-grey-4 text-sg-black",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {filtered.map((item, i) => (
          <button
            key={item.image + item.caption}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative block aspect-[4/3] overflow-hidden text-left"
          >
            <ImagePlaceholder
              label={item.caption}
              src={item.image}
              sizes="(min-width: 1200px) 33vw, 50vw"
              className="transition-transform duration-600 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-body-sm text-sg-grey-2">
        Architectural renderings. Details remain subject to the final specification.
      </p>

      {lightbox !== null ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-sg-black/94 p-6" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
            className="absolute top-6 right-6 text-[24px] text-white"
          >
            ×
          </button>
          <div className="relative max-h-[calc(100vh-160px)] w-full max-w-5xl flex-1">
            {filtered[lightbox].image ? (
              <Image
                src={filtered[lightbox].image}
                alt={filtered[lightbox].caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : null}
          </div>
          <div className="flex items-center gap-6 text-white">
            <button
              type="button"
              onClick={() => setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
              aria-label="Previous image"
              className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 transition-colors duration-180 hover:bg-white hover:text-sg-black"
            >
              ‹
            </button>
            <p className="text-body-sm">
              {filtered[lightbox].caption} — {lightbox + 1} / {filtered.length}
            </p>
            <button
              type="button"
              onClick={() => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))}
              aria-label="Next image"
              className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 transition-colors duration-180 hover:bg-white hover:text-sg-black"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
