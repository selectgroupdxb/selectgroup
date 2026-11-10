import type { MetadataRoute } from "next";

const SITE_URL = "https://www.select-group.ae";

// Phase 1 only ships the homepage. Every other route from the handoff's route
// list (developments, areas, investments, about, journey, awards, team,
// insights, media, reports, case-studies, contact) must be added here as its
// page lands — see the SEO migration plan for the full URL mapping this must
// stay in sync with.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
