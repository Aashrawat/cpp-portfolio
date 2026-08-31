"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { DELIVERY_COUNTRIES } from "@/lib/countries";

function Status({ message, tone = "ok" }) {
  if (!message) return null;
  return (
    <p className={`settings-status settings-status--${tone}`} role="status">
      {message}
    </p>
  );
}

export default function HelpSettingsPanel() {
  const router = useRouter();
  const { clearCart, cartCount } = useCart();
  const { t, language, setLanguage, languages } = useI18n();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Canada",
    marketingEmails: false,
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);

  const [emailForm, setEmailForm] = useState({ email: "", password: "" });
  const [emailMsg, setEmailMsg] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);

  const [languageMsg, setLanguageMsg] = useState("");

  const [cartMsg, setCartMsg] = useState("");

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteErr, setDeleteErr] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/settings")
      .then(async (res) => {
        if (!res.ok) {
          router.replace("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.user) return;
        setUser(data.user);
        setProfile({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          street: data.user.street || "",
          city: data.user.city || "",
          postalCode: data.user.postalCode || "",
          country: data.user.country || data.user.deliveryCountry || "Canada",
          marketingEmails: Boolean(data.user.marketingEmails),
        });
        setEmailForm((prev) => ({ ...prev, email: data.user.email || "" }));
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function saveProfile(e) {
    e.preventDefault();
    setProfileBusy(true);
    setProfileMsg("");
    setProfileErr("");

    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    setProfileBusy(false);

    if (!res.ok) {
      setProfileErr(data.message || "Could not update profile");
      return;
    }

    setUser(data.user);
    setProfileMsg(data.message || "Profile updated");
    router.refresh();
  }

  async function saveEmail(e) {
    e.preventDefault();
    setEmailBusy(true);
    setEmailMsg("");
    setEmailErr("");

    const res = await fetch("/api/auth/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailForm),
    });
    const data = await res.json();
    setEmailBusy(false);

    if (!res.ok) {
      setEmailErr(data.message || "Could not update email");
      return;
    }

    setUser(data.user);
    setEmailForm({ email: data.user.email, password: "" });
    setEmailMsg(data.message || "Email updated");
    router.refresh();
  }

  async function savePassword(e) {
    e.preventDefault();
    setPasswordBusy(true);
    setPasswordMsg("");
    setPasswordErr("");

    const res = await fetch("/api/auth/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordForm),
    });
    const data = await res.json();
    setPasswordBusy(false);

    if (!res.ok) {
      setPasswordErr(data.message || "Could not update password");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordMsg(data.message || "Password updated");
  }

  function saveLanguage(e) {
    e.preventDefault();
    setLanguage(language);
    setLanguageMsg(t("settings.languageSaved"));
  }

  function handleLanguageChange(code) {
    setLanguage(code);
    setLanguageMsg(t("settings.languageSaved"));
  }

  function handleClearCart() {
    clearCart();
    setCartMsg(t("settings.cartCleared"));
  }

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    if (
      !window.confirm(
        "Delete your Nuvio account permanently? This cannot be undone."
      )
    ) {
      return;
    }

    setDeleteBusy(true);
    setDeleteErr("");

    const res = await fetch("/api/auth/account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: deletePassword }),
    });
    const data = await res.json();
    setDeleteBusy(false);

    if (!res.ok) {
      setDeleteErr(data.message || "Could not delete account");
      return;
    }

    clearCart();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <section className="settings-loading">
        <p>Loading your settings…</p>
      </section>
    );
  }

  if (!user) return null;

  return (
    <div className="settings-grid">
      <aside className="settings-nav">
        <p className="settings-nav__label">{t("settings.jump")}</p>
        <a href="#profile">{t("settings.profile")}</a>
        <a href="#email">{t("settings.email")}</a>
        <a href="#password">{t("settings.password")}</a>
        <a href="#preferences">{t("settings.preferences")}</a>
        <a href="#help">{t("settings.help")}</a>
        <a href="#danger">{t("settings.danger")}</a>
      </aside>

      <div className="settings-panels">
        <section id="profile" className="settings-card">
          <h2>{t("settings.profile")}</h2>
          <p className="settings-card__sub">
            Update your name and delivery address. Deliver to uses this address
            for where products should be sent.
          </p>
          <form onSubmit={saveProfile} className="settings-form">
            <div className="settings-form__row">
              <label>
                <span>{t("auth.firstName")}</span>
                <input
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                  }
                  required
                />
              </label>
              <label>
                <span>{t("auth.lastName")}</span>
                <input
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                />
              </label>
            </div>
            <label>
              <span>{t("auth.street")}</span>
              <input
                value={profile.street}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, street: e.target.value }))
                }
                required
              />
            </label>
            <div className="settings-form__row">
              <label>
                <span>{t("auth.city")}</span>
                <input
                  value={profile.city}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, city: e.target.value }))
                  }
                  required
                />
              </label>
              <label>
                <span>{t("auth.postalCode")}</span>
                <input
                  value={profile.postalCode}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, postalCode: e.target.value }))
                  }
                  required
                />
              </label>
            </div>
            <label>
              <span>{t("auth.country")}</span>
              <select
                value={profile.country}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    country: e.target.value,
                  }))
                }
              >
                {DELIVERY_COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            {user?.deliveryLabel ? (
              <p className="settings-card__sub">
                Current Deliver to: <strong>{user.deliveryLabel}</strong>
              </p>
            ) : null}
            <label className="settings-check">
              <input
                type="checkbox"
                checked={profile.marketingEmails}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    marketingEmails: e.target.checked,
                  }))
                }
              />
              <span>Send me Nuvio deals and product updates by email</span>
            </label>
            <Status message={profileErr} tone="err" />
            <Status message={profileMsg} />
            <button type="submit" disabled={profileBusy}>
              {profileBusy ? t("settings.saving") : t("settings.saveProfile")}
            </button>
          </form>
        </section>

        <section id="email" className="settings-card">
          <h2>{t("settings.email")}</h2>
          <p className="settings-card__sub">
            Change the email you use to sign in. Confirm with your current
            password.
          </p>
          <form onSubmit={saveEmail} className="settings-form">
            <label>
              <span>New email</span>
              <input
                type="email"
                value={emailForm.email}
                onChange={(e) =>
                  setEmailForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </label>
            <label>
              <span>Current password</span>
              <input
                type="password"
                value={emailForm.password}
                onChange={(e) =>
                  setEmailForm((f) => ({ ...f, password: e.target.value }))
                }
                required
                autoComplete="current-password"
              />
            </label>
            <Status message={emailErr} tone="err" />
            <Status message={emailMsg} />
            <button type="submit" disabled={emailBusy}>
              {emailBusy ? "Updating…" : "Update email"}
            </button>
          </form>
        </section>

        <section id="password" className="settings-card">
          <h2>{t("settings.password")}</h2>
          <p className="settings-card__sub">
            Choose a new password with at least 6 characters.
          </p>
          <form onSubmit={savePassword} className="settings-form">
            <label>
              <span>Current password</span>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    currentPassword: e.target.value,
                  }))
                }
                required
                autoComplete="current-password"
              />
            </label>
            <label>
              <span>New password</span>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    newPassword: e.target.value,
                  }))
                }
                required
                autoComplete="new-password"
              />
            </label>
            <label>
              <span>Confirm new password</span>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    confirmPassword: e.target.value,
                  }))
                }
                required
                autoComplete="new-password"
              />
            </label>
            <Status message={passwordErr} tone="err" />
            <Status message={passwordMsg} />
            <button type="submit" disabled={passwordBusy}>
              {passwordBusy ? t("settings.saving") : t("settings.updatePassword")}
            </button>
          </form>
        </section>

        <section id="preferences" className="settings-card">
          <h2>{t("settings.preferences")}</h2>
          <p className="settings-card__sub">
            {t("settings.preferencesHint")}
          </p>
          <form onSubmit={saveLanguage} className="settings-form">
            <label>
              <span>{t("settings.language")}</span>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </label>
            <Status message={languageMsg} />
            <button type="submit">{t("settings.saveLanguage")}</button>
          </form>

          <div className="settings-divider" />

          <p className="settings-card__sub">
            {t("settings.cartCount", { count: cartCount })}
          </p>
          <Status message={cartMsg} />
          <button
            type="button"
            className="settings-btn-secondary"
            onClick={handleClearCart}
          >
            {t("settings.clearCart")}
          </button>
        </section>

        <section id="help" className="settings-card">
          <h2>{t("settings.help")}</h2>
          <p className="settings-card__sub">
            Quick links for shopping and support on Nuvio.
          </p>
          <div className="settings-links">
            <Link href="/faq">FAQ</Link>
            <Link href="/search">Browse products</Link>
            <Link href="/cart">Your cart</Link>
            <Link href="/orders">Your orders</Link>
            <Link href="/welcome">Account welcome</Link>
          </div>
        </section>

        <section id="danger" className="settings-card settings-card--danger">
          <h2>{t("settings.danger")}</h2>
          <p className="settings-card__sub">
            Sign out anytime, or permanently delete your Nuvio account.
          </p>
          <button
            type="button"
            className="settings-btn-secondary"
            onClick={handleSignOut}
          >
            {t("settings.signOut")}
          </button>

          <div className="settings-divider" />

          <form onSubmit={handleDeleteAccount} className="settings-form">
            <label>
              <span>Confirm with password to delete account</span>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </label>
            <Status message={deleteErr} tone="err" />
            <button
              type="submit"
              className="settings-btn-danger"
              disabled={deleteBusy}
            >
              {deleteBusy ? t("settings.saving") : t("settings.delete")}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
