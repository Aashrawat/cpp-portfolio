import CheckoutCancelContent from "@/components/CheckoutCancelContent";

export const metadata = {
  title: "Checkout canceled · Nuvio",
};

export default function CheckoutCancelPage() {
  return (
    <div className="content-wrap" style={{ paddingBlock: "2rem" }}>
      <CheckoutCancelContent />
    </div>
  );
}
