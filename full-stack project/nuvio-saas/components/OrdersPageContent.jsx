"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "@/context/I18nContext";
import { localizeProduct } from "@/lib/i18n/catalog";
import { getProductById } from "@/lib/products";

function formatMoney(cents, currency = "cad") {
  return `$${(Number(cents || 0) / 100).toFixed(2)} ${String(currency).toUpperCase()}`;
}

export default function OrdersPageContent() {
  const router = useRouter();
  const { t, language } = useI18n();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [refundFor, setRefundFor] = useState(null);
  const [reason, setReason] = useState("");
  const [busyId, setBusyId] = useState("");
  const [formError, setFormError] = useState("");

  function statusLabel(status) {
    if (status === "refunded") return t("orders.refunded");
    if (status === "refund_requested") return t("orders.refundRequested");
    return t("orders.paid");
  }

  useEffect(() => {
    fetch("/api/orders")
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/login");
          return null;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load orders");
        return data;
      })
      .then((data) => {
        if (data) setOrders(data.orders || []);
      })
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, [router]);

  async function submitRefund(e) {
    e.preventDefault();
    if (!refundFor) return;

    setBusyId(refundFor);
    setFormError("");

    try {
      const res = await fetch(`/api/orders/${refundFor}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Refund failed");
        setBusyId("");
        return;
      }

      setOrders((current) =>
        current.map((order) => (order.id === refundFor ? data.order : order))
      );
      setRefundFor(null);
      setReason("");
    } catch {
      setFormError("Could not request refund. Try again.");
    } finally {
      setBusyId("");
    }
  }

  if (loading) {
    return (
      <section className="orders-panel">
        <p>{t("cart.checking")}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="orders-panel">
        <h1 className="section-title">{t("orders.title")}</h1>
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="orders-panel">
        <h1 className="section-title">{t("orders.title")}</h1>
        <p className="mb-4 text-gray-600">{t("orders.empty")}</p>
        <Link href="/search" className="catalog-empty__btn">
          {t("orders.browse")}
        </Link>
      </section>
    );
  }

  return (
    <section className="orders-panel">
      <h1 className="section-title">{t("orders.title")}</h1>
      <p className="orders-panel__sub">{t("orders.sub")}</p>

      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-card__head">
              <div>
                <p className="order-card__date">
                  {new Date(order.createdAt).toLocaleString(language)}
                </p>
                <p className="order-card__total">
                  {formatMoney(order.amountTotal, order.currency)}
                </p>
              </div>
              <span className={`order-badge order-badge--${order.status}`}>
                {statusLabel(order.status)}
              </span>
            </div>

            <ul className="order-items">
              {order.items.map((item, index) => {
                const catalogProduct = getProductById(item.productId);
                const localizedName = catalogProduct
                  ? localizeProduct(catalogProduct, language).name
                  : item.name;

                return (
                <li key={`${order.id}-${item.productId}-${index}`}>
                  <div className="order-item__media">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={localizedName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1660px) 56px, (max-width: 3840px) 88px, 120px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{localizedName}</p>
                    <p className="text-sm text-gray-500">
                      {t("orders.qty", { count: item.quantity })} ·{" "}
                      {formatMoney(item.unitAmount * item.quantity, order.currency)}
                    </p>
                  </div>
                </li>
                );
              })}
            </ul>

            {order.status === "paid" ? (
              refundFor === order.id ? (
                <form onSubmit={submitRefund} className="order-refund-form">
                  <label>
                    <span>{t("orders.refundWhy")}</span>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                      required
                      minLength={5}
                      placeholder="…"
                    />
                  </label>
                  {formError ? (
                    <p className="text-sm text-red-600" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <div className="order-refund-actions">
                    <button
                      type="submit"
                      disabled={busyId === order.id}
                      className="catalog-empty__btn"
                    >
                      {busyId === order.id
                        ? t("orders.processingRefund")
                        : t("orders.confirmRefund")}
                    </button>
                    <button
                      type="button"
                      className="settings-btn-secondary"
                      onClick={() => {
                        setRefundFor(null);
                        setReason("");
                        setFormError("");
                      }}
                    >
                      {t("orders.cancel")}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className="order-refund-btn"
                  onClick={() => {
                    setRefundFor(order.id);
                    setReason("");
                    setFormError("");
                  }}
                >
                  {t("orders.requestRefund")}
                </button>
              )
            ) : null}

            {order.status === "refunded" && order.refundReason ? (
              <p className="order-refund-note">
                {t("orders.refundReason", { reason: order.refundReason })}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
