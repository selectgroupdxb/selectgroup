import type { Metadata } from "next";
import { sansumi, wixMadeforDisplay, roboto } from "./fonts";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "./globals.css";

const SITE_URL = "https://www.select-group.ae";
const DESCRIPTION =
  "Select Group creates premium vertical communities in carefully selected waterfront and prime urban locations across Dubai — defined by generous residences, exceptional amenities and enduring value.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Select Group | Developing Premium Real Estate Since 2002",
    template: "%s | Select Group",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Select Group",
    url: SITE_URL,
    title: "Select Group | Developing Premium Real Estate Since 2002",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Group | Developing Premium Real Estate Since 2002",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sansumi.variable} ${wixMadeforDisplay.variable} ${roboto.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <OrganizationJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
