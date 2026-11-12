import Link from "next/link";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  /** Omit on the current (last) page — it renders as plain text, not a link. */
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "inverse" for light text over a dark photo/scrim, "dark" for light backgrounds. */
  tone?: "inverse" | "dark";
  className?: string;
};

/** "/" as separator, per the design system's icon-free typography convention. */
export function Breadcrumb({ items, tone = "inverse", className }: BreadcrumbProps) {
  const mutedColor = tone === "inverse" ? "text-white/70" : "text-sg-grey-2";
  const linkColor = tone === "inverse" ? "text-white/70 hover:text-white" : "text-sg-grey-2 hover:text-sg-black";

  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-chip uppercase", className)}>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 ? (
            <span className={mutedColor} aria-hidden>
              /
            </span>
          ) : null}
          {item.href ? (
            <Link href={item.href} className={cn(linkColor, "transition-colors duration-180")}>
              {item.label}
            </Link>
          ) : (
            <span className={mutedColor} aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
