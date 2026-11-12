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
 *
 * Two safeguards against getting stuck hidden forever (seen in practice on
 * very tall content that's already on-screen at load, where the browser can
 * fail to ever report an intersection): skip the hide entirely when the
 * element is already in the viewport on mount, and fail open via a timeout
 * if the observer still hasn't fired shortly after.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) return;

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

    // A true last resort, not a normal-path timer — long enough that any
    // user who's going to scroll at all will trigger the real observer
    // first; this only ever fires for the broken-observer edge case.
    const failSafe = window.setTimeout(() => setVisible(true), 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
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
