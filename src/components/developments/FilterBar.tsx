"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { developments, type DevelopmentCategory } from "@/data/homepage";

export type StatusFilter = "all" | DevelopmentCategory;

const STATUS_CHIPS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "offplan", label: "Off Plan" },
  { key: "completed", label: "Completed" },
  { key: "branded", label: "Branded" },
];

function countFor(key: StatusFilter) {
  if (key === "all") return developments.length;
  return developments.filter((d) => d.cats.includes(key)).length;
}

export const BEDROOM_OPTIONS = [
  { label: "Studio", value: 0 },
  { label: "1 Bedroom", value: 1 },
  { label: "2 Bedrooms", value: 2 },
  { label: "3 Bedrooms", value: 3 },
  { label: "4 Bedrooms", value: 4 },
  { label: "5+ Bedrooms", value: 5 },
];

type FilterBarProps = {
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  bedrooms: number[];
  onBedroomsChange: (bedrooms: number[]) => void;
  view: "grid" | "map";
  onViewChange: (view: "grid" | "map") => void;
  searchSummary: string | null;
  onClearSearch: () => void;
};

export function FilterBar({
  status,
  onStatusChange,
  bedrooms,
  onBedroomsChange,
  view,
  onViewChange,
  searchSummary,
  onClearSearch,
}: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<number[]>(bedrooms);
  const rootRef = useRef<HTMLDivElement>(null);

  function openPopover() {
    setDraft(bedrooms);
    setOpen(true);
  }

  function toggleDraft(value: number) {
    setDraft((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  function apply() {
    onBedroomsChange(draft);
    setOpen(false);
  }

  function clear() {
    setDraft([]);
    onBedroomsChange([]);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Development status">
          {STATUS_CHIPS.map((chip) => {
            const active = status === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onStatusChange(chip.key)}
                className={cn(
                  "flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-pill px-5 py-2 transition-colors duration-180",
                  active ? "bg-sg-black text-white" : "border border-sg-grey-4 text-sg-black",
                )}
              >
                <span className="text-chip font-bold tracking-chip uppercase">{chip.label}</span>
                <span className={cn("text-[11px] tabular-nums", active ? "text-white/60" : "text-sg-grey-2")}>
                  {String(countFor(chip.key)).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <span aria-hidden className="hidden h-8 w-px bg-sg-grey-4 tablet:block" />

        <div ref={rootRef} className="relative">
          <button
            type="button"
            onClick={() => (open ? setOpen(false) : openPopover())}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-5 py-2 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
              bedrooms.length > 0 ? "border-sg-black bg-sg-black text-white" : "border-sg-grey-4 text-sg-grey-1",
            )}
          >
            Bedrooms{bedrooms.length > 0 ? ` ${String(bedrooms.length).padStart(2, "0")}` : ""}
            <span
              aria-hidden
              className="text-[9px] transition-transform duration-320"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              &#9662;
            </span>
          </button>

          <div
            className={cn(
              "absolute top-[calc(100%+12px)] left-0 z-20 w-[min(360px,90vw)] origin-top border border-sg-grey-5 bg-white p-6 shadow-modal transition-[opacity,transform] duration-180",
              open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <div className="grid grid-cols-2 gap-x-7 gap-y-3.5">
              {BEDROOM_OPTIONS.map((option) => {
                const checked = draft.includes(option.value);
                return (
                  <label key={option.label} className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-light whitespace-nowrap text-sg-black">
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-180",
                        checked ? "border-sg-pacific bg-sg-pacific" : "border-[#C9CBCC] bg-white",
                      )}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" style={{ opacity: checked ? 1 : 0 }} aria-hidden>
                        <polyline points="1,5 4.5,8.5 11,1.5" stroke="#FFFFFF" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <input type="checkbox" checked={checked} onChange={() => toggleDraft(option.value)} className="sr-only" />
                    {option.label}
                  </label>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-sg-grey-5 pt-5">
              <button type="button" onClick={clear} className="text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific">
                Clear
              </button>
              <Button type="button" onClick={apply} variant="filled" size="compact">
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 rounded-pill border border-sg-grey-4 p-1">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={cn(
              "min-h-9 cursor-pointer rounded-pill px-4 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
              view === "grid" ? "bg-sg-black text-white" : "text-sg-grey-1",
            )}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => onViewChange("map")}
            className={cn(
              "min-h-9 cursor-pointer rounded-pill px-4 text-chip font-bold tracking-chip uppercase transition-colors duration-180",
              view === "map" ? "bg-sg-black text-white" : "text-sg-grey-1",
            )}
          >
            Map
          </button>
        </div>
      </div>

      {searchSummary ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-pill bg-sg-tint-1 px-4 py-2 text-body-sm text-sg-black">
            {searchSummary}
            <button type="button" onClick={onClearSearch} aria-label="Clear search" className="text-sg-grey-2 hover:text-sg-black">
              ×
            </button>
          </span>
        </div>
      ) : null}
    </div>
  );
}
