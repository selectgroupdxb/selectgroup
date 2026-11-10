import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's *default* font-size scale (text-sm,
 * text-lg, ...) out of the box. It has no way to see custom `--text-*` keys
 * defined via Tailwind v4's CSS-first `@theme` in globals.css, so it falls
 * back to treating names like `text-button` or `text-h2` as unrecognised —
 * which it then buckets into the *text-colour* conflict group (same prefix).
 * The result: writing `cn("text-h2", "text-sg-black")` silently drops
 * `text-h2` because tailwind-merge "deduplicates" it against the colour
 * class, leaving elements at their unstyled/inherited font-size. This
 * produced real bugs (nav links and headings rendering at the browser
 * default instead of the design's type scale) until these custom size names
 * were registered here so tailwind-merge groups them correctly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-card-title",
        "text-stat",
        "text-stat-unit",
        "text-eyebrow",
        "text-meta",
        "text-body-lg",
        "text-body",
        "text-body-sm",
        "text-button",
        "text-chip",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
