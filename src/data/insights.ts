/**
 * Seed data extracted verbatim from the design-handoff prototype:
 *   design_handoff_select_group_website/prototype/Select Group Homepage.dc.html
 *
 * This is extraction, not authoring. Titles, excerpts, standfirst/dek text and
 * dates are quoted exactly as found in the source — never paraphrased or
 * embellished. Where a field was not present, it is simply omitted rather
 * than invented.
 *
 * IMPORTANT — content-type correction: the homepage "Latest News" section in
 * the current build wrongly sources from the `news`/`newsLeadStory` dataset,
 * which is third-party PRESS coverage (see the `MEDIA` const, prototype
 * ~L5126-5185: ZAWYA, La Repubblica, Boutique Hotelier, etc.). This file
 * extracts the actually-correct source for that section: "Insights", Select
 * Group's own authored editorial/blog content (long-form articles on off plan
 * investing, financing, SPAs, escrow, etc.). Do not confuse this with MEDIA.
 *
 * This file intentionally does NOT include full article body text. The
 * source also has a parallel `INSIGHT_TEXT` array (prototype ~L3531) holding
 * raw markdown-ish body copy per article (used by a `parseInsight()` helper
 * to build the full article page), and each `INSIGHTS` entry also carries its
 * own structured `body`/`figures` fields for the same purpose. Both are
 * out of scope here — this file is for homepage/listing cards only
 * (title, excerpt/dek, date, category, slug). Preserving body text for full
 * article pages is a later phase.
 *
 * `slug` is NOT mechanically derived here (unlike `developments` in
 * ./homepage.ts) — the source itself provides a real canonical slug via each
 * entry's `url` field (e.g. "https://www.select-group.ae/post/<slug>"), so
 * the slug below is extracted verbatim from that URL's final path segment
 * rather than re-derived from the title (the two usually match, but for the
 * SPA article the real URL slug is a shortened/different string than a naive
 * title-kebab-case would produce, so the URL is the source of truth).
 */

export type InsightCategory = "inv" | "life" | "dubai";

export interface InsightArticle {
  title: string;
  /** Extracted from the source `url` field's final path segment — see file header. */
  slug: string;
  /** Verbatim date string as rendered in the source, e.g. "October 21, 2026". */
  date: string;
  /** Short card-listing teaser, verbatim from source `excerpt` field. */
  excerpt: string;
  /** Opening standfirst/dek paragraph used atop the full article, verbatim from source `standfirst` field. */
  dek?: string;
  /** Machine category key used by the source's filter chips. */
  category: InsightCategory;
  /** Human-readable category label as rendered, e.g. "Property Investment". */
  categoryLabel: string;
  /** Verbatim "N min read" string from source `read` field. */
  readTime?: string;
  /** Verbatim hero/card image URL from source `img` field. */
  image?: string;
  /** Verbatim canonical article URL from source `url` field. */
  sourceUrl?: string;
}

