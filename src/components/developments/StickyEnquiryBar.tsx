"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type StickyEnquiryBarProps = {
  name: string;
  heroSub: string;
  priceLabel: string;
  price: string;
  priceNote: string;
  /** DOM id of the Key Facts band — the bar appears once it scrolls past. */
  triggerId: string;
};

export function StickyEnquiryBar({ name, heroSub, priceLabel, price, priceNote, triggerId }: StickyEnquiryBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    function onScroll() {
      const footer = document.querySelector("footer");
      if (footer && footer.getBoundingClientRect().top <= window.innerHeight) {
        setVisible(false);
        return;
      }
      const el = document.getElementById(triggerId);
      if (!el) {
        setVisible(window.scrollY > 1000);
        return;
      }
      const rect = el.getBoundingClientRect();
      setVisible(window.scrollY > 40 && rect.bottom <= window.innerHeight - 96);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [triggerId]);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => setBarHeight(entries[0].contentRect.height));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-white/16 bg-sg-black/94 backdrop-blur-md transition-[transform,opacity] duration-600",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="flex h-20 items-center gap-6 px-5 tablet:px-10 desktop:h-24 desktop:px-16">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] tracking-heading text-white uppercase">{name}</p>
            <p className="truncate text-body-sm text-white/60">{heroSub}</p>
          </div>
          <div className="hidden shrink-0 border-l border-white/16 pl-6 desktop:block">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">{priceLabel}</p>
            <p className="text-body text-white">{price}</p>
          </div>
          <div className="hidden shrink-0 border-l border-white/16 pl-6 desktop:block">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">Bedrooms</p>
            <p className="max-w-[26ch] truncate text-body text-white">{priceNote}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button href="#register" variant="outline-inverse" size="compact" className="hidden desktop:inline-flex">
              Download Floor Plans
            </Button>
            <Button href="#register" variant="filled" size="compact">
              Register Interest
            </Button>
          </div>
        </div>
      </div>
      {visible ? <div style={{ height: barHeight }} aria-hidden /> : null}
    </>
  );
}
