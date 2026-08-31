export const LANGUAGE_STORAGE_KEY = "nuvio-language";

export const LANGUAGES = [
  { code: "en", label: "English - EN", short: "English", dir: "ltr" },
  { code: "fr", label: "Français - FR", short: "Français", dir: "ltr" },
  { code: "es", label: "Español - ES", short: "Español", dir: "ltr" },
  { code: "de", label: "Deutsch - DE", short: "Deutsch", dir: "ltr" },
  { code: "it", label: "Italiano - IT", short: "Italiano", dir: "ltr" },
  { code: "pt", label: "Português - PT", short: "Português", dir: "ltr" },
  { code: "nl", label: "Nederlands - NL", short: "Nederlands", dir: "ltr" },
  { code: "pl", label: "Polski - PL", short: "Polski", dir: "ltr" },
  { code: "sv", label: "Svenska - SV", short: "Svenska", dir: "ltr" },
  { code: "ar", label: "العربية - AR", short: "العربية", dir: "rtl" },
  { code: "zh", label: "中文 - ZH", short: "中文", dir: "ltr" },
  { code: "hi", label: "हिन्दी - HI", short: "हिन्दी", dir: "ltr" },
  { code: "ja", label: "日本語 - JA", short: "日本語", dir: "ltr" },
  { code: "ko", label: "한국어 - KO", short: "한국어", dir: "ltr" },
];

export function getLanguageMeta(code) {
  return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
}
