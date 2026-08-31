import { Suspense } from "react";
import CatalogPageContent from "@/components/CatalogPageContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="catalog-page">
          <div className="content-wrap catalog-body">
            <p>Loading…</p>
          </div>
        </div>
      }
    >
      <CatalogPageContent />
    </Suspense>
  );
}
