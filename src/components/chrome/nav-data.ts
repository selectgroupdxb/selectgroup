export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  key: "developments" | "investments" | "about" | "resources";
  label: string;
  /** Hub page the intro column's CTA links to. */
  href: string;
  intro: string;
  links: NavLink[];
};

export const navGroups: NavGroup[] = [
  {
    key: "developments",
    label: "Developments",
    href: "/developments",
    intro: "Premium vertical communities across Dubai's most sought-after waterfront and urban locations.",
    links: [
      { label: "All Developments", href: "/developments" },
      { label: "Off Plan", href: "/developments?status=offplan" },
      { label: "Completed", href: "/developments?status=completed" },
      { label: "Branded Residences", href: "/developments?status=branded" },
      { label: "Area Guides", href: "/areas" },
    ],
  },
  {
    key: "investments",
    label: "Investments",
    href: "/investments",
    intro: "Four verticals, one standard — residential, hospitality, retail and commercial, and strategic.",
    links: [
      { label: "Residential", href: "/investments/residential" },
      { label: "Hospitality", href: "/investments/hospitality" },
      { label: "Retail & Commercial", href: "/investments/retail-commercial" },
      { label: "Strategic", href: "/investments/strategic" },
    ],
  },
  {
    key: "about",
    label: "About Us",
    href: "/about",
    intro: "Developing premium real estate since 2002.",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Journey", href: "/journey" },
      { label: "Awards", href: "/awards" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    href: "/insights",
    intro: "Market reports, area guides and insight for buyers and investors.",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Media", href: "/media" },
      { label: "Reports", href: "/reports" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { label: "Press", href: "/media" },
  { label: "Contact", href: "/contact" },
];
