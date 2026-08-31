"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { t } = useI18n();
  const [status, setStatus] = useState("loading");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("missing");
      return;
    }

    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Payment check failed");
        return data;
      })
      .then((data) => {
        setDetails(data);
        if (data.status === "paid") {
          clearCart();
          setStatus("paid");
        } else {
          setStatus(data.status || "unpaid");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId, clearCart]);

  if (status === "loading") {
    return (
      <section className="checkout-panel">
        <h1 className="section-title">{t("cart.checking")}</h1>
      </section>
    );
  }

  if (status === "paid") {
    const amount =
      details?.amountTotal != null
        ? `$${(details.amountTotal / 100).toFixed(2)} ${String(
            details.currency || "cad"
          ).toUpperCase()}`
        : null;

    return (
      <section className="checkout-panel checkout-panel--success">
        <p className="checkout-eyebrow">{t("checkout.successEyebrow")}</p>
        <h1 className="section-title">{t("checkout.successTitle")}</h1>
        <p>
          {amount ? `${amount}. ` : null}
          {details?.customerEmail || ""}
        </p>
        <div className="checkout-actions">
          <Link href="/orders" className="catalog-empty__btn">
            {t("checkout.viewOrders")}
          </Link>
          <Link href="/search" className="settings-btn-secondary">
            {t("checkout.continue")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-panel">
      <h1 className="section-title">{t("checkout.cancelTitle")}</h1>
      <div className="checkout-actions">
        <Link href="/cart" className="catalog-empty__btn">
          {t("checkout.backCart")}
        </Link>
      </div>
    </section>
  );
}
