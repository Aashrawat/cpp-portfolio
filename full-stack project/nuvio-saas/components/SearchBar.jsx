"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/context/I18nContext";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const defaultQuery = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const placeholder = category
    ? t("search.products")
    : t("search.categories");

  return (
    <form className="search-form" action="/search" method="GET">
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <input
        type="text"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button type="submit">{t("search.button")}</button>
    </form>
  );
}
