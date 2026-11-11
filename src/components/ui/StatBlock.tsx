"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type StatBlockProps = {
  /** Final numeral exactly as it should read, e.g. "24.7M", "8,701", "35.2B", "20+". */
  value: string;
  unit: string;
  label: string;
  className?: string;
};

/**
 * Parses a leading numeric run out of a formatted stat string so it can be
 * counted up, while keeping the exact final string for SSR/SEO and for any
 * trailing non-numeric characters (e.g. the "+" in "20+", the "M"/"B" suffixes,
 * which are treated as static suffix rather than animated).
 */
function parseNumeral(value: string): { prefix: string; number: number; decimals: number; suffix: string } {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d*)(.*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: value };
  const [, prefix, numeric, suffix] = match;
  const cleaned = numeric.replace(/,/g, "");
  const decimals = cleaned.includes(".") ? cleaned.split(".")[1].length : 0;
  return { prefix, number: parseFloat(cleaned) || 0, decimals, suffix };
}

function formatNumeral(n: number, decimals: number, hasComma: boolean) {
  const fixed = n.toFixed(decimals);
  if (!hasComma) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

export function StatBlock({ value, unit, label, className }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: leave `display` at its initial (final) value — no
    // observer needed, so there's nothing to synchronize here.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const { prefix, number, decimals, suffix } = parseNumeral(value);
        const hasComma = value.includes(",");
        const duration = 1400;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${formatNumeral(number * eased, decimals, hasComma)}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className={cn("flex min-w-0 flex-col items-center text-center", className)}
      style={{ containerType: "inline-size" }}
    >
      <span
        className="font-display text-white tabular-nums whitespace-nowrap tracking-[0.02em]"
        style={{ font: "var(--weight-regular) min(80px, 17cqi)/1 var(--font-display)" }}
      >
        {display}
      </span>
      <span className="mt-4 text-stat-unit font-display tracking-chip text-white/60 uppercase">{unit}</span>
      <span className="mt-5 w-full border-t border-white/28 pt-5 text-body-sm text-white/72">{label}</span>
    </div>
  );
}
