"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

const TERMS_SECTIONS = [
  { titleKey: "legal.terms.s1.title", bodyKey: "legal.terms.s1.body" },
  { titleKey: "legal.terms.s2.title", bodyKey: "legal.terms.s2.body" },
  { titleKey: "legal.terms.s3.title", bodyKey: "legal.terms.s3.body" },
  { titleKey: "legal.terms.s4.title", bodyKey: "legal.terms.s4.body" },
  { titleKey: "legal.terms.s5.title", bodyKey: "legal.terms.s5.body" },
  { titleKey: "legal.terms.s6.title", bodyKey: "legal.terms.s6.body" },
  { titleKey: "legal.terms.s7.title", bodyKey: "legal.terms.s7.body" },
  { titleKey: "legal.terms.s8.title", bodyKey: "legal.terms.s8.body" },
];

export default function TermsPageContent() {
  const { t } = useI18n();

  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/" className="catalog-hero__back">
            {t("faq.back")}
          </Link>
          <p className="catalog-hero__eyebrow">{t("legal.terms.eyebrow")}</p>
          <h1 className="catalog-hero__title">{t("legal.terms.title")}</h1>
          <p className="catalog-hero__sub">{t("legal.terms.sub")}</p>
          <p className="legal-page__updated">{t("legal.terms.updated")}</p>
        </div>
      </header>

      <div className="content-wrap catalog-body about-page">
        {TERMS_SECTIONS.map((section) => (
          <section key={section.titleKey} className="about-page__section">
            <h2>{t(section.titleKey)}</h2>
            <p>{t(section.bodyKey)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
