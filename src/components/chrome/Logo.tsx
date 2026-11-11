import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "colour" | "white";
  className?: string;
  heightClass?: string;
  /** Fixed bounding box the link reserves regardless of the logo's own width (e.g. "desktop:w-[300px]"). */
  boxClassName?: string;
};

/** The flame logomark + wordmark lockup. Never redraw or retype — both ship as files. */
export function Logo({ variant = "colour", className, heightClass = "h-9", boxClassName }: LogoProps) {
  const src = variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg";
  return (
    <Link href="/" aria-label="Select Group — home" className={cn("inline-flex shrink-0 items-center", boxClassName, className)}>
      <Image
        src={src}
        alt="Select Group"
        width={425}
        height={171}
        priority
        className={cn("w-auto", heightClass)}
      />
    </Link>
  );
}
