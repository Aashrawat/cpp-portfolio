"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

function CartLink({ className = "" }) {
  const { cartCount } = useCart();
  const { t } = useI18n();

  return (
    <Link href="/cart" className={`relative ${className}`}>
      <span className="text-orange-400 text-lg leading-none">🛒</span>
      <span className="ml-1">{t("nav.cart")}</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

export default function UserNav() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);
  const { t, language, setLanguage, languages } = useI18n();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setAccountOpen(false);
        setLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMenus() {
    setAccountOpen(false);
    setLanguageOpen(false);
  }

  function handleLanguageSelect(code) {
    setLanguage(code);
    closeMenus();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    closeMenus();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <div className="w-24 h-8 shrink-0" />;
  }

  if (!user) {
    return (
      <nav className="user-nav">
        <Link href="/login" className="hover:text-orange-400">
          {t("nav.login")}
        </Link>
        <Link href="/signup" className="hover:text-orange-400">
          {t("nav.signup")}
        </Link>
      </nav>
    );
  }

  const firstName = user.firstName || "User";
  const currentLabel =
    languages.find((lang) => lang.code === language)?.short || "English";

  return (
    <nav ref={navRef} className="user-nav">
      <div className="relative hidden sm:block">
        <button
          type="button"
          onClick={() => {
            setLanguageOpen((open) => !open);
            setAccountOpen(false);
          }}
          className="flex items-center gap-1 px-1 py-0.5 rounded hover:outline hover:outline-1 hover:outline-white/40 text-left"
          aria-expanded={languageOpen}
          aria-haspopup="listbox"
        >
          <span className="text-base" aria-hidden="true">
            🌐
          </span>
          <span className="font-bold leading-tight user-nav__text-hide">
            {currentLabel}
          </span>
        </button>

        {languageOpen && (
          <div className="lang-menu">
            <p className="lang-menu__label">{t("nav.chooseLanguage")}</p>
            <div className="lang-menu__options" role="listbox">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`lang-menu__option${
                    language === lang.code ? " is-active" : ""
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setAccountOpen((open) => !open);
            setLanguageOpen(false);
          }}
          className="px-1 py-0.5 rounded hover:outline hover:outline-1 hover:outline-white/40 text-left leading-tight"
          aria-expanded={accountOpen}
          aria-haspopup="menu"
          aria-label="Account menu"
        >
          <span className="block text-xs text-gray-300 truncate max-w-[6.5rem] sm:max-w-none">
            {t("nav.hello", { name: firstName })}
          </span>
          <span className="block font-bold">{t("nav.account")} ▾</span>
        </button>

        {accountOpen && (
          <div className="absolute right-0 top-full mt-2 w-[min(13rem,85vw)] bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold">
                {t("nav.hello", { name: firstName })}
              </p>
              <p className="text-sm text-gray-600">{t("nav.yourAccount")}</p>
            </div>
            <Link
              href="/orders"
              onClick={closeMenus}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-600"
            >
              {t("nav.orders")}
            </Link>
            <Link
              href="/faq"
              onClick={closeMenus}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-600"
            >
              {t("nav.faq")}
            </Link>
            <Link
              href="/settings"
              onClick={closeMenus}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-600"
            >
              {t("nav.settings")}
            </Link>
            <div className="border-t border-gray-100 my-1" />
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-600"
            >
              {t("nav.signOut")}
            </button>
          </div>
        )}
      </div>

      <CartLink className="flex items-end gap-1 font-bold hover:text-orange-400 px-1" />
    </nav>
  );
}
