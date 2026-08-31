import Link from "next/link";
import HelpSettingsPanel from "@/components/HelpSettingsPanel";
import T from "@/components/T";

export const metadata = {
  title: "Help & Settings · Nuvio",
  description: "Manage your Nuvio account, password, email, and preferences.",
};

export default function SettingsPage() {
  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/search" className="catalog-hero__back">
            <T k="settings.back" as="fragment" />
          </Link>
          <T as="p" className="catalog-hero__eyebrow" k="settings.eyebrow" />
          <T as="h1" className="catalog-hero__title" k="settings.title" />
          <T as="p" className="catalog-hero__sub" k="settings.sub" />
        </div>
      </header>

      <div className="content-wrap catalog-body">
        <HelpSettingsPanel />
      </div>
    </div>
  );
}
