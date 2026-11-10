"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navGroups, utilityLinks } from "./nav-data";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={cn(
        // Opened from the persistent menu icon at every breakpoint, not just
        // mobile — matches the live site's nav, which keeps a secondary
        // full-menu icon even at desktop widths alongside the mega-panels.
        "fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-320",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sg-grey-5 px-5">
        <span className="text-eyebrow tracking-eyebrow text-sg-grey-2 uppercase">Menu</span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="text-sg-black">
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center gap-3 border-b border-sg-grey-5 px-5 py-4">
        <Search size={18} strokeWidth={1.5} className="text-sg-grey-2" />
        <input
          type="search"
          placeholder="Search…"
          className="w-full bg-transparent text-body text-sg-black placeholder:text-sg-grey-2 focus-visible:outline-none"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-2">
        {navGroups.map((group) => {
          const isOpen = openGroup === group.key;
          return (
            <div key={group.key} className="border-b border-sg-grey-5">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : group.key)}
                className="flex min-h-[44px] w-full items-center justify-between py-4 text-left font-display text-h4 tracking-display text-sg-black uppercase"
              >
                {group.label}
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={cn("transition-transform duration-320", isOpen && "rotate-180")}
                />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-420", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <ul className="overflow-hidden pb-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block min-h-[44px] py-2 text-body text-sg-grey-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block min-h-[44px] border-b border-sg-grey-5 py-4 font-display text-h4 tracking-display text-sg-black uppercase"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
