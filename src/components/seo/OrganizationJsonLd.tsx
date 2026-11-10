const SITE_URL = "https://www.select-group.ae";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Select Group",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.svg`,
  foundingDate: "2002",
  description: "Developing premium real estate since 2002.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};

/** Site-wide Organization schema — safe to render once in the root layout. */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
