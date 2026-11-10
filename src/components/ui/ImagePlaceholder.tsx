import Image from "next/image";
import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  /** Describes the real photography this slot holds (or will hold). */
  label: string;
  className?: string;
  /** CSS aspect-ratio, e.g. "16/9", "4/5". Omit to fill the parent's height. */
  aspect?: string;
  /** Real photo path under /public. Omit to render the neutral placeholder. */
  src?: string;
  /** Required alongside `src` — falls back to `label` if omitted. */
  alt?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders real photography when `src` is supplied, otherwise a neutral
 * stand-in with a visible caption — so every slot still without a photo is
 * obvious rather than looking content-complete. Same component either way
 * so call sites don't need to branch themselves as photos land.
 */
export function ImagePlaceholder({ label, className, aspect, src, alt, sizes, priority }: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-sg-grey-5", className)} style={aspect ? { aspectRatio: aspect } : undefined}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

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
