import OrdersPageContent from "@/components/OrdersPageContent";

export const metadata = {
  title: "Your Orders · Nuvio",
  description: "View paid Nuvio orders and request refunds.",
};

export default function OrdersPage() {
  return (
    <div className="content-wrap" style={{ paddingBlock: "1.5rem" }}>
      <OrdersPageContent />
    </div>
  );
}
