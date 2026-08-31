"use client";

import { useMemo } from "react";
import { useI18n } from "@/context/I18nContext";
import {
  localizeCategory,
  localizeProduct,
  localizeCategories,
  localizeProducts,
} from "@/lib/i18n/catalog";

export function useCatalogI18n() {
  const { language } = useI18n();

  return useMemo(
    () => ({
      language,
      localizeProduct: (product) => localizeProduct(product, language),
      localizeCategory: (category) => localizeCategory(category, language),
      localizeCategories: (list) => localizeCategories(list, language),
      localizeProducts: (list) => localizeProducts(list, language),
    }),
    [language]
  );
}
