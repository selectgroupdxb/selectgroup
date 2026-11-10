"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MegaPanel } from "./MegaPanel";
import { SearchOverlay } from "./SearchOverlay";
import { MobileDrawer } from "./MobileDrawer";
import { AskSelect } from "./AskSelect";
import { navGroups, utilityLinks, type NavGroup } from "./nav-data";

const CLOSE_DELAY_MS = 150;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<NavGroup["key"] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Interior routes always start solid; the homepage is transparent until scrolled.
  const solid = scrolled || !isHome;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menus on route change. Adjusted during render (not an
  // effect) per React's guidance for resetting state when a prop changes —
  // avoids the cascading-render footgun of setState-in-effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenPanel(null);
    setDrawerOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenPanel(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenPanel(null), CLOSE_DELAY_MS);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const activeGroup = navGroups.find((g) => g.key === openPanel) ?? null;

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 desktop:h-22",
          solid ? "bg-white shadow-nav" : "bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-full max-w-[var(--page-max)] items-center justify-between px-5 md:px-10 desktop:px-16">
          <Logo variant={solid ? "colour" : "white"} heightClass="h-7 desktop:h-9" />

          <nav className="hidden items-center gap-2 desktop:flex" aria-label="Primary">
            {navGroups.map((group) => {
              const isOpen = openPanel === group.key;
              return (
                <div key={group.key} onMouseEnter={() => { cancelClose(); setOpenPanel(group.key); }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${group.key}`}
                    onClick={() => setOpenPanel(group.key)}
                    className={cn(
                      "flex h-22 items-center gap-1 px-4 text-button font-bold tracking-button uppercase transition-colors duration-180",
                      solid ? "text-sg-black" : "text-white",
                      "hover:text-sg-pacific",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={cn("transition-transform duration-320", isOpen && "rotate-180")}
                    />
                  </button>
                </div>
              );
            })}
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex h-22 items-center px-4 text-button font-bold tracking-button uppercase transition-colors duration-180 hover:text-sg-pacific",
                  solid ? "text-sg-black" : "text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className={cn(
                "flex h-11 w-11 items-center justify-center transition-colors duration-180 hover:text-sg-pacific",
                solid ? "text-sg-black" : "text-white",
              )}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center transition-colors duration-180 desktop:hidden",
                solid ? "text-sg-black" : "text-white",
              )}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>

          {activeGroup ? (
            <div onMouseEnter={cancelClose}>
              <MegaPanel group={activeGroup} open={Boolean(openPanel)} id={`mega-${activeGroup.key}`} />
            </div>
          ) : null}
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AskSelect visible={!isHome || scrolled} />
    </>
  );
}
