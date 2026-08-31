"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { recommendProducts } from "@/lib/recommendations";
import { getRecentlyViewed } from "@/lib/recentlyViewed";

export default function RecommendedRail({
  title,
  productId,
  excludeIds = [],
  query = "",
}) {
  const { items } = useCart();
  const [viewedIds, setViewedIds] = useState([]);

  useEffect(() => {
    setViewedIds(getRecentlyViewed());
  }, [productId]);

  const excludeKey = excludeIds.join(",");
  const recs = useMemo(
    () =>
      recommendProducts({
        productId,
        cartIds: items.map((item) => item.id),
        viewedIds,
        query,
        excludeIds: excludeKey ? excludeKey.split(",") : [],
        limit: 8,
      }),
    [productId, items, viewedIds, query, excludeKey]
  );

  if (!recs.length) return null;

  return (
    <section className="ai-rail">
      <div className="ai-rail__head">
        <p className="ai-rail__eyebrow">Kavya picks</p>
        <h3 className="section-title">{title}</h3>
      </div>
      <div className="product-grid">
        {recs.map((product, index) => (
          <div
            key={product.id}
            className="catalog-item"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
