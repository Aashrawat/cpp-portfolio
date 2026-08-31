"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

const PRIVACY_SECTIONS = [
  { titleKey: "legal.privacy.s1.title", bodyKey: "legal.privacy.s1.body" },
  { titleKey: "legal.privacy.s2.title", bodyKey: "legal.privacy.s2.body" },
  { titleKey: "legal.privacy.s3.title", bodyKey: "legal.privacy.s3.body" },
  { titleKey: "legal.privacy.s4.title", bodyKey: "legal.privacy.s4.body" },
  { titleKey: "legal.privacy.s5.title", bodyKey: "legal.privacy.s5.body" },
  { titleKey: "legal.privacy.s6.title", bodyKey: "legal.privacy.s6.body" },
  { titleKey: "legal.privacy.s7.title", bodyKey: "legal.privacy.s7.body" },
  { titleKey: "legal.privacy.s8.title", bodyKey: "legal.privacy.s8.body" },
];

export default function PrivacyPageContent() {
  const { t } = useI18n();

  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/" className="catalog-hero__back">
            {t("faq.back")}
          </Link>
          <p className="catalog-hero__eyebrow">{t("legal.privacy.eyebrow")}</p>
          <h1 className="catalog-hero__title">{t("legal.privacy.title")}</h1>
          <p className="catalog-hero__sub">{t("legal.privacy.sub")}</p>
          <p className="legal-page__updated">{t("legal.privacy.updated")}</p>
        </div>
      </header>

      <div className="content-wrap catalog-body about-page">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.titleKey} className="about-page__section">
            <h2>{t(section.titleKey)}</h2>
            <p>{t(section.bodyKey)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
