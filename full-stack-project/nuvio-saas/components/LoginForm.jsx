"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { useI18n } from "@/context/I18nContext";

export default function LoginForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    router.push("/search");
    router.refresh();
  }

  return (
    <AuthShell
      brandLine={t("auth.brandLogin")}
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      footer={
        <p>
          {t("auth.login.new")}{" "}
          <Link href="/signup" className="auth-shell__link">
            {t("auth.login.create")}
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
        <label className="auth-field">
          <span>{t("auth.email")}</span>
          <input
            type="email"
            name="email"
            required
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
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </label>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? t("auth.login.loading") : t("auth.login.submit")}
        </button>
      </form>
    </AuthShell>
  );
}
