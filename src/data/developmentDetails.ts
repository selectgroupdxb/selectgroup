/**
 * Rich per-development content for the project template (`/developments/[slug]`).
 *
 * Extracted verbatim from the newer, authoritative prototype supplied directly
 * by the project owner: `Desktop/Select Group Website/10NovSelect Group
 * Homepage (standalone).html` (dated Nov 10 — supersedes the earlier Nov 5
 * design-handoff bundle's separate per-development prototype files, which
 * produced a different, now-retired page layout). That file drives every
 * project page off a single shared template plus a `PROJECT_CONTENT` lookup
 * keyed by development name; Six Senses Residences Dubai Marina is still the
 * only development with a fully populated, signed-off content override —
 * every other development falls back to placeholder copy in the prototype,
 * so only this one entry is populated here.
 *
 * Image fields are left `undefined` where the prototype references an asset
 * (noted in the trailing comment) that does not yet exist in
 * `public/images/homepage/` — the prototype's own asset references resolve
 * against its design tool's hosting, not anything exported into this repo.
 * `ImagePlaceholder` renders a labelled placeholder until the real files are
 * supplied, rather than guessing or reusing an unrelated photo.
 */

const IMG = "/images/homepage/";

export type TwoColBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  alt?: string;
};

export type KeyFact = { label: string; value: string };

export type AmenityItem = { label: string; level: string };

export type ExperiencePillar = { num: string; title: string; body: string };

export type AreaStat = { value: string; label: string };

export type ProximityPlace = { place: string; time: string; dist: string };

export type ConstructionMilestone = {
  label: string;
  status: "Complete" | "In progress" | "Not started";
  pct: number;
};

export type GalleryCategory = "exterior" | "residences" | "amenities" | "views";

export type GalleryItem = {
  image?: string;
  category: GalleryCategory;
  caption: string;
};

export type ProjectFAQItem = {
  question: string;
  answer: string;
  bullets?: string[];
};

export interface DevelopmentDetail {
  hero: {
    image?: string;
    heroSub: string;
    logo?: string;
    brandName?: string;
    brandSub?: string;
    price: string;
    priceLabel: string;
    priceNote: string;
    introEyebrow: string;
    introBody: string;
  };
  keyFacts: KeyFact[];
  theTower: TwoColBlock;
  theResidences: TwoColBlock;
  amenitiesIntro: { title: string; body: string };
  amenities: AmenityItem[];
  /** Only shown for branded-residence developments (`cats.includes("branded")`). */
  experience?: {
    image?: string;
    eyebrow: string;
    title: string;
    body: string;
    pillars: ExperiencePillar[];
  };
  neighbourhood: {
    title: string;
    paragraphs: string[];
    stats: AreaStat[];
    image?: string;
  };
  location: {
    proximity: ProximityPlace[];
    mapNote: string;
  };
  /** Only shown while the development is not yet handed over (`status !== "Completed"`). */
  constructionProgress?: {
    updated: string;
    handover: string;
    pct: number;
    milestones: ConstructionMilestone[];
  };
  enquireImage?: string;
  gallery: GalleryItem[];
  faq: ProjectFAQItem[];
}

