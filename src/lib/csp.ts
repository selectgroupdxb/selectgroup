/**
 * Content-Security-Policy — allowlists only the third-party origins this
 * site actually integrates with. No nonce/strict-dynamic here: that would
 * force every route into dynamic (uncached, per-request) rendering, which
 * conflicts with the project's SEO/Core Web Vitals goals. This is the
 * static-header approach from Next.js's own CSP guide ("Without Nonces").
 *
 * Google Search Console needs no entry here — verification is a meta tag or
 * DNS record, not a script Search Console loads into the page.
 *
 * Forms (GoHighLevel) and maps (Leaflet/MapLibre/OpenFreeMap) are later
 * phases. GHL posts happen server-side (route handler), so the client never
 * contacts a GHL domain directly — add map tile/style origins to connect-src
 * and img-src when that phase lands.
 */

const isDev = process.env.NODE_ENV === "development";

const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  // 'unsafe-inline' is required without a per-request nonce (Next/Tailwind
  // inline styles, and some framework-injected inline scripts).
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com", // GTM + gtag.js (GA4 loads through here)
    "https://connect.facebook.net", // Meta Pixel
    "https://snap.licdn.com", // LinkedIn Insight Tag
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://cdn.sanity.io",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.facebook.com", // Meta Pixel no-script fallback
    "https://px.ads.linkedin.com", // LinkedIn Insight Tag fallback pixel
  ],
  "font-src": ["'self'"], // fonts are self-hosted — no external font CDN
  "connect-src": [
    "'self'",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
    "https://www.facebook.com", // Meta Pixel
    "https://px.ads.linkedin.com", // LinkedIn Insight Tag
  ],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
};

export const cspHeaderValue = Object.entries(directives)
  .map(([key, values]) => `${key} ${values.join(" ")}`)
  .concat("upgrade-insecure-requests")
  .join("; ");
