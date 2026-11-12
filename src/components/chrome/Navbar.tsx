"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MegaPanel } from "./MegaPanel";
import { SearchOverlay } from "./SearchOverlay";
import { MobileDrawer } from "./MobileDrawer";
import { AskSelect } from "./AskSelect";
import { navGroups, utilityLinks, type NavGroup } from "./nav-data";

const CLOSE_DELAY_MS = 150;

// Routes whose hero sits directly behind the nav (dark photo + scrim) get the
// same transparent-until-scrolled treatment as the homepage. Every other
// route starts solid, since a transparent nav over a plain white page top
// would be unreadable.
// Individual project pages (`/developments/[slug]`) reserve solid nav space
// above the hero (see ProjectHero's `pt-22` offset) rather than floating the
// nav over the image, so they're deliberately excluded here.
const TRANSPARENT_HERO_ROUTES = ["/", "/developments"];

export function Navbar() {
  const pathname = usePathname();
  const hasTransparentHero = TRANSPARENT_HERO_ROUTES.includes(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<NavGroup["key"] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const solid = scrolled || !hasTransparentHero;

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
          solid ? "bg-white/92 shadow-nav backdrop-blur-[16px]" : "bg-transparent",
        )}
      >
        <div className="relative flex h-full items-center px-5 tablet:px-10 desktop:px-16">
          <Logo variant={solid ? "colour" : "white"} heightClass="h-10 desktop:h-[65px]" boxClassName="desktop:w-[300px]" />

          <nav className="ml-auto hidden items-center desktop:flex desktop:gap-[28px] desktop:mr-10" aria-label="Primary">
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
                      "flex h-22 items-center gap-[7px] text-[13px] font-normal tracking-[0.1em] whitespace-nowrap uppercase transition-opacity duration-180",
                      solid ? "text-sg-black" : "text-white",
                      isOpen ? "opacity-[.62]" : "hover:opacity-[.62]",
                    )}
                  >
                    {group.label}
                    <span
                      aria-hidden
                      className="shrink-0 text-[9px] transition-transform duration-320"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      &#9662;
                    </span>
                  </button>
                </div>
              );
            })}
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenPanel(null)}
                className={cn(
                  "flex h-22 items-center text-[13px] font-normal tracking-[0.1em] whitespace-nowrap uppercase transition-opacity duration-180 hover:opacity-[.62]",
                  solid ? "text-sg-black" : "text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            onMouseEnter={() => setOpenPanel(null)}
            className="ml-auto flex items-center gap-2 desktop:ml-0 desktop:gap-[20px]"
          >
            <span
              aria-hidden
              className={cn(
                "hidden h-5 w-px desktop:block",
                solid ? "bg-sg-grey-4" : "bg-white/35",
              )}
            />
            <Button
              href="/contact"
              variant="filled"
              size="compact"
              className="hidden h-[42px] px-6 text-[11px] tracking-[0.18em] desktop:inline-flex"
            >
              Get In Touch
            </Button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className={cn(
                "flex h-11 w-11 items-center justify-center transition-colors duration-180 hover:text-sg-pacific",
                solid ? "text-sg-black" : "text-white",
              )}
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open full menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center transition-colors duration-180 desktop:hidden",
                solid ? "text-sg-black" : "text-white",
              )}
            >
              <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="6" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
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
      <AskSelect visible={!hasTransparentHero || scrolled} />
    </>
  );
}
