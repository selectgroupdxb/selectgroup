/**
 * Rich per-development content for the project template (`/developments/[slug]`).
 *
 * Extracted verbatim from the design-handoff prototype
 * `design_handoff_select_group_website/prototype/Six Senses Residences Dubai Marina.dc.html`
 * — the only one of the three prototype pages with this level of real,
 * signed-off copy (the other two, Artistry One/Two, are mostly `[placeholder]`
 * editorial text or a thinner data-driven template). Per the project owner's
 * explicit instruction, that file's structure and content drive the real
 * template build, even though the handoff README separately earmarks it as
 * source copy for a distinct `/lp/[slug]` paid-ads landing page — the ask was
 * to use its content for this page regardless.
 *
 * Only `six-senses-residences-dubai-marina` is populated for now. Every
 * section here is optional on `DevelopmentDetail` specifically so that other
 * developments — which have no equivalent rich content yet — render the page
 * correctly with just their `Development` card-level fields, rather than
 * needing invented placeholder copy. Add an entry here once a development's
 * real content exists.
 */

const IMG = "/images/homepage/";

export type ContentBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageRight?: boolean;
};

export type ResidenceType = {
  numeral: string;
  title: string;
  body: string;
  ctaLabel: string;
  image?: string;
};

export type AmenityLevel = {
  numeral: string;
  label: string;
  body: string;
  highlights: string[];
  image?: string;
  imageRight?: boolean;
};

export type GalleryCategory = "residences" | "shared" | "wellness";

export type GalleryItem = {
  image: string;
  category: GalleryCategory;
  caption: string;
};

export type NearbyPlace = {
  name: string;
  time?: string;
};

export type ProjectFAQItem = {
  question: string;
  answer: string;
};

export interface DevelopmentDetail {
  heroTagline: string;
  heroBody: string;
  keyFacts: { label: string; value: string }[];
  introduction: ContentBlock;
  residenceTypes?: ResidenceType[];
  wellnessIntro?: ContentBlock;
  amenityLevels?: AmenityLevel[];
  design?: ContentBlock[];
  service?: ContentBlock;
  gallery?: GalleryItem[];
  locationBody: string;
  locationNearby: NearbyPlace[];
  partnership?: { title: string; body: string; linkLabel: string; image?: string };
  developerBlurb: string;
  faq?: ProjectFAQItem[];
  ctaTitle: string;
}

