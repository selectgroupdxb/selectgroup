import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "filled" | "outline" | "outline-inverse" | "glass";
  size?: "default" | "compact";
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill text-button font-bold tracking-button uppercase transition-colors duration-180 [transition-timing-function:var(--ease-standard)] focus-visible:outline-none";

const sizeClass: Record<NonNullable<CommonProps["size"]>, string> = {
  default: "h-12 px-8",
  compact: "h-10 px-6",
};

const variantClass: Record<NonNullable<CommonProps["variant"]>, string> = {
  filled: "bg-sg-pacific text-white hover:bg-sg-bluish active:bg-sg-navy",
  outline:
    "border border-sg-black text-sg-black bg-transparent hover:bg-sg-black hover:text-white",
  "outline-inverse":
    "border border-white/56 text-white bg-transparent hover:bg-white hover:text-sg-black",
  glass:
    "border border-white/40 bg-black/18 text-white backdrop-blur-md hover:bg-white hover:text-sg-black",
};

function isLink(props: ButtonAsLink | ButtonAsButton): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "filled", size = "default", children, className } = props;
  const classes = cn(base, sizeClass[size], variantClass[variant], className);

  if (isLink(props)) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, size: _size, children: _children, className: _className, type = "button", ...rest } =
    props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
