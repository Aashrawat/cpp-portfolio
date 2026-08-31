"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { localizeProduct } from "@/lib/i18n/catalog";

export default function ProductDetailActions({ product }) {
  const router = useRouter();
  const { t, language } = useI18n();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);
  const localized = localizeProduct(product, language);

  async function handleAddToCart() {
    if (busy) return;
    setBusy(true);

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        router.push("/login");
        return;
      }

      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="product-detail__actions">
      <button
        type="button"
        className="product-detail__cart"
        onClick={handleAddToCart}
        disabled={busy}
      >
        {busy
          ? t("product.wait")
          : added
            ? t("product.added")
            : t("product.addToCart")}
      </button>
      <Link
        href={`/search?category=${product.category}`}
        className="product-detail__more"
      >
        {t("product.moreIn", { category: localized.categoryLabel })}
      </Link>
    </div>
  );
}
