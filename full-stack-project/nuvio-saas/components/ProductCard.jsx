"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import { localizeProduct } from "@/lib/i18n/catalog";
import Tilt3D from "./Tilt3D";

export default function ProductCard({ product }) {
  const { language, t } = useI18n();
  const localized = localizeProduct(product, language);

  return (
    <Tilt3D>
      <Link href={`/product/${localized.id}`} className="product-card-3d">
        <div className="product-card-3d__media">
          <Image
            src={localized.image}
            alt={localized.name}
            fill
            className="object-cover"
            sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, (max-width: 1660px) 25vw, (max-width: 3840px) 16vw, 10vw"
          />
        </div>

        <div className="product-card-3d__body">
          <span className="product-card-3d__cat">{localized.categoryLabel}</span>
          <h3 className="product-card-3d__name line-clamp-2">{localized.name}</h3>
          <p className="product-card-3d__desc line-clamp-2">
            {localized.description}
          </p>
          <p className="product-card-3d__price">${localized.price}</p>
          <p className="product-card-3d__hint">{t("product.viewDetails")}</p>
        </div>
      </Link>
    </Tilt3D>
  );
}
