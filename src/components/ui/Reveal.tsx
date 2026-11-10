"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

/**
 * Scroll-reveal: opacity 0→1, translateY 28px→0, 900ms, fires once at ~20% in
 * view. SSR and no-JS always render the final (visible) state — only once a
 * browser with JS confirms it can observe the element do we hide it pending
 * reveal, so crawlers and reduced-motion users see full content immediately.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-900 [transition-timing-function:var(--ease-reveal)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