export const developmentDetails: Record<string, DevelopmentDetail> = {
  "six-senses-residences-dubai-marina": {
    heroTagline: "A life lived well. At home in Dubai Marina.",
    heroBody:
      "A monumental milestone in the world of ultra-luxury living, positioned to revolutionise branded residences and dominate the Marina skyline as the tallest residential tower in the world.",
    keyFacts: [
      { label: "Location", value: "Dubai Marina" },
      { label: "Residences", value: "251" },
      { label: "Amenities", value: "61,250 sq. ft." },
      { label: "Height", value: "517 m · 122 storeys" },
      { label: "Scheduled completion", value: "2029" },
    ],
    introduction: {
      eyebrow: "The Development",
      title: "A Six Senses home in Dubai Marina",
      paragraphs: [
        "A monumental milestone in the world of ultra-luxury living, positioned to revolutionise branded residences and dominate the Marina skyline.",
        "Designed to rise 517 metres across 122 storeys, the tower brings Six Senses' wellness-led hospitality to a waterfront address for the first time as a standalone residential development.",
      ],
      image: `${IMG}ssdm-development-featured.jpg`,
    },
    residenceTypes: [
      {
        numeral: "01",
        title: "Two- to four-bedroom residences",
        body: "Generously proportioned homes with full-height glazing framing the Marina and the Palm.",
        ctaLabel: "Explore residence plans",
      },
      {
        numeral: "02",
        title: "Four-bedroom half-floor penthouses",
        body: "Half-floor residences with private lift access and panoramic wraparound terraces.",
        ctaLabel: "Enquire about penthouses",
      },
      {
        numeral: "03",
        title: "Four-bedroom duplex Sky Mansions",
        body: "Double-height living spaces across two levels, set within the tower's upper third.",
        ctaLabel: "Enquire about Sky Mansions",
      },
      {
        numeral: "04",
        title: "Five-bedroom triplex Sky Mansions",
        body: "The building's signature residences — three levels with a private pool and entertaining deck.",
        ctaLabel: "Enquire about Sky Mansions",
      },
    ],
    wellnessIntro: {
      eyebrow: "Wellness & Amenities",
      title: "Wellness with a place in your day",
      paragraphs: [
        "Six Senses' wellness philosophy shapes every level of the building, from the amenity floors to the residences themselves.",
        "Across four dedicated levels, residents move between connection, movement, recovery and rest — each considered as part of daily life rather than an occasional retreat.",
      ],
    },
    amenityLevels: [
      {
        numeral: "04",
        label: "Connectivity",
        body: "A floor for gathering — spaces designed for residents to connect, work and unwind together.",
        highlights: ["Residents' lounge", "Library", "Private cinema", "Wine lounge", "Outdoor gymnasium"],
      },
      {
        numeral: "05",
        label: "Balance",
        body: "Movement-focused amenities spanning fitness, water and recovery.",
        highlights: ["Gymnasium", "Infinity pool", "Hydrotherapy pool", "Saunas", "Salt room", "Ice baths"],
        imageRight: true,
      },
      {
        numeral: "06",
        label: "Longevity",
        body: "A clinical wellness floor dedicated to long-term health.",
        highlights: ["Wellness clinic", "Cryotherapy", "Massage suites", "Virtual cycling studio", "Group fitness"],
      },
      {
        numeral: "109",
        label: "Horizon",
        body: "A rooftop amenity level crowning the tower, built around the Marina view.",
        highlights: ["25m lap pool", "Jacuzzis", "Sky bar", "Yoga deck", "Fine dining"],
        imageRight: true,
      },
    ],
    design: [
      {
        eyebrow: "Design",
        title: "A home shaped by light and material",
        paragraphs: [
          "Full-height windows, timber and bronze finishes and a warm, natural palette run throughout — a biophilic approach to interior design informed by feng shui principles.",
        ],
      },
      {
        eyebrow: "Design",
        title: "Sleep with Six Senses",
        paragraphs: [
          "Every bedroom is designed around Six Senses' own sleep programme, from lighting and acoustics to bedding developed with the brand's wellness team.",
        ],
        imageRight: true,
      },
    ],
    service: {
      eyebrow: "Service",
      title: "Six Senses owner services",
      paragraphs: [
        "Residents are supported by Six Senses' concierge and owner-services team, from day-to-day requests to full home management while away.",
      ],
    },
    gallery: [
      { image: `${IMG}ssdm-development-featured.jpg`, category: "residences", caption: "Tower exterior, Marina frontage" },
      { image: `${IMG}ssdm-branded-residence.jpg`, category: "shared", caption: "Residents' lounge, Level 04" },
      { image: `${IMG}six-senses-marina-hp-hero.jpg`, category: "wellness", caption: "Horizon pool deck, Level 109" },
    ],
    locationBody:
      "Positioned on the Marina waterfront, within reach of JBR, Bluewaters and Palm Jumeirah, and a short drive from Dubai's key business districts.",
    locationNearby: [
      { name: "Dubai Harbour" },
      { name: "JBR" },
      { name: "Bluewaters" },
      { name: "Palm Jumeirah" },
      { name: "Emirates Golf Club" },
    ],
    partnership: {
      title: "The Partnership",
      body: "Select Group's second project with Six Senses, following the completed Six Senses Residences The Palm.",
      linkLabel: "Explore Six Senses Residences The Palm",
      image: `${IMG}sspalm-development-featured.jpg`,
    },
    developerBlurb:
      "Founded in 2002 and headquartered in Dubai, Select Group has delivered 24.7 million square feet across the Middle East, the United Kingdom and Europe.",
    faq: [
      {
        question: "What does 'off plan' mean?",
        answer:
          "Off plan developments are sold before or during construction, typically with a staged payment plan through to handover.",
      },
      {
        question: "How does the payment plan work?",
        answer:
          "40/60 Payment Plan\n15% Down Payment\n10% on 35% Construction Completion\n10% on 45% Construction Completion\n5% on 50% Construction Completion\n60% on Handover (2029)\nPay only 40% during construction with 60% due on handover.",
      },
      {
        question: "When is the scheduled completion date?",
        answer: "The development is scheduled for completion in 2029.",
      },
      {
        question: "How do I get in touch about this development?",
        answer: "Use the enquiry form on this page, or contact the Select Group team directly.",
      },
    ],
    ctaTitle: "Let us help you find your home",
  },
};
