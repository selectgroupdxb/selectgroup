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
  /** Eyebrow line above the heading/tabs (reference: "Browse Developments", "Select Group Investments", ...). */
  eyebrow: string;
  /** Big display-font line. Developments has none — it shows tabs there instead. */
  heading?: string;
  intro: string;
  /** Bottom-of-column CTA link label. Omit (Resources) for no CTA. */
  ctaLabel?: string;
  /** Card grid column count. Reference: 4 for Developments/Investments/About, 3 for Resources. */
  columns?: 3 | 4;
  links: NavLink[];
};

export const navGroups: NavGroup[] = [
  {
    key: "developments",
    label: "Developments",
    href: "/developments",
    eyebrow: "Browse Developments",
    intro: "Premium vertical communities across Dubai's most sought-after waterfront and urban locations.",
    ctaLabel: "View All Developments",
    columns: 4,
    links: [
      { label: "All Developments", href: "/developments" },
      { label: "Off Plan", href: "/developments?status=offplan" },
      { label: "Completed", href: "/developments?status=completed" },
      { label: "Branded Residences", href: "/developments?status=branded" },
    ],
  },
  {
    key: "investments",
    label: "Investments",
    href: "/investments",
    eyebrow: "Select Group Investments",
    heading: "Four verticals, one group",
    intro: "Premium real estate remains the core business, held alongside investments across hospitality, retail and a portfolio of strategic ventures.",
    ctaLabel: "View All Investments",
    columns: 4,
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
    eyebrow: "About Select Group",
    heading: "Twenty years of delivery",
    intro: "Founded in 2002 and headquartered in Dubai, Select Group has delivered 24.7 million square feet across the Middle East, the United Kingdom and Europe.",
    ctaLabel: "About Select Group",
    columns: 4,
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
    eyebrow: "Resources",
    heading: "Research and reading",
    intro: "Market analysis, district guides and press coverage, published alongside the group's own news and project updates.",
    columns: 3,
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Area Guides", href: "/areas" },
      { label: "Reports", href: "/reports" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { label: "Press", href: "/media" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer link columns — deliberately separate from `navGroups`: the
 * signed-off design uses different labels, order and even a different
 * column (Contact) in the footer versus the nav mega-panels.
 */
export type FooterColumn = {
  label: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    label: "Developments",
    links: [
      { label: "Off Plan Developments", href: "/developments?status=offplan" },
      { label: "Completed Developments", href: "/developments?status=completed" },
      { label: "Branded Developments", href: "/developments?status=branded" },
      { label: "View All Developments", href: "/developments" },
    ],
  },
  {
    label: "Investments",
    links: [
      { label: "All Investments", href: "/investments" },
      { label: "Residential", href: "/investments/residential" },
      { label: "Hospitality", href: "/investments/hospitality" },
      { label: "Retail & Commercial", href: "/investments/retail-commercial" },
      { label: "Strategic Investments", href: "/investments/strategic" },
    ],
  },
  {
    label: "About Us",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Journey", href: "/journey" },
      { label: "Meet The Team", href: "/team" },
      { label: "Awards", href: "/awards" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Reports", href: "/reports" },
      { label: "Area Guides", href: "/areas" },
      { label: "Press", href: "/media" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Customer Care Portal", href: "https://select-group.ae/customercare/" },
      { label: "Broker Enquiries", href: "/contact" },
      { label: "Register Interest", href: "/contact" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "FB", href: "#" },
  { label: "IG", href: "#" },
  { label: "X", href: "#" },
  { label: "LI", href: "#" },
  { label: "YT", href: "#" },
];
