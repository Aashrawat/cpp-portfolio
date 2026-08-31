"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { FOOTER_COLUMNS } from "@/lib/footerLinks";
import { SOCIAL_LINKS } from "@/lib/socialLinks";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  const { t } = useI18n();
  const socialLinks = SOCIAL_LINKS.map((link) => ({
    ...link,
    label: t(link.labelKey),
  }));

  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-wrap">
        <div className="site-footer__main">
          <div className="site-footer__grid">
            {FOOTER_COLUMNS.map((column) =>
              column.legal ? (
                <div key={column.titleKey} className="site-footer__col site-footer__col--legal">
                  <Link href={column.href} className="site-footer__legal-link">
                    {t(column.titleKey)}
                  </Link>
                </div>
              ) : (
                <div key={column.titleKey} className="site-footer__col">
                  <h3 className="site-footer__col-title">{t(column.titleKey)}</h3>
                  <ul className="site-footer__links">
                    {column.links.map((link) => (
                      <li key={link.labelKey}>
                        <Link href={link.href}>{t(link.labelKey)}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          <SocialIcons links={socialLinks} label={t("footer.socialNav")} />
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  );
}