// Source: Select Group Homepage.dc.html ~L5105-5186 (`const INSIGHTS = [...]`)
// Order preserved from source, which is already newest-first by date
// (Oct 21 2026 → Jul 1 2025) — no re-sorting was needed.
export const insights: InsightArticle[] = [
  {
    title: "How Payment Plans Work When Buying Off Plan Property in Dubai",
    slug: "how-payment-plans-work-when-buying-off-plan-property-in-dubai",
    date: "October 21, 2026",
    excerpt:
      "How off plan payment plans work in Dubai — deposits, construction-linked instalments, post-handover options and what to check before you buy.",
    dek: "One of the key advantages of buying an off plan property in Dubai is the ability to spread payments over the course of a development. Rather than paying the full purchase price upfront, buyers typically follow a structured payment plan agreed with the developer.",
    category: "inv",
    categoryLabel: "Property Investment",
    readTime: "9 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6ad7698b478056704c2c7773_hero-payment-plan-blog.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/how-payment-plans-work-when-buying-off-plan-property-in-dubai",
  },
  {
    title: "Why Branded Residences Are Reshaping Dubai’s Luxury Property Market",
    slug: "why-branded-residences-are-reshaping-dubais-luxury-property-market",
    date: "October 2, 2026",
    excerpt:
      "Branded residences are booming in Dubai. Discover why, and how Select Group's Six Senses partnership leads the trend on Palm Jumeirah and in Dubai Marina.",
    dek: "A branded residence in Dubai was once a relatively niche concept, typically associated with hotel-operated residences and a small pool of ultra-luxury buyers. Today, branded residences have become one of the most significant segments of Dubai’s luxury property market.",
    category: "inv",
    categoryLabel: "Property Investment",
    readTime: "8 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6abf6ef1e180e7b6446e2994_blog-branded-residence-hero.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/why-branded-residences-are-reshaping-dubais-luxury-property-market",
  },
  {
    title:
      "Understanding the Sales and Purchase Agreement (SPA) in Dubai: The Foundation of a Secure Property Investment",
    slug: "understanding-the-sales-and-purchase-agreement-in-dubai",
    date: "September 16, 2026",
    excerpt:
      "Learn what a Sales and Purchase Agreement (SPA) is, what it includes, and what buyers should review before purchasing property or off plan property in Dubai.",
    dek: "Buying property in Dubai is a significant financial decision, whether you are purchasing a home, investing in an off plan development or expanding an existing property portfolio. At the centre of that framework is the Sales and Purchase Agreement (SPA).",
    category: "inv",
    categoryLabel: "Property Investment",
    readTime: "10 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6aaa937c315699f9683652d8_hero-what-is-spa.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/understanding-the-sales-and-purchase-agreement-in-dubai",
  },
  {
    title: "Escrow Accounts in Dubai: What Property Buyers Need to Know",
    slug: "escrow-accounts-in-dubai-what-property-buyers-need-to-know",
    date: "September 9, 2026",
    excerpt:
      "Learn how escrow accounts protect off plan buyers in Dubai, how funds are verified and released, and what to check before you pay.",
    dek: "Dubai’s off plan property market has become an important part of the city’s wider real estate story. One of the most important safeguards for off plan buyers is the escrow account.",
    category: "inv",
    categoryLabel: "Property Investment",
    readTime: "8 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6a9fd586b60aad9be65a1992_hero-escrow-accounts-dubai.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/escrow-accounts-in-dubai-what-property-buyers-need-to-know",
  },
  {
    title:
      "Engineering the World’s Tallest Residential Tower: Inside Six Senses Residences Dubai Marina",
    slug:
      "engineering-the-worlds-tallest-residential-tower-inside-six-senses-residences-dubai-marina",
    date: "August 26, 2026",
    excerpt:
      "At 517 metres and 122 storeys, Six Senses Residences Dubai Marina will become the world’s tallest residential tower on completion in 2029. Now 30% complete.",
    dek: "Some buildings are designed to fit into a skyline. Others are designed to define one. On completion in 2029, Six Senses Residences Dubai Marina will rise 517 metres across 122 storeys above the Dubai Marina waterfront, becoming the world’s tallest residential tower.",
    category: "life",
    categoryLabel: "Lifestyle",
    readTime: "9 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6a8e78ca1a8f67297fa26f20_blog-hero-engineering-worlds-tallest-tower-six-senses-dubai-marina.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/engineering-the-worlds-tallest-residential-tower-inside-six-senses-residences-dubai-marina",
  },
  {
    title:
      "Dubai’s New Property Visa Rules: What They Mean for Investors and Why the Timing Matters",
    slug: "dubais-new-property-visa-rules-what-they-mean-for-investors-and-why-the-timing-matters",
    date: "April 30, 2026",
    excerpt:
      "Dubai has removed the AED 750,000 minimum for its two-year property visa, expanding eligibility for sole owners and reshaping investor residency rules in 2026.",
    dek: "Dubai has long understood that the right regulatory environment is as powerful an asset as any skyline. The latest update to its property-linked residency rules is, in that context, less a surprise than a natural evolution.",
    category: "dubai",
    categoryLabel: "About Dubai",
    readTime: "8 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/69fb0242d90eda9374d4218b_D3_15-Crown_SELECT-GROUP.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/dubais-new-property-visa-rules-what-they-mean-for-investors-and-why-the-timing-matters",
  },
  {
    title:
      "Select Group Expands Its Dubai Portfolio with New Developments at Palm Jebel Ali and Dubai Design District",
    slug:
      "select-group-expands-its-dubai-portfolio-with-new-developments-at-palm-jebel-ali-and-dubai-design-district",
    date: "July 1, 2025",
    excerpt:
      "Select Group is developing new landmark projects at Palm Jebel Ali and Dubai Design District (d3) in Dubai. Discover what's coming and register your interest.",
    dek: "Select Group have entered a strategic agreement with Dubai Holding to develop two new landmark projects in Dubai: an upscale waterfront destination at Palm Jebel Ali, and a mixed-use, design-led community in Dubai Design District.",
    category: "dubai",
    categoryLabel: "About Dubai",
    readTime: "4 min read",
    image:
      "https://cdn.prod.website-files.com/63bd7443c5c4c66606ad6362/6a9aa4cc3ae32af04c04db7f_hero-select-group-palm-jebel-ali.jpg",
    sourceUrl:
      "https://www.select-group.ae/post/select-group-expands-its-dubai-portfolio-with-new-developments-at-palm-jebel-ali-and-dubai-design-district",
  },
];
