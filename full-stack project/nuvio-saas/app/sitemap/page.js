"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

const SITEMAP_LINKS = [
  { labelKey: "footer.link.about", href: "/about" },
  { labelKey: "footer.link.shop", href: "/search" },
  { labelKey: "nav.cart", href: "/cart" },
  { labelKey: "nav.orders", href: "/orders" },
  { labelKey: "nav.faq", href: "/faq" },
  { labelKey: "nav.settings", href: "/settings" },
  { labelKey: "nav.login", href: "/login" },
  { labelKey: "nav.signup", href: "/signup" },
];

export default function SitemapPage() {
  const { t } = useI18n();

  return (
    <div className="legal-page">
      <header className="legal-page__hero content-wrap">
        <Link href="/" className="legal-page__back">
          {t("faq.back")}
        </Link>
        <p className="legal-page__eyebrow">{t("footer.legal.sitemap")}</p>
        <h1 className="legal-page__title">{t("legal.sitemap.title")}</h1>
        <p className="legal-page__body">{t("legal.sitemap.body")}</p>
        <ul className="legal-page__links">
          {SITEMAP_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{t(link.labelKey)}</Link>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
