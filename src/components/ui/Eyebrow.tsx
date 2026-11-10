import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: string;
  tone?: "muted" | "inverse" | "accent";
  as?: "p" | "span";
  className?: string;
};

const toneClass: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  muted: "text-sg-grey-2",
  inverse: "text-white/72",
  accent: "text-sg-pacific",
};

/** Body 700, 12px, 0.22em tracking, uppercase. Two to four words, unpunctuated. */
export function Eyebrow({ children, tone = "muted", as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-body font-bold text-eyebrow tracking-eyebrow uppercase",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
