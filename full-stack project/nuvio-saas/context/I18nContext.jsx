"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getLanguageMeta,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
} from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/messages";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && LANGUAGES.some((lang) => lang.code === saved)) {
      setLanguageState(saved);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const meta = getLanguageMeta(language);
    document.documentElement.lang = language;
    document.documentElement.dir = meta.dir;
  }, [language, ready]);

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((lang) => lang.code === code)) return;
    setLanguageState(code);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  }, []);

  const t = useCallback(
    (key, vars) => translate(language, key, vars),
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languages: LANGUAGES,
      ready,
      dir: getLanguageMeta(language).dir,
    }),
    [language, setLanguage, t, ready]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
