"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

export default function AboutPageContent() {
  const { t } = useI18n();

  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/" className="catalog-hero__back">
            {t("faq.back")}
          </Link>
          <p className="catalog-hero__eyebrow">{t("about.eyebrow")}</p>
          <h1 className="catalog-hero__title">{t("about.title")}</h1>
          <p className="catalog-hero__sub">{t("about.sub")}</p>
        </div>
      </header>

      <div className="content-wrap catalog-body about-page">
        <section className="about-page__section">
          <h2>{t("about.mission.title")}</h2>
          <p>{t("about.mission.body")}</p>
        </section>
        <section className="about-page__section">
          <h2>{t("about.shopping.title")}</h2>
          <p>{t("about.shopping.body")}</p>
        </section>
        <section className="about-page__section">
          <h2>{t("about.trust.title")}</h2>
          <p>{t("about.trust.body")}</p>
        </section>
      </div>
    </div>
  );
}
