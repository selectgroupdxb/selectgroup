import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background field. Rule: no more than two tints per page — white + grey-5, or white + one dark field. */
  tone?: "white" | "grey" | "black";
  /** Vertical rhythm. 128px standard, 96px medium, 64px tight (desktop values; scales down per breakpoint). */
  padding?: "standard" | "medium" | "tight" | "stats" | "none";
  fullBleed?: boolean;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-sg-white",
  grey: "bg-sg-tint-1",
  black: "bg-sg-black text-sg-white",
};

const paddingClass: Record<NonNullable<SectionProps["padding"]>, string> = {
  // 128px desktop / 96px tablet / 72px mobile, per the handoff's responsive table.
  standard: "py-18 md:py-24 desktop:py-32",
  // 96px desktop, scaled proportionally.
  medium: "py-14 md:py-18 desktop:py-24",
  // 64px desktop, scaled proportionally.
  tight: "py-9 md:py-12 desktop:py-16",
  // 136px desktop dark statistics field, scaled proportionally.
  stats: "py-19 md:py-26 desktop:py-34",
  none: "",
};

export function Section({
  as: Tag = "section",
  id,
  children,
  className,
  tone = "white",
  padding = "standard",
  fullBleed = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(toneClass[tone], paddingClass[padding], "scroll-mt-16 desktop:scroll-mt-22", className)}
    >
      <div className={cn(!fullBleed && "mx-auto max-w-[var(--page-max)] px-5 md:px-10 desktop:px-16")}>
        {children}
      </div>
    </Tag>
  );
}
