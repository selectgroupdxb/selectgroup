import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  /** Describes the real photography this slot will hold once supplied by Select Group. */
  label: string;
  className?: string;
  /** CSS aspect-ratio, e.g. "16/9", "4/5". Omit to fill the parent's height. */
  aspect?: string;
};

/**
 * Neutral stand-in for real photography. The handoff's supplied prototype images
 * are provisional and explicitly not to ship even as placeholders — this renders
 * a plain tinted field with a visible caption instead, so every empty slot is
 * obvious rather than looking content-complete.
 */
export function ImagePlaceholder({ label, className, aspect }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn("relative h-full w-full overflow-hidden bg-sg-grey-5", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 23px, rgba(34,34,34,0.05) 23px 24px)",
        }}
        aria-hidden
      />
      <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate bg-white/70 px-2 py-1 text-[10px] tracking-chip text-sg-grey-2 uppercase">
        {label}
      </span>
    </div>
  );
}
