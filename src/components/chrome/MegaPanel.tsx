"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { developments, getDevelopmentImage, verticals } from "@/data/homepage";
import type { NavGroup } from "./nav-data";

type MegaPanelProps = {
  group: NavGroup;
  open: boolean;
  id: string;
};

type PanelCard = {
  key: string;
  href: string;
  image?: string;
  title: string;
  meta: string;
  badge?: string;
};

const DEV_TABS = [
  { key: "offplan", num: "01", label: "Off Plan" },
  { key: "completed", num: "02", label: "Completed" },
  { key: "branded", num: "03", label: "Branded Residences" },
] as const;

type DevTabKey = (typeof DEV_TABS)[number]["key"];

function developmentCards(cat: DevTabKey): PanelCard[] {
  return developments
    .filter((d) => d.cats.includes(cat))
    .slice(0, 4)
    .map((d) => ({ key: d.slug, href: `/developments/${d.slug}`, image: getDevelopmentImage(d), title: d.name, meta: d.location, badge: d.price }));
}

const INVESTMENT_NOTES: Record<string, string> = {
  Developments: "Residential towers & master communities",
  Hospitality: "Hotels & branded residences",
  "Retail & Commercial": "Retail, office & mixed-use",
  "Strategic Investments": "Fitness, wellness & technology",
};

const INVESTMENT_CARDS: PanelCard[] = verticals.map((v) => ({
  key: v.invPage,
  href: `/investments/${v.invPage}`,
  image: v.image,
  title: v.title,
  meta: INVESTMENT_NOTES[v.title] ?? "",
}));

const ABOUT_CARDS: PanelCard[] = [
  { key: "who", href: "/about", title: "Who We Are", meta: "Our story & leadership" },
  { key: "journey", href: "/journey", title: "Our Journey", meta: "Two decades of delivery" },
  { key: "awards", href: "/awards", title: "Awards", meta: "Industry recognition" },
  { key: "team", href: "/team", title: "Team", meta: "Meet the leadership" },
];

const RESOURCE_CARDS: PanelCard[] = [
  { key: "insights", href: "/insights", title: "Insights", meta: "Market analysis & editorial" },
  { key: "areas", href: "/areas", title: "Area Guides", meta: "District-by-district guides" },
  { key: "reports", href: "/reports", title: "Reports", meta: "Downloadable market reports" },
];

export function MegaPanel({ group, open, id }: MegaPanelProps) {
  const [tab, setTab] = useState<DevTabKey>("offplan");

  const cards: PanelCard[] =
    group.key === "developments"
      ? developmentCards(tab)
      : group.key === "investments"
        ? INVESTMENT_CARDS
        : group.key === "about"
          ? ABOUT_CARDS
          : RESOURCE_CARDS;

  const columns = group.columns ?? 4;
  const activeTabCount = developments.filter((d) => d.cats.includes(tab)).length;

  return (
    <div
      id={id}
      role="region"
      aria-label={`${group.label} menu`}
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-600 [transition-timing-function:var(--ease-reveal)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr] pointer-events-none",
      )}
    >
      <div className="overflow-hidden">
        <div className="border-t border-sg-grey-5 bg-white shadow-modal">
          <div className="grid gap-16 px-16 pt-11 pb-[52px]" style={{ gridTemplateColumns: "320px 1fr" }}>
            <div className="flex flex-col">
              <p className="mb-[22px] text-eyebrow font-bold tracking-eyebrow text-sg-grey-2 uppercase">{group.eyebrow}</p>

              {group.key === "developments" ? (
                <div className="flex flex-col">
                  {DEV_TABS.map((t) => {
                    const count = developments.filter((d) => d.cats.includes(t.key)).length;
                    const active = tab === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onMouseEnter={() => setTab(t.key)}
                        onClick={() => setTab(t.key)}
                        className="flex items-baseline gap-4 border-b border-sg-grey-5 py-4 text-left transition-colors duration-180"
                      >
                        <span
                          className={cn(
                            "text-[11px] font-bold tracking-[0.2em]",
                            active ? "text-sg-pacific" : "text-sg-grey-3",
                          )}
                        >
                          {t.num}
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-display text-[17px] tracking-heading text-sg-black uppercase",
                            active && "text-sg-pacific",
                          )}
                        >
                          {t.label}
                        </span>
                        <span className="text-[12px] font-light text-sg-grey-2">{count}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  {group.heading ? (
                    <p className="font-display text-[26px] leading-[1.2] tracking-display text-sg-black uppercase">{group.heading}</p>
                  ) : null}
                  <p className={cn("text-body-sm text-sg-grey-1", group.heading && "mt-5")}>{group.intro}</p>
                </>
              )}

              {group.ctaLabel ? (
                <Link
                  href={group.href}
                  className="mt-auto pt-[26px] text-button tracking-button text-sg-navy uppercase transition-colors duration-180 hover:text-sg-pacific"
                >
                  {group.ctaLabel} →
                </Link>
              ) : null}
            </div>

            <div>
              <div className={cn("grid gap-6", columns === 3 ? "grid-cols-3" : "grid-cols-4")}>
                {cards.map((card) => (
                  <Link key={card.key} href={card.href} tabIndex={open ? 0 : -1} className="group block">
                    <div className="relative h-[184px] overflow-hidden bg-sg-black">
                      <ImagePlaceholder
                        label={card.title}
                        src={card.image}
                        alt={card.title}
                        sizes="25vw"
                        className="transition-transform duration-600 group-hover:scale-[1.04]"
                      />
                      {card.badge ? (
                        <span className="absolute top-0 left-0 bg-sg-black/78 px-3 py-2 text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                          {card.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-4 line-clamp-2 min-h-[2.6em] font-display text-[15px] tracking-heading text-sg-black uppercase">
                      {card.title}
                    </p>
                    <p className="mt-1.5 text-[13px] font-light text-sg-grey-2">{card.meta}</p>
                  </Link>
                ))}
              </div>
              {group.key === "developments" ? (
                <p className="mt-[26px] max-w-[76ch] text-[13px] leading-[1.7] font-light text-sg-grey-2">
                  Showing {Math.min(4, activeTabCount)} of {activeTabCount} {DEV_TABS.find((t) => t.key === tab)?.label.toLowerCase()} developments.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