export const developmentDetails: Record<string, DevelopmentDetail> = {
  "six-senses-residences-dubai-marina": {
    hero: {
      image: `${IMG}ssdm-development-featured.jpg`, // prototype ref: hp-hero-ssdm.avif — not yet supplied, reusing the real photo already in the repo
      heroSub: "Dubai Marina · The tallest residential tower in the world",
      brandName: "Six Senses",
      brandSub: "RESIDENCES",
      price: "AED 5.8M",
      priceLabel: "Starting From",
      priceNote: "2, 3, 4 & 5 bed · Residences, penthouse & sky villas",
      introEyebrow: "The tallest residential tower in the world",
      introBody:
        "A monumental milestone in the world of ultra-luxury living, Six Senses Residences Dubai Marina is positioned to revolutionise branded residences and dominate the Marina skyline as the tallest residential tower in the world. Residents hold membership of the Six Senses Place club, with wellness, dining and social programming operated by the brand.",
    },
    keyFacts: [
      { label: "Starting From", value: "AED 5.8M" },
      { label: "Height", value: "122 Storeys" },
      { label: "Payment Plan", value: "40/60" },
      { label: "Handover", value: "Q2 2029" },
      { label: "Unit Mix", value: "2–5 Bed" },
    ],
    theTower: {
      eyebrow: "The Tower",
      title: "A Landmark On The Marina",
      image: undefined, // prototype ref: ssdm-tower-night.avif — not yet supplied
      paragraphs: [
        "At 122 storeys and rising approximately 517 metres above Dubai Marina, Six Senses Residences Dubai Marina is designed to become a defining presence on the city's skyline. The tower takes a deliberately slender and elegant approach.",
        "Its form is shaped as much by its setting as by its scale. The tower's dual-aspect orientation opens views north towards Palm Jumeirah and the Arabian Gulf, and south towards Emirates Golf Club and Emirates Hills.",
      ],
    },
    theResidences: {
      eyebrow: "The Residences",
      title: "Luxury Designed Around Wellness",
      image: undefined, // prototype ref: ssdm-residences-gym.avif — not yet supplied
      alt: "Wellness and fitness level, Six Senses Residences Dubai Marina",
      paragraphs: [
        "Six Senses Residences Dubai Marina brings a new perspective to luxury living in Dubai. The residences combine Select Group's commitment to quality and thoughtful design with the Six Senses approach to wellness.",
        "From natural materials and generous living spaces to expansive views and private outdoor areas, every residence is designed to feel considered and connected to its surroundings. The Six Senses philosophy extends beyond the interiors, with wellness woven into the experience through biophilic design, restorative spaces and Sleep With Six Senses standards.",
      ],
    },
    amenitiesIntro: {
      title: "Operated By Six Senses",
      body: "At Six Senses Residences Dubai Marina, wellness is woven into everyday life. Across four dedicated levels, residents have access to a considered collection of wellness, fitness, leisure and social spaces, brought to life through the Six Senses approach to hospitality and wellbeing.",
    },
    // Podium-level items render first in the template regardless of source order, then Level 60 items.
    amenities: [
      { label: "Longevity & Diagnostics Clinic", level: "Podium" },
      { label: "Padel & Multi-Sport Court", level: "Podium" },
      { label: "Cinema & Screening Lounge", level: "Podium" },
      { label: "Residents' Library & Co-Working", level: "Podium" },
      { label: "Children's Club & Creche", level: "Podium" },
      { label: "Private Dining & Chef's Table", level: "Podium" },
      { label: "Six Senses Place Club Membership", level: "Level 60" },
      { label: "Signature Six Senses Spa", level: "Level 60" },
      { label: "Alchemy Bar & Wellness Kitchen", level: "Level 60" },
      { label: "Sky Infinity Pool", level: "Level 60" },
    ],
    experience: {
      image: undefined, // prototype ref: ssdm-experience-spa.avif — not yet supplied
      eyebrow: "The Six Senses Experience",
      title: "Wellness As An Operating Standard",
      body: "Six Senses operates the building, not just the brand on it. Residents hold membership of the Six Senses Place club, and the wellness, dining and social programming continues for the life of the tower rather than ending at handover.",
      pillars: [
        {
          num: "01",
          title: "Six Senses Place Membership",
          body: "Every residence carries membership of the Six Senses Place club, giving access to the wellness, work and social spaces across four dedicated levels.",
        },
        {
          num: "02",
          title: "Sleep With Six Senses",
          body: "Bedrooms are specified to the operator's sleep programme, from mattress and linen selection to lighting, acoustics and air quality.",
        },
        {
          num: "03",
          title: "Longevity And Diagnostics",
          body: "A clinic at podium level provides diagnostics, screening and longevity programmes, with practitioners engaged through Six Senses.",
        },
        {
          num: "04",
          title: "Service Beyond Handover",
          body: "Housekeeping, wellness and dining are run under Six Senses operating standards for the life of the building, not for the first year of ownership.",
        },
      ],
    },
    neighbourhood: {
      title: "Dubai Marina",
      image: undefined, // prototype ref: ssdm-area-marina.avif — not yet supplied
      paragraphs: [
        "Six Senses Residences Dubai Marina brings a new perspective to luxury waterfront living in one of Dubai's most established districts. Dubai Marina is a three-kilometre canal lined with towers, promenade retail and moorings, bounded by Jumeirah Beach Residence and the beach on one side and Sheikh Zayed Road on the other. The district is walkable in a way little of Dubai is, and the tower sits at its northern gateway.",
        "Select Group has developed nine towers in the district since 2005, including Marina Gate, No.9 and Studio One, giving the group an unusually long view of how Dubai Marina lives, lets and resells. That experience, combined with the Six Senses approach to wellness and hospitality, brings a considered new dimension to life on the Marina.",
      ],
      stats: [
        { value: "3 km", label: "Marina promenade" },
        { value: "09", label: "Select Group towers in the district" },
        { value: "2005", label: "First delivery in Dubai Marina" },
      ],
    },
    location: {
      // Already distance-sorted in the source.
      proximity: [
        { place: "Dubai Marina Mall", time: "4 min", dist: "1.6 km" },
        { place: "JBR and The Beach", time: "7 min", dist: "2.9 km" },
        { place: "Palm Jumeirah", time: "12 min", dist: "6.4 km" },
        { place: "Dubai Internet City Metro", time: "9 min", dist: "4.1 km" },
        { place: "DIFC and Downtown Dubai", time: "24 min", dist: "27 km" },
        { place: "Al Maktoum International", time: "32 min", dist: "38 km" },
      ],
      // Verbatim from source — the real map artwork has not been supplied yet.
      mapNote: "Dubai Marina map with the tower pinned and key destinations plotted. Map artwork pending from the design team.",
    },
    constructionProgress: {
      updated: "31 March 2026",
      handover: "2029",
      // Source has a genuine inconsistency: the progress bar value is 30% but the
      // FAQ answer (below) says 29%. Using 29% here to match the more specific,
      // customer-facing FAQ copy — flag to the design team to reconcile.
      pct: 29,
      milestones: [
        { label: "Enabling works and piling", status: "In progress", pct: 74 },
        { label: "Substructure", status: "In progress", pct: 52 },
        { label: "Superstructure", status: "In progress", pct: 30 },
        { label: "Facade installation", status: "In progress", pct: 14 },
        { label: "MEP first fix", status: "In progress", pct: 9 },
        { label: "Interior fit-out", status: "In progress", pct: 3 },
      ],
    },
    enquireImage: `${IMG}six-senses-marina-hp-hero.jpg`, // prototype ref: six-senses-marina.jpg
    gallery: [
      { image: undefined, category: "exterior", caption: "The tower from the north, looking across Palm Jumeirah" }, // prototype ref: hp-hero-ssdm.avif
      { image: undefined, category: "exterior", caption: "Dubai Marina at dusk, the tower at the northern gateway" }, // prototype ref: ssdm-tower-night.avif
      { image: undefined, category: "exterior", caption: "Upper levels above early morning cloud" }, // prototype ref: hp-awards-bg.avif
      { image: `${IMG}six-senses-marina-hp-hero.jpg`, category: "exterior", caption: "Approach from the marina promenade" },
      { image: undefined, category: "residences", caption: "Living space with dual-aspect glazing" }, // prototype ref: hp-branded-ssdm.avif
      { image: undefined, category: "amenities", caption: "Fitness and movement studio · Level 60" }, // prototype ref: ssdm-residences-gym.avif
    ],
    faq: [
      {
        question: "When is the development scheduled to be delivered?",
        answer: "Six Senses Residences Dubai Marina is at 29% completion and is scheduled for handover in 2029.",
      },
      {
        question: "What is the payment plan?",
        answer: "The payment plan is 40/60",
        bullets: [
          "AED 100k upon reservation",
          "Balance of 20% registration within 14 days of reservation",
          "20% within 6 months of reservation",
          "60% upon completion",
        ],
      },
      {
        question: "What is the estimated service charge for this development?",
        answer: "The estimated service charge is approximately AED 34 - AED 38 per sq.ft.",
      },
    ],
  },
};
