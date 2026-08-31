"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

export default function CheckoutCancelContent() {
  const { t } = useI18n();

  return (
    <section className="checkout-panel">
      <p className="checkout-eyebrow">{t("checkout.cancelEyebrow")}</p>
      <h1 className="section-title">{t("checkout.cancelTitle")}</h1>
      <p>{t("checkout.cancelBody")}</p>
      <div className="checkout-actions">
        <Link href="/cart" className="catalog-empty__btn">
          {t("checkout.backCart")}
        </Link>
        <Link href="/search" className="settings-btn-secondary">
          {t("checkout.keepBrowsing")}
        </Link>
      </div>
    </section>
  );
}
