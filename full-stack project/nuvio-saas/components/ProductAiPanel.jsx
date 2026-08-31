"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import ProductReviewForm from "@/components/ProductReviewForm";

export default function ProductAiPanel({ productId }) {
  const { t } = useI18n();
  const [desc, setDesc] = useState("");
  const [descBusy, setDescBusy] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState("");
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [reviewBusy, setReviewBusy] = useState(true);
  const [descError, setDescError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIsLoggedIn(Boolean(data.user));
      })
      .finally(() => {
        if (!cancelled) setAuthReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loadDescription = useCallback(async () => {
    setDescBusy(true);
    setDescError("");
    try {
      const res = await fetch("/api/ai/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not load overview");
      setDesc(data.description || "");
    } catch (err) {
      setDescError(err.message || "Could not load overview");
    } finally {
      setDescBusy(false);
    }
  }, [productId]);

  const loadReviews = useCallback(async () => {
    setReviewBusy(true);
    setReviewError("");
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not load reviews");
      setReviews(data.reviews || []);
      setSummary(data.summary || "");
      setAverage(data.average || 0);
      setCount(data.count || 0);
      setUserReview(data.userReview || null);
      if (data.isLoggedIn) setIsLoggedIn(true);
    } catch (err) {
      setReviewError(err.message || "Could not load reviews");
    } finally {
      setReviewBusy(false);
    }
  }, [productId]);

  useEffect(() => {
    loadDescription();
  }, [loadDescription]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  function handleReviewSubmitted(data) {
    setReviews(data.reviews || []);
    setSummary(data.summary || "");
    setAverage(data.average || 0);
    setCount(data.count || 0);
    setUserReview(data.userReview || null);
    setIsLoggedIn(true);
  }

  function handleReviewDeleted(data) {
    setReviews(data.reviews || []);
    setSummary(data.summary || "");
    setAverage(data.average || 0);
    setCount(data.count || 0);
    setUserReview(null);
    setIsLoggedIn(true);
  }

  return (
    <>
      {descBusy ? (
        <p className="product-detail__desc product-detail__desc--loading">
          {t("product.loadingOverview")}
        </p>
      ) : descError ? (
        <p className="product-detail__desc product-detail__desc--error">{descError}</p>
      ) : (
        <p className="product-detail__desc">{desc}</p>
      )}

      <div className="ai-panel">
        <section className="ai-panel__card ai-panel__card--reviews">
          <div className="ai-reviews__head">
            <h3>{t("ai.reviews")}</h3>
            {count ? (
              <p>
                {average} / 5 · {count} {t("ai.reviewsCount")}
              </p>
            ) : null}
          </div>

          <ProductReviewForm
            productId={productId}
            authReady={authReady}
            isLoggedIn={isLoggedIn}
            userReview={userReview}
            onSubmitted={handleReviewSubmitted}
            onDeleted={handleReviewDeleted}
          />

          {reviewBusy ? <p className="ai-panel__loading">{t("reviews.loading")}</p> : null}
          {reviewError ? <p className="ai-panel__error">{reviewError}</p> : null}
          {!reviewBusy && summary ? (
            <p className="ai-reviews__summary">
              <strong>{t("ai.summary")}:</strong> {summary}
            </p>
          ) : null}
          <ul className="ai-reviews__list">
            {reviews.map((review) => (
              <li key={review.id} className={review.isOwn ? "ai-reviews__item--own" : undefined}>
                <p className="ai-reviews__meta">
                  {review.author} · {review.rating}/5
                  {review.isOwn ? (
                    <span className="ai-reviews__badge">{t("reviews.yours")}</span>
                  ) : review.isCustomer ? (
                    <span className="ai-reviews__badge ai-reviews__badge--customer">
                      {t("reviews.customer")}
                    </span>
                  ) : null}
                </p>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
