"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { DELIVERY_COUNTRIES } from "@/lib/countries";
import { useI18n } from "@/context/I18nContext";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const defaultEmail = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        street: formData.get("street"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    router.push("/search");
    router.refresh();
  }

  return (
    <AuthShell
      brandLine={t("auth.brandSignup")}
      title={t("auth.signup.title")}
      subtitle={t("auth.signup.subtitle")}
      footer={
        <p>
          {t("auth.signup.haveAccount")}{" "}
          <Link href="/login" className="auth-shell__link">
            {t("auth.signup.signin")}
          </Link>
        </p>
      }
    >
      {error ? (
        <p className="auth-shell__error" role="alert">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__row">
          <label className="auth-field">
            <span>{t("auth.firstName")}</span>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder="Aashrawat"
            />
          </label>

          <label className="auth-field">
            <span>
              {t("auth.lastName")}{" "}
              <em className="auth-field__optional">{t("auth.optional")}</em>
            </span>
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              placeholder="Shrestha"
            />
          </label>
        </div>

        <label className="auth-field">
          <span>{t("auth.email")}</span>
          <input
            type="email"
            name="email"
            required
            defaultValue={defaultEmail}
            autoComplete="email"
            placeholder="you@email.com"
          />
        </label>

        <label className="auth-field">
          <span>{t("auth.password")}</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </label>

        <label className="auth-field">
          <span>{t("auth.confirmPassword")}</span>
          <input
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </label>

        <p className="auth-form__section">{t("auth.deliveryAddress")}</p>

        <label className="auth-field">
          <span>{t("auth.street")}</span>
          <input
            type="text"
            name="street"
            required
            autoComplete="street-address"
            placeholder="123 Main Street"
          />
        </label>

        <div className="auth-form__row">
          <label className="auth-field">
            <span>{t("auth.city")}</span>
            <input
              type="text"
              name="city"
              required
              autoComplete="address-level2"
              placeholder="Toronto"
            />
          </label>

          <label className="auth-field">
            <span>{t("auth.postalCode")}</span>
            <input
              type="text"
              name="postalCode"
              required
              autoComplete="postal-code"
              placeholder="M5V 2T6"
            />
          </label>
        </div>

        <label className="auth-field">
          <span>{t("auth.country")}</span>
          <select name="country" required defaultValue="Canada" autoComplete="country-name">
            {DELIVERY_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? t("auth.signup.loading") : t("auth.signup.submit")}
        </button>
      </form>
    </AuthShell>
  );
}
