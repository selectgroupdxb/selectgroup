const SITE_URL = "https://www.select-group.ae";

type BreadcrumbJsonLdItem = {
  label: string;
  /** Path relative to the site root, e.g. "/developments". Omit on the current (last) page. */
  href?: string;
};

/** BreadcrumbList structured data — pairs with the visual <Breadcrumb>; render once per page. */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbJsonLdItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
