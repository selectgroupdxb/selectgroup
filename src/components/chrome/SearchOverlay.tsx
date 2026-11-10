"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "./Logo";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-sg-black/96 backdrop-blur-md transition-opacity duration-320 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="absolute top-6 right-6 text-white transition-colors duration-180 hover:text-sg-pacific desktop:top-10 desktop:right-10"
      >
        <X size={28} strokeWidth={1.5} />
      </button>
      <Logo variant="white" heightClass="h-8" className="mb-12" />
      <form
        action="/developments"
        className="w-full max-w-[720px] border-b border-white/40 px-5"
        onSubmit={onClose}
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Search developments, locations, insights…"
          className="w-full bg-transparent py-4 text-center font-display text-h3 tracking-display text-white uppercase placeholder:text-white/40 focus-visible:outline-none"
        />
      </form>
    </div>
  );
}
