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
 * Real per-development photography (supplied directly by the project owner,
 * not from the prototype) lives under `public/images/developments/<Name>/`
 * — see `SSDM_IMG` below. Fields still pointing at a prototype-ref filename
 * under `public/images/homepage/` (e.g. `ssdm-experience-spa.avif`) haven't
 * been supplied yet; `ImagePlaceholder` renders a labelled placeholder until
 * they land, with no further code change needed once they do. The
 * construction-progress quarter photos and location map are a deliberate
 * exception, left `undefined`: the prototype itself reuses unrelated stock/
 * homepage imagery for those, so there's no real filename to point at yet.
 */

const IMG = "/images/homepage/";
const SSDM_IMG = "/images/developments/Six Senses Dubai Marina/";
const ART_IMG = "/images/developments/Artistry Residences/";
const DEV_IMG = "/images/developments/";

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

export type ConstructionShot = { image?: string; caption: string };
export type ConstructionQuarter = { period: string; shots: ConstructionShot[] };

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

export type Tower = { name: string; image?: string; facts: { k: string; v: string }[] };

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
  /** Omitted for "minimal" pages (no Key Facts / dark band straight after The Tower). */
  keyFacts?: KeyFact[];
  theTower: TwoColBlock;
  /** Only shown for multi-tower developments (e.g. Artistry One/Two combined into one listing). */
  twoTowers?: { intro: string; towers: Tower[] };
  theResidences: TwoColBlock;
  /** Omitted together — "minimal" pages (Tower/Residences/Neighbourhood/Location/Select Difference only) have no real amenity data. */
  amenitiesIntro?: { title: string; body: string };
  amenities?: AmenityItem[];
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
    stats?: AreaStat[];
    image?: string;
  };
  /** Only shown for Dubai Design District developments (e.g. Artistry). */
  fiveDistricts?: { name: string; image?: string }[];
  /** Omitted where the source has no real proximity/map data yet. */
  location?: {
    proximity: ProximityPlace[];
    mapNote: string;
  };
  /** Only shown while the development is not yet handed over (`status !== "Completed"`). */
  constructionProgress?: {
    updated: string;
    handover: string;
    pct: number;
    milestones: ConstructionMilestone[];
    quarters: ConstructionQuarter[];
  };
  enquireImage?: string;
  /**
   * Set for developments built with only The Tower / The Residences /
   * Neighbourhood / Location & Connectivity / The Select Difference — no
   * Enquiry form, sticky bar, or FAQ (there's no real content for them yet).
   */
  minimal?: boolean;
  /** Omitted where the source has no real gallery photos yet (just a single placeholder item). */
  gallery?: GalleryItem[];
  /** Omitted where the source's FAQ answers are all placeholder text. */
  faq?: ProjectFAQItem[];
}

/**
 * Builds a "minimal" page (The Tower / The Residences / Neighbourhood /
 * Location & Connectivity / The Select Difference only — no Key Facts,
 * Amenities, Enquiry form, sticky bar, or FAQ) for developments that have a
 * real hero photo but no rich prototype copy. Every string here is derived
 * from the development's own already-real fields (its existing card blurb,
 * unit types, location) or is a plain factual one-liner about the district
 * — nothing is invented. This doubles as the auto-population logic noted
 * for the future CMS: feed it a development + its hero photo and it
 * produces a complete, honest page with no manual content entry required.
 */
function minimalDetail(opts: {
  heroImage: string;
  location: string;
  types: string;
  units: string;
  price: string;
  blurb: string;
  neighbourhoodParagraph: string;
}): DevelopmentDetail {
  const hasPrice = /\d/.test(opts.price);
  return {
    hero: {
      image: opts.heroImage,
      heroSub: `${opts.location} · ${opts.types}`,
      price: hasPrice ? opts.price.replace(/^From\s+/i, "") : opts.price,
      priceLabel: hasPrice ? "Starting From" : "Status",
      priceNote: opts.units,
      introEyebrow: opts.location,
      introBody: opts.blurb,
    },
    theTower: {
      eyebrow: "The Tower",
      title: opts.blurb,
      paragraphs: [`Comprising ${opts.units}, with ${opts.types.toLowerCase()}, in ${opts.location}.`],
    },
    theResidences: {
      eyebrow: "The Residences",
      title: opts.types,
      paragraphs: [`${opts.units}, with ${opts.types.toLowerCase()}.`],
    },
    neighbourhood: {
      title: opts.location,
      paragraphs: [opts.neighbourhoodParagraph],
    },
    location: {
      proximity: [],
      mapNote: "Map artwork pending.",
    },
    minimal: true,
  };
}

