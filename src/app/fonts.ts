import localFont from "next/font/local";

// Sansumi is the licensed display face, supplied by Select Group in the
// November 2026 handoff refresh. Wix Madefor Display is the brand-guideline
// sanctioned Google Fonts substitute, kept as a fallback in the stack.
export const sansumi = localFont({
  variable: "--font-sansumi",
  display: "swap",
  src: [
    { path: "../fonts/Sansumi-UltraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/Sansumi-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Sansumi-DemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Sansumi-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const wixMadeforDisplay = localFont({
  variable: "--font-wix-madefor-display",
  display: "swap",
  src: [
    { path: "../fonts/WixMadeforDisplay-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/WixMadeforDisplay-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/WixMadeforDisplay-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../fonts/WixMadeforDisplay-700-latin.woff2", weight: "700", style: "normal" },
    { path: "../fonts/WixMadeforDisplay-800-latin.woff2", weight: "800", style: "normal" },
  ],
});

// Avenir (the licensed body face) has not been supplied — Roboto is the
// brand-guideline substitute until it is.
export const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "../fonts/Roboto-300-latin.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Roboto-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Roboto-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Roboto-700-latin.woff2", weight: "700", style: "normal" },
  ],
});
