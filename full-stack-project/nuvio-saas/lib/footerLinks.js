/** Footer link columns — data layer for Footer view (MVC). */
export const FOOTER_COLUMNS = [
  {
    titleKey: "footer.col.about",
    links: [{ labelKey: "footer.link.about", href: "/about" }],
  },
  {
    titleKey: "footer.col.support",
    links: [{ labelKey: "footer.link.helpCenter", href: "/faq" }],
  },
  {
    titleKey: "footer.legal.terms",
    href: "/terms",
    legal: true,
  },
  {
    titleKey: "footer.legal.privacy",
    href: "/privacy",
    legal: true,
  },
  {
    titleKey: "footer.legal.sitemap",
    href: "/sitemap",
    legal: true,
  },
];
