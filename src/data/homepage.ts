/**
 * Seed data extracted verbatim from the design-handoff prototype:
 *   design_handoff_select_group_website/prototype/Select Group Homepage.dc.html
 *
 * This is extraction, not authoring. Development names, awards, figures and
 * testimonials are quoted exactly as found in the source — never paraphrased
 * or embellished. Where a field was not present anywhere in the source, it is
 * simply omitted (left `undefined`) rather than invented.
 *
 * `image` fields point at real photography dropped into
 * public/images/homepage/ (see that folder's README). Not every item has one
 * yet — items without an `image` fall back to the neutral ImagePlaceholder.
 *
 * `slug` fields on developments are the one exception to "verbatim only":
 * the prototype has no canonical slug (it matches developments by `name`
 * string alone via `PROJECT_ROW`/`openProject`), so slugs here are
 * mechanically derived (kebab-case of the name) for routing purposes only.
 */

const IMG = "/images/homepage/";

// ---------------------------------------------------------------------------
// 1. Developments
// source: Select Group Homepage.dc.html ~L4947-4973 (`const allProjects = [...]`)
// Coordinates cross-referenced from design_handoff_select_group_website/README.md
// "Development coordinates" table (confirmed by Select Group, all 26 present).
// ---------------------------------------------------------------------------

/** Category/grid-placement tags used by the dev-index filter chips and the
 *  homepage Featured Developments tabs (`devTabDefs`: offplan / completed / branded). */
export type DevelopmentCategory = "offplan" | "completed" | "branded" | "commercial";

export interface Development {
  name: string;
  /** Mechanically derived from `name` — not present in source (see file header). */
  slug: string;
  location: string;
  /** Verbatim status string as rendered on the card, e.g. "Off Plan" | "Completed" | "Branded". */
  status: string;
  /** Category tags driving filter-chip membership and homepage tab grouping. */
  cats: DevelopmentCategory[];
  /** Unit type / bedroom range, e.g. "2–4 bedrooms". */
  types: string;
  /** Starting price string, e.g. "From AED 9.5M", or "Sold out". */
  price: string;
  /** Unit count / description, e.g. "251 residences". */
  units: string;
  handover: string;
  /** Payment plan (e.g. "40/60"). Only present for developments currently on sale. */
  paymentPlan?: string;
  blurb: string;
  lat?: number;
  lng?: number;
  image?: string;
  /** Hand-picked set shown on the homepage's default "Featured Projects" tab. */
  featured?: boolean;
}

