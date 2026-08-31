"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/context/I18nContext";

export default function DeliverTo() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [pathname]);

  if (!user) return null;

  const label =
    user.deliveryLabel || user.city || user.country || t("deliver.addAddress");
  const fullAddress = user.fullAddress || label;

  return (
    <div
      className="hidden sm:flex items-start gap-1 shrink-0 hover:outline hover:outline-1 hover:outline-white/40 rounded px-1 py-0.5 cursor-default"
      title={fullAddress}
    >
      <span className="text-lg leading-none mt-0.5" aria-hidden="true">
        📍
      </span>
      <div className="leading-tight min-w-0">
        <p className="text-xs text-gray-300">{t("deliver.to")}</p>
        <p className="text-sm font-bold truncate max-w-[9rem] lg:max-w-[12rem]">
          {label}
        </p>
      </div>
    </div>
  );
}
