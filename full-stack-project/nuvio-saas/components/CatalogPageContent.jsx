"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  categories,
  getCategory,
  getProductsByCategory,
  products,
} from "@/lib/products";
import { getCategoryImage } from "@/lib/productImages";
import ProductCard from "@/components/ProductCard";
import Tilt3D from "@/components/Tilt3D";
import T from "@/components/T";
import RecommendedRail from "@/components/RecommendedRail";
import { useI18n } from "@/context/I18nContext";
import {
  localizeCategory,
  localizeProduct,
  matchesLocalizedCategory,
  matchesLocalizedProduct,
} from "@/lib/i18n/catalog";

export default function CatalogPageContent() {
  const searchParams = useSearchParams();
  const { language, t } = useI18n();
  const searchQuery = (searchParams.get("q") || "").trim();
  const categoryId = searchParams.get("category") || "";
  const viaImage = searchParams.get("via") === "image";

  const matchedCategories = useMemo(() => {
    return categories
      .filter((cat) => matchesLocalizedCategory(cat, searchQuery, language))
      .map((cat) => localizeCategory(cat, language));
  }, [searchQuery, language]);

  if (!categoryId) {
    const imageProducts =
      viaImage && searchQuery
        ? products
            .filter((product) =>
              matchesLocalizedProduct(product, searchQuery, language)
            )
            .map((product) => localizeProduct(product, language))
        : [];

    return (
      <div className="catalog-page">
        <header className="catalog-hero catalog-hero--categories">
          <div className="catalog-hero__orbit catalog-hero__orbit--a" aria-hidden="true" />
          <div className="catalog-hero__orbit catalog-hero__orbit--b" aria-hidden="true" />
          <div className="catalog-hero__glow" aria-hidden="true" />
          <div className="catalog-hero__inner content-wrap">
            <T as="p" className="catalog-hero__eyebrow" k="catalog.eyebrow" />
            <T as="h1" className="catalog-hero__title" k="catalog.title" />
            {searchQuery ? (
              <T
                as="p"
                className="catalog-hero__sub"
                k="catalog.matching"
                values={{ query: searchQuery }}
              />
            ) : (
              <T as="p" className="catalog-hero__sub" k="catalog.sub" />
            )}
            {viaImage && searchQuery ? (
              <p className="catalog-hero__meta">{t("ai.imageResults")}</p>
            ) : null}
          </div>
        </header>

        <div className="content-wrap catalog-body">
          {viaImage && searchQuery ? (
            imageProducts.length === 0 ? (
              <section className="catalog-empty">
                <T as="p" k="catalog.noProducts" />
                <Link href="/search" className="catalog-empty__btn">
                  <T k="catalog.clearSearch" as="fragment" />
                </Link>
              </section>
            ) : (
              <section className="product-grid">
                {imageProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="catalog-item"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </section>
            )
          ) : matchedCategories.length === 0 ? (
            <section className="catalog-empty">
              <T as="p" k="catalog.noCategories" values={{ query: searchQuery }} />
              <Link href="/search" className="catalog-empty__btn">
                <T k="catalog.clearSearch" as="fragment" />
              </Link>
            </section>
          ) : (
            <div className="category-rail">
              {matchedCategories.map((cat, index) => {
                const count = getProductsByCategory(cat.id).length;
                return (
                  <Tilt3D key={cat.id}>
                    <Link
                      href={`/search?category=${cat.id}`}
                      className="category-tile"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <Image
                        src={getCategoryImage(cat.id)}
                        alt={cat.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, (max-width: 1920px) 33vw, (max-width: 3840px) 20vw, 12vw"
                      />
                      <div className="category-tile__label">
                        <h2>{cat.label}</h2>
                        <p>{cat.blurb}</p>
                        <span className="category-tile__count">
                          {t("catalog.productsCount", { count })}
                        </span>
                      </div>
                    </Link>
                  </Tilt3D>
                );
              })}
            </div>
          )}
          {!searchQuery ? (
            <RecommendedRail title={t("ai.recommended")} />
          ) : null}
        </div>
      </div>
    );
  }

  const category = localizeCategory(getCategory(categoryId), language);
  const results = products
    .filter((p) => p.category === categoryId)
    .filter((p) => matchesLocalizedProduct(p, searchQuery, language))
    .map((p) => localizeProduct(p, language));
  const heroImage = getCategoryImage(categoryId);

  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--category">
        <div className="catalog-hero__media" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="catalog-hero__veil" aria-hidden="true" />
        <div className="catalog-hero__orbit catalog-hero__orbit--a" aria-hidden="true" />
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/search" className="catalog-hero__back">
            <T k="catalog.allCategories" as="fragment" />
          </Link>
          <T as="p" className="catalog-hero__eyebrow" k="catalog.categoryEyebrow" />
          <h1 className="catalog-hero__title">
            {category?.label || categoryId}
          </h1>
          {searchQuery ? (
            <T
              as="p"
              className="catalog-hero__sub"
              k="catalog.productsMatching"
              values={{ count: results.length, query: searchQuery }}
            />
          ) : (
            <p className="catalog-hero__sub">
              {category?.blurb ||
                t("catalog.productsAvailable", { count: results.length })}
            </p>
          )}
          {!searchQuery ? (
            <p className="catalog-hero__meta">
              {t("catalog.productsAvailable", { count: results.length })}
            </p>
          ) : null}
        </div>
      </header>

      <div className="content-wrap catalog-body">
        {results.length === 0 ? (
          <section className="catalog-empty">
            <T as="p" k="catalog.noProducts" />
            <Link
              href={`/search?category=${categoryId}`}
              className="catalog-empty__btn"
            >
              <T k="catalog.clearProductSearch" as="fragment" />
            </Link>
          </section>
        ) : (
          <section className="product-grid">
            {results.map((product, index) => (
              <div
                key={product.id}
                className="catalog-item"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
