import Link from "next/link";
import FaqList from "@/components/FaqList";
import T from "@/components/T";

export const metadata = {
  title: "FAQ · Nuvio",
  description: "Frequently asked questions about shopping on Nuvio.",
};

export default function FaqPage() {
  return (
    <div className="catalog-page">
      <header className="catalog-hero catalog-hero--product">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="catalog-hero__inner content-wrap">
          <Link href="/search" className="catalog-hero__back">
            <T k="faq.back" as="fragment" />
          </Link>
          <T as="p" className="catalog-hero__eyebrow" k="faq.eyebrow" />
          <T as="h1" className="catalog-hero__title" k="faq.title" />
          <T as="p" className="catalog-hero__sub" k="faq.sub" />
        </div>
      </header>

      <div className="content-wrap catalog-body">
        <FaqList />
      </div>
    </div>
  );
}
