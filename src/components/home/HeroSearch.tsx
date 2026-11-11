"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

// Fixed per the handoff spec (not extracted — a UI control definition, not content).
const bedroomOptions = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5+ Bedrooms"];
// A curated shortlist, not the full ~24-development catalogue — matches the signed-off design's hero filter.
const developmentOptions = [
  "Artistry Residences",
  "Six Senses Residences Dubai Marina",
  "The EDGE",
  "Jumeirah Living Business Bay",
  "Peninsula Two",
  "Peninsula Three",
];

type PopoverKey = "type" | "beds" | "price" | null;

type HeroSearchProps = {
  onPointerHold: (held: boolean) => void;
  onInteract: () => void;
};

function Popover({
  open,
  align = "left",
  className,
  children,
}: {
  open: boolean;
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-[calc(100%+20px)] z-10 w-[min(420px,90vw)] origin-bottom border border-sg-grey-5 bg-white p-6 shadow-modal transition-[opacity,transform] duration-180 [transition-timing-function:var(--ease-standard)]",
        align === "center" ? "left-1/2 -translate-x-1/2" : "left-[-8px]",
        open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3.5 text-[15px] font-light whitespace-nowrap text-sg-black">
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
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

export function HeroSearch({ onPointerHold, onInteract }: HeroSearchProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<PopoverKey>(null);
  const [developments, setDevelopments] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function toggle(key: PopoverKey) {
    setOpen((current) => (current === key ? null : key));
    onInteract();
  }

  function toggleValue(list: string[], setList: (v: string[]) => void, value: string) {
    onInteract();
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleSubmit() {
    const params = new URLSearchParams();
    if (developments.length) params.set("developments", developments.join(","));
    if (bedrooms.length) params.set("beds", bedrooms.join(","));
    if (max) params.set("max", max);
    if (min) params.set("min", min);
    router.push(`/developments${params.toString() ? `?${params}` : ""}`);
  }

  const triggerClass = (active: boolean, selectedCount: number) =>
    cn(
      "flex h-12 flex-1 items-center justify-center gap-1.5 px-4 text-button font-bold tracking-button uppercase transition-colors duration-180",
      selectedCount > 0 ? "text-sg-black" : "text-sg-grey-1",
      active && "text-sg-pacific",
    );

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => onPointerHold(true)}
      onMouseLeave={() => onPointerHold(false)}
      className="relative mx-auto w-full max-w-[1100px] animate-[sg-hero-in_900ms_var(--ease-reveal)_200ms_both]"
    >
      <p
        className="mb-4 hidden text-center font-display text-[30px] tracking-display text-white uppercase tablet:block"
        style={{ textShadow: "0 2px 18px rgba(0,0,0,.45)" }}
      >
        Find your development
      </p>
      <div className="flex flex-col gap-2 bg-white p-2 shadow-modal tablet:flex-row tablet:items-stretch tablet:gap-0 tablet:rounded-pill tablet:p-2">
        <div className="relative flex-1">
          <button type="button" onClick={() => toggle("type")} className={triggerClass(open === "type", developments.length)}>
            {developments.length ? `Development (${developments.length})` : "Development"}
            <ChevronDown size={14} className={cn("transition-transform duration-320", open === "type" && "rotate-180")} />
          </button>
          <Popover open={open === "type"} align="left">
            <CheckboxGrid options={developmentOptions} selected={developments} onToggle={(v) => toggleValue(developments, setDevelopments, v)} />
            <button
              type="button"
              onClick={() => setDevelopments([])}
              className="mt-4 text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific"
            >
              Clear Selection
            </button>
          </Popover>
        </div>

        <div className="hidden w-px desktop:h-8 bg-[#9A9C9E] tablet:block" aria-hidden />

        <div className="relative flex-1">
          <button type="button" onClick={() => toggle("beds")} className={triggerClass(open === "beds", bedrooms.length)}>
            {bedrooms.length ? `Bedrooms (${bedrooms.length})` : "Bedrooms"}
            <ChevronDown size={14} className={cn("transition-transform duration-320", open === "beds" && "rotate-180")} />
          </button>
          <Popover open={open === "beds"} align="center">
            <CheckboxGrid options={bedroomOptions} selected={bedrooms} onToggle={(v) => toggleValue(bedrooms, setBedrooms, v)} />
            <button
              type="button"
              onClick={() => setBedrooms([])}
              className="mt-4 text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific"
            >
              Clear Selection
            </button>
          </Popover>
        </div>

        <div className="hidden w-px desktop:h-8 bg-[#9A9C9E] tablet:block" aria-hidden />

        <div className="relative flex-1">
          <button type="button" onClick={() => toggle("price")} className={triggerClass(open === "price", min || max ? 1 : 0)}>
            Price Range
            <ChevronDown size={14} className={cn("transition-transform duration-320", open === "price" && "rotate-180")} />
          </button>
          <Popover open={open === "price"} align="center" className="w-[min(320px,90vw)]">
            <div className="flex items-end gap-[22px]">
              <label className="flex-1 text-body-sm text-sg-grey-1">
                Min Price (AED)
                <input
                  type="number"
                  step={100000}
                  value={min}
                  placeholder="0"
                  onChange={(e) => { onInteract(); setMin(e.target.value); }}
                  className="mt-2 h-11 w-full border border-[#C9CBCC] px-3 text-body-sm focus-visible:border-sg-pacific focus-visible:outline-none"
                />
              </label>
              <span className="pb-3 text-body-sm text-sg-grey-2">To</span>
              <label className="flex-1 text-body-sm text-sg-grey-1">
                Max Price (AED)
                <input
                  type="number"
                  step={100000}
                  value={max}
                  placeholder="100,000,000"
                  onChange={(e) => { onInteract(); setMax(e.target.value); }}
                  className="mt-2 h-11 w-full border border-[#C9CBCC] px-3 text-body-sm focus-visible:border-sg-pacific focus-visible:outline-none"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => { setMin(""); setMax(""); }}
              className="mt-4 text-body-sm text-sg-cobalt transition-colors duration-180 hover:text-sg-pacific"
            >
              Clear Selection
            </button>
          </Popover>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex h-12 items-center justify-center bg-sg-pacific px-8 text-button font-bold tracking-button text-white uppercase transition-colors duration-180 hover:bg-sg-bluish active:bg-sg-navy tablet:rounded-pill"
        >
          Search Properties
        </button>
      </div>
    </div>
  );
}
