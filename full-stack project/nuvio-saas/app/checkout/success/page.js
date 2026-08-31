import { Suspense } from "react";
import CheckoutSuccessContent from "@/components/CheckoutSuccessContent";

export const metadata = {
  title: "Payment successful · Nuvio",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="content-wrap" style={{ paddingBlock: "2rem" }}>
      <Suspense
        fallback={
          <section className="checkout-panel">
            <p>Loading…</p>
          </section>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
