import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "colour" | "white";
  className?: string;
  heightClass?: string;
};

/** The flame logomark + wordmark lockup. Never redraw or retype — both ship as files. */
export function Logo({ variant = "colour", className, heightClass = "h-9" }: LogoProps) {
  const src = variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg";
  return (
    <Link href="/" aria-label="Select Group — home" className={cn("inline-flex items-center", className)}>
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
