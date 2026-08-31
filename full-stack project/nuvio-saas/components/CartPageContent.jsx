"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { localizeProduct } from "@/lib/i18n/catalog";
import { getProductById } from "@/lib/products";
import RecommendedRail from "@/components/RecommendedRail";

export default function CartPageContent() {
  const router = useRouter();
  const { t, language } = useI18n();
  const { items, removeFromCart, changeQuantity, cartTotal } = useCart();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/login");
          return;
        }
        setAllowed(true);
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  async function handleCheckout() {
    setCheckoutError("");
    setCheckoutBusy(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setCheckoutError(data.message || "Could not start checkout");
        setCheckoutBusy(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setCheckoutError("Could not start checkout. Try again.");
      setCheckoutBusy(false);
    }
  }

  if (checkingAuth || !allowed) {
    return (
      <section className="cart-panel">
        <p className="text-gray-600">{t("cart.checking")}</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart-panel">
        <h1 className="section-title">{t("cart.title")}</h1>
        <p className="text-gray-600 mb-6">{t("cart.empty")}</p>
        <Link
          href="/search"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-bold transition"
        >
          {t("cart.continue")}
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-panel">
      <h1 className="section-title">{t("cart.title")}</h1>

      <ul className="divide-y divide-gray-200 mb-6">
        {items.map((item) => {
          const catalogProduct = getProductById(item.id);
          const localized = catalogProduct
            ? localizeProduct(catalogProduct, language)
            : item;

          return (
          <li key={item.id} className="cart-item">
            <div className="cart-item__media">
              <Image
                src={item.image}
                alt={localized.name}
                fill
                className="object-cover"
                sizes="(max-width: 1660px) 80px, (max-width: 3840px) 120px, 160px"
              />
            </div>

            <div className="min-w-0">
              <p className="font-medium truncate">{localized.name}</p>
              <p className="text-orange-500 font-bold">${item.price}</p>
            </div>

            <div className="cart-item__actions">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:text-red-700 shrink-0"
              >
                {t("cart.remove")}
              </button>
            </div>
          </li>
          );
        })}
      </ul>

      <div className="flex justify-between items-center mb-6 text-lg font-bold">
        <span>{t("cart.subtotal")}</span>
        <span className="text-orange-500">${cartTotal.toFixed(2)} CAD</span>
      </div>

      {checkoutError ? (
        <p className="mb-3 text-sm text-red-600" role="alert">
          {checkoutError}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={checkoutBusy}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-60"
      >
        {checkoutBusy ? t("cart.redirecting") : t("cart.pay")}
      </button>
      <p className="mt-3 text-center text-sm text-gray-500">{t("cart.secure")}</p>
      <p className="mt-1 text-center text-xs text-gray-500">{t("ai.fraudNote")}</p>
      <RecommendedRail title={t("ai.cartRecs")} excludeIds={items.map((item) => item.id)} />
    </section>
  );
}
