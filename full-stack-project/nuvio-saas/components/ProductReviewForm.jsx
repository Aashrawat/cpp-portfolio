"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

export default function ProductReviewForm({
  productId,
  authReady,
  userReview,
  isLoggedIn,
  onSubmitted,
  onDeleted,
}) {
  const { t } = useI18n();
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState(userReview?.text || "");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setText(userReview.text);
    } else {
      setRating(0);
      setText("");
    }
    setConfirmDelete(false);
    setSuccess("");
    setError("");
  }, [userReview]);

  const activeRating = hoverRating || rating;

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not save review");

      setSuccess(userReview ? t("reviews.updated") : t("reviews.posted"));
      onSubmitted?.(data);
    } catch (err) {
      setError(err.message || "Could not save review");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (busy) return;

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `/api/reviews?productId=${encodeURIComponent(productId)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not delete review");

      setRating(0);
      setText("");
      setConfirmDelete(false);
      setSuccess(t("reviews.deleted"));
      onDeleted?.(data);
    } catch (err) {
      setError(err.message || "Could not delete review");
    } finally {
      setBusy(false);
    }
  }

  if (!authReady) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="review-form review-form--guest">
        <p>{t("reviews.signInPrompt")}</p>
        <Link href="/login" className="review-form__login">
          {t("reviews.signIn")}
        </Link>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4 className="review-form__title">
        {userReview ? t("reviews.editTitle") : t("reviews.writeTitle")}
      </h4>

      <fieldset className="review-form__stars">
        <legend className="sr-only">{t("reviews.rateProduct")}</legend>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={`review-form__star${activeRating >= value ? " is-active" : ""}`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${value} ${t("reviews.stars")}`}
          >
            ★
          </button>
        ))}
        {activeRating ? (
          <span className="review-form__rating-label">
            {activeRating} / 5
          </span>
        ) : (
          <span className="review-form__rating-label review-form__rating-label--muted">
            {t("reviews.chooseRating")}
          </span>
        )}
      </fieldset>

      <label className="review-form__label" htmlFor={`review-${productId}`}>
        {t("reviews.yourReview")}
      </label>
      <textarea
        id={`review-${productId}`}
        className="review-form__textarea"
        rows={4}
        maxLength={500}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={t("reviews.placeholder")}
        required
      />

      {error ? <p className="review-form__error">{error}</p> : null}
      {success ? <p className="review-form__success">{success}</p> : null}

      <div className="review-form__actions">
        <button type="submit" className="review-form__submit" disabled={busy || rating < 1}>
          {busy
            ? t("reviews.saving")
            : userReview
              ? t("reviews.update")
              : t("reviews.submit")}
        </button>

        {userReview ? (
          confirmDelete ? (
            <div className="review-form__confirm">
              <p>{t("reviews.deleteConfirm")}</p>
              <div className="review-form__confirm-actions">
                <button
                  type="button"
                  className="review-form__delete review-form__delete--confirm"
                  onClick={handleDelete}
                  disabled={busy}
                >
                  {busy ? t("reviews.deleting") : t("reviews.deleteYes")}
                </button>
                <button
                  type="button"
                  className="review-form__cancel"
                  onClick={() => setConfirmDelete(false)}
                  disabled={busy}
                >
                  {t("reviews.deleteNo")}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="review-form__delete"
              onClick={() => setConfirmDelete(true)}
              disabled={busy}
            >
              {t("reviews.delete")}
            </button>
          )
        ) : null}
      </div>
    </form>
  );
}