const MARINA_BLURB =
  "Dubai Marina is a three-kilometre waterfront canal district in Dubai, lined with residential towers, marina berths and promenade retail.";
const BUSINESS_BAY_BLURB = "Business Bay is a central Dubai business and residential district along the Dubai Water Canal.";

export const developmentDetails: Record<string, DevelopmentDetail> = {
  "six-senses-residences-dubai-marina": {
    hero: {
      image: `${SSDM_IMG}six-senses-marina-development-hero.jpg`,
      heroSub: "Dubai Marina · The tallest residential tower in the world",
      logo: `${SSDM_IMG}ssdm-logo-white.svg`,
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
      image: `${SSDM_IMG}six-senses-landmark-on-the-marina.jpg`,
      paragraphs: [
        "At 122 storeys and rising approximately 517 metres above Dubai Marina, Six Senses Residences Dubai Marina is designed to become a defining presence on the city's skyline. The tower takes a deliberately slender and elegant approach.",
        "Its form is shaped as much by its setting as by its scale. The tower's dual-aspect orientation opens views north towards Palm Jumeirah and the Arabian Gulf, and south towards Emirates Golf Club and Emirates Hills.",
      ],
    },
    theResidences: {
      eyebrow: "The Residences",
      title: "Luxury Designed Around Wellness",
      image: `${SSDM_IMG}ssdm-luxury-designed-around-wellness.jpg`,
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
      image: `${SSDM_IMG}six-senses-experience.jpg`,
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
      image: `${SSDM_IMG}neighbourhood-dubai-marina.jpg`,
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
      // Verbatim from the prototype's PROG_SHOTS. Captions are real; most of
      // the referenced image filenames (hpgrid-7.jpg, area-dm.jpg, jlbb.jpg,
      // cta-bg.jpg, principle-generous.jpg) are reused stock/homepage assets
      // in the prototype itself, not real site photography, and aren't in
      // this repo — left unset so they render as labelled placeholders.
      quarters: [
        {
          period: "Q1 2026",
          shots: [
            { image: `${IMG}six-senses-marina-hp-hero.jpg`, caption: "Tower rising above podium level" },
            { image: undefined, caption: "Core slipform at level 42" },
            { image: undefined, caption: "Marina frontage, looking north" },
          ],
        },
        {
          period: "Q4 2025",
          shots: [
            { image: undefined, caption: "Structure topping out the podium" },
            { image: undefined, caption: "Site logistics and tower cranes" },
            { image: undefined, caption: "First facade mock-up panel" },
          ],
        },
        {
          period: "Q3 2025",
          shots: [
            { image: undefined, caption: "Substructure complete" },
            { image: undefined, caption: "Raft pour, north sector" },
            { image: undefined, caption: "Basement retaining walls" },
          ],
        },
        {
          period: "Q2 2025",
          shots: [
            { image: undefined, caption: "Excavation and shoring" },
            { image: undefined, caption: "Piling rigs on site" },
            { image: undefined, caption: "Site hoarding and access road" },
          ],
        },
      ],
    },
    enquireImage: `${IMG}six-senses-marina-hp-hero.jpg`, // prototype ref: six-senses-marina.jpg
    gallery: [
      { image: `${SSDM_IMG}ssdm-gallery-exterior-1.jpg`, category: "exterior", caption: "Tower exterior" },
      { image: `${SSDM_IMG}ssdm-gallery-exterior-2.jpg`, category: "exterior", caption: "Tower exterior, marina frontage" },
      { image: `${SSDM_IMG}ssdm-gallery-interior-1.jpg`, category: "residences", caption: "Residence interior 1" },
      { image: `${SSDM_IMG}ssdm-gallery-interior-2.jpg`, category: "residences", caption: "Residence interior 2" },
      { image: `${SSDM_IMG}ssdm-gallery-interior-3.jpg`, category: "residences", caption: "Residence interior 3" },
      { image: `${SSDM_IMG}ssdm-gallery-interior-4.jpg`, category: "residences", caption: "Residence interior 4" },
      { image: `${SSDM_IMG}ssdm-gallery-interior-5.jpg`, category: "residences", caption: "Residence interior 5" },
      { image: `${SSDM_IMG}ssdm-gallery-109-pool.jpg`, category: "amenities", caption: "Level 109 pool" },
      { image: `${SSDM_IMG}ssdm-gallery-pool-deck.jpg`, category: "amenities", caption: "Pool deck" },
      { image: `${SSDM_IMG}ssdm-gallery-common-room.jpg`, category: "amenities", caption: "Common room" },
      { image: `${SSDM_IMG}ssdm-gallery-entertainment.jpg`, category: "amenities", caption: "Entertainment room" },
      { image: `${SSDM_IMG}ssdm-gallery-gameroom.jpg`, category: "amenities", caption: "Game room" },
      { image: `${SSDM_IMG}ssdm-gallery-meeting-room.jpg`, category: "amenities", caption: "Meeting room" },
      { image: `${SSDM_IMG}ssdm-gallery-outdoor-cinema.jpg`, category: "amenities", caption: "Outdoor cinema" },
      { image: `${SSDM_IMG}ssdm-gallery-pilates.jpg`, category: "amenities", caption: "Pilates studio" },
      { image: `${SSDM_IMG}ssdm-gallery-plunge-room.jpg`, category: "amenities", caption: "Plunge room" },
      { image: `${SSDM_IMG}ssdm-gallery-outdoor.jpg`, category: "views", caption: "Outdoor space" },
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
  /**
   * The prototype only overrides Artistry Residences' hero image — everything
   * else falls back to its generic per-project template, which in turn has
   * Artistry-specific real copy hardcoded into several of its branches (the
   * tower/residences paragraphs, the amenities list and its title, the "Two
   * Towers" section, and the district paragraph), matched by name regex
   * rather than a named override. That real content is extracted here;
   * sections where even the generic fallback is pure `[placeholder]` text
   * (Location & Connectivity, Construction Progress, FAQ, Gallery, Five
   * Districts) are omitted rather than shipped with invented copy.
   */
  "artistry-residences": {
    hero: {
      image: `${ART_IMG}artistry-development-hero.jpg`,
      heroSub: "Dubai Design District",
      logo: `${ART_IMG}Artistry Logo_Generic WHT.png`,
      price: "AED 2.3M",
      priceLabel: "Starting From",
      priceNote: "1–4 bed · 462 residences across Artistry One and Artistry Two",
      introEyebrow: "Dubai Design District",
      introBody: "Two residential towers in Dubai Design District, Artistry One and Artistry Two.",
    },
    keyFacts: [
      { label: "Starting From", value: "AED 2.3M" },
      { label: "Payment Plan", value: "50/50" },
      { label: "Handover", value: "2027–2029" },
      { label: "Unit Mix", value: "1–4 Bed" },
      { label: "Residences", value: "462 across two towers" },
    ],
    theTower: {
      eyebrow: "The Tower",
      title: "A Landmark In Dubai Design District",
      image: `${ART_IMG}artistry-landmark-in-d3.jpg`,
      paragraphs: [
        "Artistry One treats design as something you live in, not just look at. Generous layouts balance space and privacy, and every floor plan turns towards the view. The amenities cover wellness, leisure and work, so daily life rarely needs to leave the building.",
      ],
    },
    twoTowers: {
      intro: "Artistry Residences comprises two residential towers in Dubai Design District, Artistry One and Artistry Two.",
      towers: [
        {
          name: "Artistry One",
          image: `${ART_IMG}artistry-one-residences.jpg`,
          facts: [{ k: "Residences", v: "1–3 bedrooms, 4-bedroom duplex penthouses" }],
        },
        {
          name: "Artistry Two",
          image: `${ART_IMG}artistry-two-residences.jpg`,
          facts: [
            { k: "Residences", v: "1–3 bedrooms" },
            { k: "Status", v: "Topped out, July 2026" },
            { k: "Handover", v: "2027" },
          ],
        },
      ],
    },
    theResidences: {
      eyebrow: "The Residences",
      title: "One To Four-Bedroom Residences And Duplex Penthouses",
      image: `${ART_IMG}artistry-the-residences-bedroom.jpg`,
      paragraphs: [
        "Choose from one, two and three-bedroom residences or four-bedroom duplex penthouses. Floor-to-ceiling glass frames the Burj Khalifa, the Downtown skyline and Dubai Canal. Warm natural materials and fluid layouts carry the Artistry character through every room.",
        "The duplex penthouses range from 4,638 to 7,765 sq. ft. Each has private terraces, a plunge pool and dual access points. Two signature residences add exclusive rooftop terraces with plunge pools.",
      ],
    },
    amenitiesIntro: {
      title: "Everything For Wellness, Leisure And Work, A Lift Ride From Home",
      body: "",
    },
    amenities: [
      { label: "Infinity lap pool", level: "Level 21 (A1) / Level 22 (A2)" },
      { label: "Sun decks", level: "" },
      { label: "Fully equipped gym", level: "" },
      { label: "Training studio for yoga and pilates", level: "" },
      { label: "Padel courts", level: "" },
      { label: "Sauna", level: "" },
      { label: "Steam room", level: "" },
      { label: "Ice baths", level: "" },
      { label: "Resident lounges", level: "" },
      { label: "Co-working spaces", level: "" },
      { label: "Family leisure zones", level: "" },
      { label: "Private terraces with plunge pools", level: "" },
    ],
    neighbourhood: {
      title: "Dubai Design District",
      image: `${ART_IMG}neighbourhood-dubai-design-district.jpg`,
      paragraphs: [
        "Dubai Design District, popularly called d3, is the city's home for design, fashion, art and innovation. Studios, galleries and cafés line walkable promenades along the canal. Living here puts Dubai's creative community on your doorstep.",
      ],
    },
    // Real names and photos; body copy for each district is still
    // [placeholder] in the source with no real text to extract, so the
    // component shows name + image only. Alphabetical order per instruction.
    fiveDistricts: [
      { name: "Creekside", image: `${ART_IMG}d3-creekside.jpg` },
      { name: "Design HQ", image: `${ART_IMG}d3-design-hq.jpg` },
      { name: "Mindspace", image: `${ART_IMG}d3-mindspace.jpg` },
      { name: "Nest", image: `${ART_IMG}d3-nest.jpg` },
      { name: "Soho", image: `${ART_IMG}d3-soho.jpg` },
    ],
    gallery: [
      { image: `${ART_IMG}artistry-gallery-entrance.jpg`, category: "amenities", caption: "Building entrance" },
      { image: `${ART_IMG}artistry-gallery-lobby.jpg`, category: "amenities", caption: "Residents' lobby" },
      { image: `${ART_IMG}artistry-gallery-lounge.jpg`, category: "amenities", caption: "Residents' lounge" },
      { image: `${ART_IMG}artistry-gallery-pool-podium.jpg`, category: "amenities", caption: "Podium-level pool" },
      { image: `${ART_IMG}artistry-gallery-pool-roof.jpg`, category: "amenities", caption: "Rooftop pool deck" },
      { image: `${ART_IMG}artistry-gallery-bedroom-1.jpg`, category: "residences", caption: "Primary bedroom" },
      { image: `${ART_IMG}artistry-gallery-bedroom-2.jpg`, category: "residences", caption: "Second bedroom" },
      { image: `${ART_IMG}artistry-gallery-interior-1.jpg`, category: "residences", caption: "Living interior" },
      { image: `${ART_IMG}artistry-gallery-interior-2.jpg`, category: "residences", caption: "Dining interior" },
      { image: `${ART_IMG}artistry-gallery-interior-3.jpg`, category: "residences", caption: "Living and dining interior" },
      { image: `${ART_IMG}artistry-gallery-balcony.jpg`, category: "residences", caption: "Private balcony" },
    ],
  },

  // Minimal pages: real hero photo, no rich prototype copy. See `minimalDetail`.
  "pacific": minimalDetail({
    heroImage: `${DEV_IMG}Pacific/pacific-development-hero.jpg`,
    location: "Ras Al Khaimah",
    types: "Studio–2 bedrooms",
    units: "1,376 residences",
    price: "Sold out",
    blurb: "Breathtaking Island Apartments on Al Marjan Island",
    neighbourhoodParagraph:
      "Ras Al Khaimah is a northern emirate of the UAE; Pacific is located on Al Marjan Island, its waterfront island development.",
  }),
  "yacht-bay": minimalDetail({
    heroImage: `${DEV_IMG}Yacht Bay/yacht-bay-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–3 bedrooms",
    units: "175 residences",
    price: "Sold out",
    blurb: "Premium Boating Themed Residences",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "the-point": minimalDetail({
    heroImage: `${DEV_IMG}The Point/the-point-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–4 bedrooms",
    units: "193 residences",
    price: "Sold out",
    blurb: "A Waterside Development in a Prestigious Location",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "the-royal-oceanic": minimalDetail({
    heroImage: `${DEV_IMG}Royal Oceanic/royal-oceanic-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–4 bedrooms",
    units: "232 residences",
    price: "Sold out",
    blurb: "Occupying One of the Premier Locations in Dubai Marina",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "botanica": minimalDetail({
    heroImage: `${DEV_IMG}Botanica/botanica-tower-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–2 bedrooms and penthouses",
    units: "371 residences",
    price: "Sold out",
    blurb: "Dubai's Tropical Paradise Residence",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "the-torch": minimalDetail({
    heroImage: `${DEV_IMG}Torch/torch-tower-development-hero.jpg`,
    location: "Dubai Marina",
    types: "1–3 bedrooms",
    units: "682 residences",
    price: "Sold out",
    blurb: "The World's Tallest Residential Development of its Time",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "bay-central": minimalDetail({
    heroImage: `${DEV_IMG}Bay Central/bay-central-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–3 bedrooms and penthouses",
    units: "747 residences",
    price: "Sold out",
    blurb: "An Exclusive Waterfront Development of 3 Mixed-use Towers",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "west-avenue": minimalDetail({
    heroImage: `${DEV_IMG}West Avenue/west-avenue-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–3 bedrooms",
    units: "276 residences",
    price: "Sold out",
    blurb: "Stylish & Contemporary Residences in a Prime Location",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "mushrif-village": minimalDetail({
    heroImage: `${DEV_IMG}Mushrif Village/mushrif-village-development-hero.jpg`,
    location: "Mirdif",
    types: "2–4 bedroom villas and townhouses",
    units: "122 villas and townhouses",
    price: "Sold out",
    blurb: "A Rare Freehold Ownership Villa Community",
    neighbourhoodParagraph: "Mirdif is a residential suburb in Dubai, known for its villa and townhouse communities.",
  }),
  "residence-110": minimalDetail({
    heroImage: `${DEV_IMG}Residence 110/residence-110-development-hero.jpg`,
    location: "Business Bay",
    types: "Studio–3 bedrooms",
    units: "110 residences",
    price: "Sold out",
    blurb: "Luxury Living In The Heart Of Business Bay",
    neighbourhoodParagraph: BUSINESS_BAY_BLURB,
  }),
  "15-northside": minimalDetail({
    heroImage: `${DEV_IMG}15 Northside/15-northside-development-hero.jpg`,
    location: "Business Bay",
    types: "Studio–4 bedrooms",
    units: "349 residences",
    price: "Sold out",
    blurb: "Bringing The Select Group Standard To Business Bay",
    neighbourhoodParagraph: BUSINESS_BAY_BLURB,
  }),
  "the-residences-at-marina-gate": minimalDetail({
    heroImage: `${DEV_IMG}Marina Gate/marina-gate-development-hero.jpg`,
    location: "Dubai Marina",
    types: "1–4 bedrooms",
    units: "950 residences across two towers",
    price: "Sold out",
    blurb: "Part of the three-tower gateway to Dubai Marina.",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "no-9": minimalDetail({
    heroImage: `${DEV_IMG}No 9/no-9-development-hero.jpg`,
    location: "Dubai Marina",
    types: "1–3 bedrooms",
    units: "227 residences",
    price: "Sold out",
    blurb: "A slender residential tower fronting the Dubai Marina promenade.",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
  "studio-one": minimalDetail({
    heroImage: `${DEV_IMG}Studio One/studio-one-development-hero.jpg`,
    location: "Dubai Marina",
    types: "Studio–2 bedrooms",
    units: "404 residences",
    price: "Sold out",
    blurb: "Compact studio and one-bedroom living on the edge of Dubai Marina.",
    neighbourhoodParagraph: MARINA_BLURB,
  }),
};
