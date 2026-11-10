import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "dark" | "inverse";
  align?: "left" | "center";
  maxWidthCh?: number;
  action?: ReactNode;
  className?: string;
};

/**
 * Standard section header: eyebrow, H2, optional body, optional trailing action
 * (e.g. "View All Developments"). Section headers are centred by brand convention
 * when `align="center"`; most homepage sections instead pair this with a row
 * layout (header left, action right), which is `align="left"` with `action` set.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
  align = "left",
  maxWidthCh,
  action,
  className,
}: SectionHeadingProps) {
  const headingColor = tone === "inverse" ? "text-white" : "text-sg-black";
  const bodyColor = tone === "inverse" ? "text-white/72" : "text-sg-grey-1";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
        {eyebrow ? <Eyebrow tone={tone === "inverse" ? "inverse" : "muted"}>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn("w-full min-w-0 text-h2", headingColor)}
          style={maxWidthCh ? { maxWidth: `${maxWidthCh}ch` } : undefined}
        >
          {title}
        </h2>
        {body ? (
          <p className={cn("w-full min-w-0 max-w-prose text-body-lg font-light", bodyColor)}>
            {body}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
