"use client";

import { useI18n } from "@/context/I18nContext";

export default function T({ k, values, as: Tag = "span", className, ...rest }) {
  const { t } = useI18n();
  if (Tag === "fragment") {
    return <>{t(k, values)}</>;
  }
  return (
    <Tag className={className} {...rest}>
      {t(k, values)}
    </Tag>
  );
}
