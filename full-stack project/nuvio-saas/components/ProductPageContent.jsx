"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import { localizeProduct } from "@/lib/i18n/catalog";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductCard from "@/components/ProductCard";
import ProductAiPanel from "@/components/ProductAiPanel";
import RecommendedRail from "@/components/RecommendedRail";
import { trackProductView } from "@/lib/recentlyViewed";

export default function ProductPageContent({ product, related }) {
  const { language, t } = useI18n();
  const localized = localizeProduct(product, language);
  const localizedRelated = related.map((item) =>
    localizeProduct(item, language)
  );

  useEffect(() => {
    trackProductView(product.id);
  }, [product.id]);

  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__orbit catalog-hero__orbit--a" aria-hidden="true" />
        <div className="catalog-hero__orbit catalog-hero__orbit--b" aria-hidden="true" />
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link
            href={`/search?category=${localized.category}`}
            className="catalog-hero__back"
          >
            ← {localized.categoryLabel}
          </Link>
          <p className="catalog-hero__eyebrow">{t("product.eyebrow")}</p>
          <h1 className="catalog-hero__title">{localized.name}</h1>
        </div>
      </header>

      <div className="content-wrap catalog-body">
        <article className="product-detail">
          <div className="product-detail__media">
            <Image
              src={localized.image}
              alt={localized.name}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, (max-width: 3840px) 48vw, 40vw"
              priority
            />
          </div>

          <div className="product-detail__copy">
            <span className="product-detail__cat">{localized.categoryLabel}</span>
            <h2 className="product-detail__name">{localized.name}</h2>
            <p className="product-detail__price">${localized.price}</p>
            <ProductAiPanel productId={product.id} />
            <ProductDetailActions product={product} />
          </div>
        </article>

        {localizedRelated.length > 0 ? (
          <section className="product-detail__related">
            <h3 className="section-title">{t("product.related")}</h3>
            <div className="product-grid">
              {localizedRelated.map((item, index) => (
                <div
                  key={item.id}
                  className="catalog-item"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <RecommendedRail
          title={t("ai.recommended")}
          productId={product.id}
          excludeIds={[product.id, ...related.map((item) => item.id)]}
        />
      </div>
    </div>
  );
}