export const developments: Development[] = [
  { name: "Six Senses Residences Dubai Marina", slug: "six-senses-residences-dubai-marina", location: "Dubai Marina", status: "Off Plan", cats: ["offplan", "branded"], types: "2–4 bedrooms", price: "From AED 9.5M", units: "251 residences", handover: "Handover 2029", paymentPlan: "40/60", blurb: "A monumental milestone in the world of ultra-luxury living, positioned to revolutionise branded residences and dominate the Marina skyline as the tallest residential tower in the world.", lat: 25.089373, lng: 55.150570, image: `${IMG}ssdm-development-featured.jpg`, featured: true },
  { name: "Six Senses Residences The Palm", slug: "six-senses-residences-the-palm", location: "Palm Jumeirah", status: "Completed", cats: ["completed", "branded"], types: "2–5 bedrooms", price: "Sold out", units: "162 residences", handover: "Handed over", blurb: "Six Senses' wellness-led hospitality brought to a beachfront address on Palm Jumeirah.", lat: 25.101997, lng: 55.116437, image: `${IMG}sspalm-development-featured.jpg` },
  { name: "Peninsula Four", slug: "peninsula-four", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms", price: "Sold out", units: "580 residences", handover: "Handed over", blurb: "The fourth release within the Peninsula master waterfront community on the Dubai Water Canal.", lat: 25.184787, lng: 55.268183, image: `${IMG}peninsula-four-featured-wide.jpg`, featured: true },
  { name: "Artistry Residences", slug: "artistry-residences", location: "Dubai Design District", status: "Off Plan", cats: ["offplan"], types: "1–4 bedrooms", price: "From AED 2.3M", units: "462 residences across Artistry One and Artistry Two", handover: "Handover 2029", paymentPlan: "50/50", blurb: "Two residential towers in Dubai Design District, Artistry One and Artistry Two.", lat: 25.190733, lng: 55.304856, image: `${IMG}artistry-development-featured-wide.jpg`, featured: true },
  { name: "The EDGE", slug: "the-edge", location: "Business Bay", status: "Completed", cats: ["completed"], types: "1–2 bedrooms", price: "Sold out", units: "1,030 residences", handover: "Handed over", blurb: "[placeholder]", lat: 25.188870, lng: 55.268318, image: `${IMG}edge-development-featured.jpg` },
  { name: "Peninsula Two", slug: "peninsula-two", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–2 bedrooms", price: "Sold out", units: "439 residences", handover: "Handed over", blurb: "Part of the Peninsula waterfront community in Business Bay. [placeholder]", lat: 25.185761, lng: 55.266446, image: `${IMG}peninsula-two-past-development.jpg` },
  { name: "Peninsula Three", slug: "peninsula-three", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–2 bedrooms", price: "Sold out", units: "853 residences", handover: "Handed over", blurb: "Part of the Peninsula waterfront community in Business Bay. [placeholder]", lat: 25.185597, lng: 55.268552, image: `${IMG}peninsula-three-past-development.jpg` },
  { name: "Jumeirah Living Business Bay", slug: "jumeirah-living-business-bay", location: "Business Bay", status: "Completed", cats: ["completed", "branded"], types: "1–4 bedrooms", price: "Sold out", units: "520 residences", handover: "Handed over", blurb: "Jumeirah Living's first standalone residential address, overlooking the Dubai Water Canal.", lat: 25.183194, lng: 55.265162, image: `${IMG}jlbb-development-featured-wide.jpg` },
  { name: "Studio One", slug: "studio-one", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–2 bedrooms", price: "Sold out", units: "404 residences", handover: "Handed over", blurb: "Compact studio and one-bedroom living on the edge of Dubai Marina.", lat: 25.068726, lng: 55.129009, image: `${IMG}studio-one-past-developments.jpg` },
  { name: "No.9 Residences", slug: "no-9-residences", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "1–3 bedrooms", price: "Sold out", units: "227 residences", handover: "Handed over", blurb: "A slender residential tower fronting the Dubai Marina promenade.", lat: 25.083401, lng: 55.144731, image: `${IMG}no9-past-developments.jpg` },
  { name: "The Residences at Marina Gate", slug: "the-residences-at-marina-gate", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "1–4 bedrooms", price: "Sold out", units: "1,354 residences", handover: "Handed over", blurb: "Three towers forming the gateway to Dubai Marina.", lat: 25.087000, lng: 55.147485, image: `${IMG}marina-gate-1-past-developments.jpg` },
  { name: "Jumeirah Living Marina Gate", slug: "jumeirah-living-marina-gate", location: "Dubai Marina", status: "Branded", cats: ["completed", "branded"], types: "2–4 bedrooms", price: "Sold out", units: "389 residences", handover: "Handed over", blurb: "Serviced branded residences operated by Jumeirah Living at Marina Gate.", lat: 25.087629, lng: 55.146463, image: `${IMG}jlmg-development-featured-wide.jpg` },
  { name: "Nautica", slug: "nautica", location: "Dubai Maritime City", status: "Off Plan", cats: ["offplan"], types: "1–2 bedrooms", price: "Sold out", units: "Two towers, Nautica One and Nautica Two", handover: "Completion 2026", blurb: "Pulsating an Eclectic Nautical Vibe Through its Waterfront Location, Architecture and Design.", lat: 25.263190, lng: 55.269781, image: `${IMG}nautica-past-developments.jpg` },
  { name: "Peninsula One", slug: "peninsula-one", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms", price: "Sold out", units: "70 simplex residences", handover: "Handed over", blurb: "The Gateway to Dubai's Most Spectacular Waterfront Community", lat: 25.184859, lng: 55.266631, image: `${IMG}peninsula-one-past-development.jpg` },
  { name: "Peninsula Five", slug: "peninsula-five", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–4 bedrooms", price: "Sold out", units: "60 duplex residences", handover: "Handed over", blurb: "A Superior and Sophisticated Series of Luxurious Residences.", lat: 25.183553, lng: 55.266428, image: `${IMG}peninsula-five-past-development.jpg` },
  { name: "15 Northside", slug: "15-northside", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–4 bedrooms", price: "Sold out", units: "349 residences", handover: "Handed over", blurb: "Bringing The Select Group Standard To Business Bay", lat: 25.186513, lng: 55.286706, image: `${IMG}15-northside-past-development.jpg` },
  { name: "Residence 110", slug: "residence-110", location: "Business Bay", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms", price: "Sold out", units: "110 residences", handover: "Handed over", blurb: "Luxury Living In The Heart Of Business Bay", lat: 25.177783, lng: 55.269964, image: `${IMG}residence110-past-developments.jpg` },
  { name: "Mushrif Village", slug: "mushrif-village", location: "Mirdif", status: "Completed", cats: ["completed"], types: "2–4 bedroom villas and townhouses", price: "Sold out", units: "122 villas and townhouses", handover: "Handed over", blurb: "A Rare Freehold Ownership Villa Community", lat: 25.231849, lng: 55.441118, image: `${IMG}mushrif-village-past-developments.jpg` },
  { name: "West Avenue", slug: "west-avenue", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms", price: "Sold out", units: "276 residences", handover: "Handed over", blurb: "Stylish & Contemporary Residences in a Prime Location", lat: 25.074265, lng: 55.139040, image: `${IMG}west-avenue-past-developments.jpg` },
  { name: "Bay Central", slug: "bay-central", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms and penthouses", price: "Sold out", units: "747 residences", handover: "Handed over", blurb: "An Exclusive Waterfront Development of 3 Mixed-use Towers", lat: 25.078365, lng: 55.137078, image: `${IMG}bay-central-past-developments.jpg` },
  { name: "The Torch", slug: "the-torch", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "1–3 bedrooms", price: "Sold out", units: "682 residences", handover: "Handed over", blurb: "The World's Tallest Residential Development of its Time", lat: 25.088019, lng: 55.147291, image: `${IMG}torch-past-developments.jpg` },
  { name: "Botanica", slug: "botanica", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–2 bedrooms and penthouses", price: "Sold out", units: "371 residences", handover: "Handed over", blurb: "Dubai's Tropical Paradise Residence", lat: 25.085492, lng: 55.142602, image: `${IMG}botanica-past-developments.jpg` },
  { name: "The Royal Oceanic", slug: "the-royal-oceanic", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–4 bedrooms", price: "Sold out", units: "232 residences", handover: "Handed over", blurb: "Occupying One of the Premier Locations in Dubai Marina", lat: 25.084652, lng: 55.141625, image: `${IMG}royal-oceanic-past-development.jpg` },
  { name: "The Point", slug: "the-point", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–4 bedrooms", price: "Sold out", units: "193 residences", handover: "Handed over", blurb: "A Waterside Development in a Prestigious Location", lat: 25.073346, lng: 55.132547, image: `${IMG}the-point-past-developments.jpg` },
  { name: "Yacht Bay", slug: "yacht-bay", location: "Dubai Marina", status: "Completed", cats: ["completed"], types: "Studio–3 bedrooms", price: "Sold out", units: "175 residences", handover: "Handed over", blurb: "Premium Boating Themed Residences", lat: 25.071562, lng: 55.136853, image: `${IMG}yacht-bay-past-development.jpg` },
  { name: "Pacific", slug: "pacific", location: "Ras Al Khaimah", status: "Completed", cats: ["completed"], types: "Studio–2 bedrooms", price: "Sold out", units: "1,376 residences", handover: "Handed over", blurb: "Breathtaking Island Apartments on Al Marjan Island", lat: 25.687225, lng: 55.733225, image: `${IMG}pacific-past-developments.jpg` },
];

// ---------------------------------------------------------------------------
// 2. Past Developments (homepage scroller, "Delivered across Dubai since 2007")
// source: Select Group Homepage.dc.html ~L3847-3875 (`const JOURNEY = [...]`,
// the same timeline data used by /journey), with the card name-overrides and
// meta-line format taken from the `pastCards` builder at ~L6698-6707.
// Order below is newest-first, matching the homepage scroller and README.
//
// Note on fidelity: the prototype itself is inconsistent in a few places —
// e.g. "Royal Oceanic" here vs "The Royal Oceanic" in `developments` above,
// and "Jumeirah Living" (Business Bay) here is not expanded to its full
// development name the way the dev-index entry is. These are quirks of the
// source file, preserved as found rather than silently reconciled.
// ---------------------------------------------------------------------------

export interface PastDevelopment {
  /** Name as actually rendered on the homepage card (after the prototype's own overrides). */
  name: string;
  /** Raw year/label from source — may be a quarter label like "March" or "Q4" for 2026 entries. */
  year: string;
  /** The 4-digit year used for grouping when `year` is a non-numeric label (era end-year). */
  displayYear: string;
  location: string;
  /** Unit count/description as it appears in JOURNEY, e.g. "175", "60 duplex". */
  units: string;
  /** Computed caption meta line, e.g. "Dubai Marina · 175 units". */
  meta: string;
  /** Building scale descriptor, e.g. "16 floors". */
  scaleLabel?: string;
  /** Gross development value, e.g. "AED 156 M". */
  gdv?: string;
  /** True for the still-upcoming 2026 entries flagged `upcoming: true` in source. */
  upcoming?: boolean;
  image?: string;
}

export const pastDevelopments: PastDevelopment[] = [
  { name: "The EDGE", year: "Q4", displayYear: "2026", location: "Business Bay", units: "1030", meta: "Business Bay · 1030 units", scaleLabel: "2 towers", gdv: "AED 520 MM", image: `${IMG}edge-past-development.jpg` },
  { name: "Peninsula Four", year: "July", displayYear: "2026", location: "Business Bay", units: "16 duplex", meta: "Business Bay · 16 duplex", scaleLabel: "52 floors", gdv: "AED 520 M", upcoming: true, image: `${IMG}peninsula-four-past-development.jpg` },
  { name: "Six Senses Residences, The Palm", year: "May", displayYear: "2026", location: "The Palm", units: "222", meta: "The Palm · 222 units", scaleLabel: "34 floors", gdv: "AED 520 MM", upcoming: true, image: `${IMG}sspalm-past-developments.jpg` },
  { name: "Jumeirah Living", year: "March", displayYear: "2026", location: "Business Bay", units: "82", meta: "Business Bay · 82 units", scaleLabel: "35 floors", gdv: "AED 520 MM", upcoming: true, image: `${IMG}jlbb-past-developments.jpg` },
  { name: "Peninsula Two", year: "2026", displayYear: "2026", location: "Business Bay", units: "439", meta: "Business Bay · 439 units", scaleLabel: "36 floors", gdv: "AED 500 MB", image: `${IMG}peninsula-two-past-development.jpg` },
  { name: "Nautica", year: "2026", displayYear: "2026", location: "Dubai Maritime City", units: "656", meta: "Dubai Maritime City · 656 units", upcoming: true, image: `${IMG}nautica-past-developments.jpg` },
  { name: "Peninsula Three", year: "2025", displayYear: "2025", location: "Business Bay", units: "853", meta: "Business Bay · 853 units", scaleLabel: "53 floors", gdv: "AED 520 M", image: `${IMG}peninsula-three-past-development.jpg` },
  { name: "Peninsula One", year: "2025", displayYear: "2025", location: "Business Bay", units: "70 simplex", meta: "Business Bay · 70 simplex", scaleLabel: "36 floors", gdv: "AED 1.0 B", upcoming: true, image: `${IMG}peninsula-one-past-development.jpg` },
  { name: "Peninsula Five", year: "2024", displayYear: "2024", location: "Business Bay", units: "60 duplex", meta: "Business Bay · 60 duplex", scaleLabel: "36 floors", gdv: "AED 520 MM", image: `${IMG}peninsula-five-past-development.jpg` },
  { name: "15 Northside", year: "2024", displayYear: "2024", location: "Business Bay", units: "349", meta: "Business Bay · 349 units", scaleLabel: "21 floors", gdv: "AED 520 MM", image: `${IMG}15-northside-past-development.jpg` },
  { name: "Jumeirah Living Marina Gate", year: "2020", displayYear: "2020", location: "Dubai Marina", units: "222", meta: "Dubai Marina · 222 units", scaleLabel: "34 floors", gdv: "AED 520 MM", image: `${IMG}jlmg-past-developments.jpg` },
  { name: "Studio One", year: "2019", displayYear: "2019", location: "Dubai Marina", units: "410", meta: "Dubai Marina · 410 units", scaleLabel: "31 floors", gdv: "AED 500 MB", image: `${IMG}studio-one-past-developments.jpg` },
  { name: "Marina Gate II", year: "2019", displayYear: "2019", location: "Dubai Marina", units: "535", meta: "Dubai Marina · 535 units", scaleLabel: "64 floors", gdv: "AED 1.6 B", image: `${IMG}marina-gate-2-past-developments.jpg` },
  { name: "Residence 110", year: "2019", displayYear: "2019", location: "Business Bay", units: "110", meta: "Business Bay · 110 units", image: `${IMG}residence110-past-developments.jpg` },
  { name: "No.9", year: "2018", displayYear: "2018", location: "Dubai Marina", units: "222", meta: "Dubai Marina · 222 units", scaleLabel: "34 floors", gdv: "AED 520 M", image: `${IMG}no9-past-developments.jpg` },
  { name: "Marina Gate 1", year: "2018", displayYear: "2018", location: "Dubai Marina", units: "415", meta: "Dubai Marina · 415 units", scaleLabel: "51 floors", gdv: "AED 1.3 B", image: `${IMG}marina-gate-1-past-developments.jpg` },
  { name: "Mushrif Village", year: "2018", displayYear: "2018", location: "Mirdif", units: "122", meta: "Mirdif · 122 units", image: `${IMG}mushrif-village-past-developments.jpg` },
  { name: "Pacific", year: "2017", displayYear: "2017", location: "Ras Al Khaimah", units: "1,376", meta: "Ras Al Khaimah · 1,376 units", scaleLabel: "6 bldgs", gdv: "AED 1.0 B", image: `${IMG}pacific-past-developments.jpg` },
  { name: "West Avenue", year: "2014", displayYear: "2014", location: "Dubai Marina", units: "276", meta: "Dubai Marina · 276 units", image: `${IMG}west-avenue-past-developments.jpg` },
  { name: "Bay Central I & II", year: "2012", displayYear: "2012", location: "Dubai Marina", units: "747", meta: "Dubai Marina · 747 units", scaleLabel: "39 + 47 fl.", gdv: "AED 1.13 BM", image: `${IMG}bay-central-past-developments.jpg` },
  { name: "The Torch", year: "2011", displayYear: "2011", location: "Dubai Marina", units: "682", meta: "Dubai Marina · 682 units", scaleLabel: "84 floors", gdv: "AED 1.0 B", image: `${IMG}torch-past-developments.jpg` },
  { name: "Botanica", year: "2010", displayYear: "2010", location: "Dubai Marina", units: "371", meta: "Dubai Marina · 371 units", scaleLabel: "41 floors", gdv: "AED 580 MM", image: `${IMG}botanica-past-developments.jpg` },
  { name: "Royal Oceanic", year: "2009", displayYear: "2009", location: "Dubai Marina", units: "232", meta: "Dubai Marina · 232 units", scaleLabel: "31 floors", gdv: "AED 320 M", image: `${IMG}royal-oceanic-past-development.jpg` },
  { name: "The Point", year: "2008", displayYear: "2008", location: "Dubai Marina", units: "193", meta: "Dubai Marina · 193 units", scaleLabel: "27 floors", gdv: "AED 235 M", image: `${IMG}the-point-past-developments.jpg` },
  { name: "Yacht Bay", year: "2007", displayYear: "2007", location: "Dubai Marina", units: "175", meta: "Dubai Marina · 175 units", scaleLabel: "16 floors", gdv: "AED 156 M", image: `${IMG}yacht-bay-past-development.jpg` },
];

/** The four-stat strip below the Past Developments scroller.
 * source: Select Group Homepage.dc.html ~L6711-6716 (`pastStats`) */
export interface PastDevelopmentsStat {
  value: string;
  label: string;
}

export const pastDevelopmentsStats: PastDevelopmentsStat[] = [
  { value: "25", label: "Developments delivered or under delivery" },
  { value: "8,701", label: "Homes across the completed portfolio" },
  { value: "24.7M", label: "Sq.ft. of residential, retail and mixed-use space" },
  { value: "2007", label: "First tower handed over in Dubai Marina" },
];

// ---------------------------------------------------------------------------
// 3. Hero slides
// Slide 1 (brand slide): Select Group Homepage.dc.html ~L261-278 (hard-coded, not an array).
// Slides 2-3 (featured developments): ~L6542-6544 (`heroSlides` array).
// ---------------------------------------------------------------------------

export interface HeroSlide {
  /** undefined for the brand slide, which is not keyed to a development. */
  name?: string;
  eyebrow?: string;
  title: string;
  body: string;
  image?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    // Brand slide — verbatim lockup + H1 + body, hard-coded (not array-driven) in source.
    title: "For those who select differently",
    body: "Select Group creates premium vertical communities in carefully selected waterfront and prime urban locations—defined by generous residences, exceptional amenities and enduring value.",
    image: `${IMG}select-group-hp-hero.jpg`,
  },
  {
    name: "Six Senses Residences Dubai Marina",
    eyebrow: "Dubai Marina",
    title: "Six Senses Residences Dubai Marina",
    body: "A monumental milestone in the world of ultra-luxury living, positioned to revolutionise branded residences and dominate the Marina skyline as the tallest residential tower in the world.",
    image: `${IMG}six-senses-marina-hp-hero.jpg`,
  },
  {
    name: "Artistry Residences",
    eyebrow: "Dubai Design District",
    title: "Artistry Residences",
    body: "Two residential towers in Dubai Design District. Artistry One and Artistry Two Residences unite creative energy with refined residential calm, framing Downtown Dubai and the Burj Khalifa.",
    image: `${IMG}artistry-residences-hp-hero.jpg`,
  },
];

// ---------------------------------------------------------------------------
// 4. What We Do — the four verticals
// source: Select Group Homepage.dc.html ~L4731-4736 (`const verticals = [...]`)
// Section intro copy (eyebrow/H2/body), ~L453-456, included as a comment below
// since it is section-level copy rather than per-tile.
// Section eyebrow: "What We Do"; H2: "Four Verticals, One Standard"; intro body:
// "Select Group invests and develops across residential, hospitality, retail and
// strategic verticals in the Middle East, the United Kingdom and Europe,
// supported by a global team of over 750 people."
// ---------------------------------------------------------------------------

export interface Vertical {
  /** Tile title exactly as it appears in source (the residential tile is
   * literally titled "Developments", not "Residential" — kept verbatim). */
  title: string;
  /** Investments-vertical route key the tile links to. */
  invPage: "residential" | "hospitality" | "retail" | "strategic";
  body: string;
  image?: string;
}

export const verticals: Vertical[] = [
  { title: "Developments", invPage: "residential", body: "Premium residential towers and master communities, from Dubai Marina to Dubai Design District.", image: `${IMG}what-we-do-developments.jpg` },
  { title: "Hospitality", invPage: "hospitality", body: "Hotels, resorts and branded residences developed and held across the Middle East, the United Kingdom and Europe.", image: `${IMG}what-we-do-hospitality.jpg` },
  { title: "Retail & Commercial", invPage: "retail", body: "Retail podiums, offices and mixed-use floorplates that anchor the communities around them.", image: `${IMG}what-we-do-retail-commercial.jpg` },
  { title: "Strategic Investments", invPage: "strategic", body: "Fitness, wellness, technology and asset management ventures held alongside the property portfolio.", image: `${IMG}what-we-do-strategic-investment.jpg` },
];

// ---------------------------------------------------------------------------
// 5. Branded Developments carousel
// source: Select Group Homepage.dc.html ~L4834-4843 (`const branded = [...]`)
// ---------------------------------------------------------------------------

export interface BrandedCarouselSlide {
  partner: "Six Senses" | "Jumeirah";
  name: string;
  eyebrow: string;
  body: string;
  image?: string;
  /** White-knockout partner logo mark for the dark overlay badge — expects a light/transparent background. */
  logo?: string;
  /** Natural logo aspect ratio (width / height), so the badge sizes it without distortion. */
  logoAspect?: number;
}

export const brandedCarousel: BrandedCarouselSlide[] = [
  { partner: "Six Senses", name: "Six Senses Residences Dubai Marina", eyebrow: "Six Senses' First-Ever Standalone Branded Residential Development", body: "A monumental milestone in the world of ultra-luxury living, positioned to revolutionise branded residences and dominate the Marina skyline as the tallest residential tower in the world.", image: `${IMG}ssdm-branded-residence.jpg`, logo: `${IMG}ssr-white-logo.png`, logoAspect: 600 / 343 },
  { partner: "Jumeirah", name: "Jumeirah Living Business Bay", eyebrow: "Immersive Luxury In An Idyllic Waterfront Location", body: "Designed to be admired as a prominent highlight of the Downtown Dubai skyline, the 35-storey tower features 82 spacious residences with curated branded amenities and services.", image: `${IMG}jlbb-branded-residence.jpg`, logo: `${IMG}Jumeirah_Logo_whitesvg.svg`, logoAspect: 566.94 / 108.54 },
  { partner: "Six Senses", name: "Six Senses Residences The Palm", eyebrow: "Wellness Living On The Palm Jumeirah", body: "A wellness-led beachfront address on the Palm Jumeirah, developed with Six Senses and shaped around the brand's own standards of restoration and care.", image: `${IMG}six-senses-palm-branded-residence.jpg`, logo: `${IMG}ssr-white-logo.png`, logoAspect: 600 / 343 },
  { partner: "Jumeirah", name: "Jumeirah Living Marina Gate", eyebrow: "Branded Waterfront Living In Dubai Marina", body: "Occupying a landmark position at the entrance to Dubai Marina, Jumeirah Living Marina Gate brings the hospitality standards of Jumeirah to a residential address, with serviced amenities and full marina frontage.", image: `${IMG}jlmg-branded-residence.jpg`, logo: `${IMG}Jumeirah_Logo_whitesvg.svg`, logoAspect: 566.94 / 108.54 },
];

// ---------------------------------------------------------------------------
// 6. The Select Difference — principles
// source: Select Group Homepage.dc.html ~L6630-6640 (`principles: [...]`)
// Section intro: eyebrow "The Select Difference"; H2 "A more considered way to
// live"; body "A Select home is shaped by four principles: a carefully chosen
// location, generous living space, complete vertical-community planning and
// hospitality-led service where relevant." (~L518-520)
// ---------------------------------------------------------------------------

export interface Principle {
  num: string;
  title: string;
  body: string;
  image?: string;
}

export const principles: Principle[] = [
  { num: "01", title: "Prime Waterfront Locations", body: "Waterfront and prime urban sites chosen for connectivity, lifestyle relevance and long-term potential.", image: `${IMG}select-difference-waterfront.jpg` },
  { num: "02", title: "Building Design", body: "Apartments, duplexes and penthouses designed with expansive proportions, practical layouts and considered views.", image: `${IMG}select-difference-design.jpg` },
  { num: "03", title: "Wellness & Amenities", body: "Fitness, wellness, work, family and social amenities integrated into the architecture from the outset—not added later.", image: `${IMG}select-difference-wellness.jpg` },
  { num: "04", title: "Hospitality-led Living", body: "Branded residences where celebrated service philosophies become part of the everyday residential experience.", image: `${IMG}select-difference-hospitality-led.jpg` },
];

// ---------------------------------------------------------------------------
// 7. Testimonials
// source: Select Group Homepage.dc.html ~L4879-4883 (`const quotes = [...]`);
// aggregate rating line ~L542.
// Note: all three `meta` lines end in "[placeholder]" in the source itself —
// kept verbatim rather than removed, since the brief is to quote, not clean up.
// ---------------------------------------------------------------------------

export interface Testimonial {
  text: string;
  name: string;
  meta: string;
}

export const testimonials: Testimonial[] = [
  { text: "The handover was the first time a property purchase has ever felt calm. Everything we were shown two years earlier is exactly what we walked into.", name: "A. Haddad", meta: "Dubai · Jumeirah Living Business Bay · [placeholder]" },
  { text: "We bought off-plan from London without seeing the site. The reporting was so consistent that the distance stopped mattering.", name: "R. Whitfield", meta: "London · Six Senses Residences Dubai Marina · [placeholder]" },
  { text: "This is our third purchase with the group. The finish quality has gone up each time, which is not something I can say about anyone else here.", name: "S. Iyer", meta: "Dubai · Peninsula Four, The Plaza · [placeholder]" },
];

/** Verbatim aggregate rating line rendered beside the star rating. */
export const testimonialsRatingLine = "4.5 — 258 Google reviews";

// ---------------------------------------------------------------------------
// 8. Awards
// source: Select Group Homepage.dc.html ~L3876-3891 (`const AWARDS = [...]`).
// The homepage itself only shows the first 5 (`AWARDS.slice(0, 5)`, ~L4858);
// the full list of 14 (used by the dedicated /awards route) is captured here,
// in source order. `body` here is the awarding organisation, not a separate
// description — no longer description text exists anywhere in the source.
// Only the first two have a supplied photo so far — a known gap ("award
// photography for some awards") the handoff itself flags.
// ---------------------------------------------------------------------------

export interface Award {
  name: string;
  /** Roman-numeral suffix, I-XIV, in source order (newest first). */
  roman: string;
  year: string;
  /** Awarding body/organisation. */
  body: string;
  image?: string;
}

export const awards: Award[] = [
  { name: "Branded Residences of the Year", roman: "I", year: "2026", body: "CW Property Awards", image: `${IMG}awards-cwproperty-branded-residence.jpg` },
  { name: "Lifestyle Innovator of the Year", roman: "II", year: "2026", body: "CW Property Awards", image: `${IMG}awards-cwproperty-lifestyle-innovator.jpg` },
  { name: "Best Luxury Waterfront Development", roman: "III", year: "2026", body: "Luxury Lifestyle Awards" },
  { name: "Best Luxury High-Rise Living", roman: "IV", year: "2025", body: "Luxury Lifestyle Awards" },
  { name: "Waterfront Development of the Year", roman: "V", year: "2025", body: "UAE Realty Awards" },
  { name: "Best Residential Developer of the Year", roman: "VI", year: "2024", body: "Construction Innovation Awards" },
  { name: "Best Residential Development", roman: "VII", year: "2023", body: "Arabian Property Awards Development" },
  { name: "Residential High-Rise Development Dubai", roman: "VIII", year: "2023", body: "Arabian Property Awards Development" },
  { name: "Best Luxury Developer Dubai", roman: "IX", year: "2021", body: "Luxury Lifestyle Awards" },
  { name: "Best Residential High-Rise Development", roman: "X", year: "2019", body: "Arabian Property Awards" },
  { name: "Best Residential High-Rise Development", roman: "XI", year: "2018", body: "International Property Awards Dubai Development" },
  { name: "Best Condominium Dubai", roman: "XII", year: "2018", body: "International Property Awards Dubai Development" },
  { name: "Residential Project of the Year", roman: "XIII", year: "2016", body: "Construction Innovation Awards ME 2016" },
  { name: "Top Real Estate Company", roman: "XIV", year: "2016", body: "Forbes Middle East" },
];

/** Dark field background for the Awards homepage section. */
export const awardsBackgroundImage = `${IMG}awards-bg.jpg`;

/** Dark field background for the Statistics homepage section. */
export const statisticsBackgroundImage = `${IMG}statistics-scroller-hp.jpg`;

// ---------------------------------------------------------------------------
// 9. Press coverage (third-party press mentions — NOT used by the homepage's
// "Latest News" section, which pulls from ./insights.ts instead; see that
// file's header for why). Reserved as seed data for the future /media
// ("Press") page.
// Lead story: Select Group Homepage.dc.html ~L664-675 (hard-coded in the
// template, not array-driven). Grid cards: ~L4868-4877 (`const news = [...]`).
// ---------------------------------------------------------------------------

export interface NewsLeadStory {
  outlet: string;
  date: string;
  headline: string;
  body: string;
}

export const newsLeadStory: NewsLeadStory = {
  outlet: "ZAWYA",
  date: "May 20, 2026",
  headline: "Dubai's Select Group acquires 3 UK Delta Hotels by Marriott Golf Resorts",
  body: "The acquisition extends the group's hospitality vertical across the United Kingdom, adding three golf resort properties operated under the Delta Hotels by Marriott brand to a portfolio that already spans the Middle East and Europe.",
};

export interface NewsCard {
  /** Raw combined meta string as in source, e.g. "La Repubblica · April 6, 2026". */
  meta: string;
  title: string;
  excerpt: string;
}

export const news: NewsCard[] = [
  { meta: "La Repubblica · April 6, 2026", title: "Dubai, skyscrapers of fear and resistance", excerpt: "An Italian broadsheet examines the ambition behind the city's tallest residential towers." },
  { meta: "Boutique Hotelier · December 11, 2025", title: "Dubai developer to redevelop Hampshire estate into Accor brand", excerpt: "The group's UK hospitality holdings expand with a country estate conversion." },
  { meta: "Select Group · Newsroom", title: "Artistry Two Residences tops out in Dubai Design District", excerpt: "Structural completion reached ahead of the Q4 2028 handover programme. [placeholder]" },
  { meta: "Select Group · Newsroom", title: "Six Senses Residences The Palm enters fit-out", excerpt: "Interior fit-out begins across the beachfront residences. [placeholder]" },
];
