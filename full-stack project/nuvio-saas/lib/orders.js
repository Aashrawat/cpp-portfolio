import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getStripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/emails/orderConfirmationEmail";

export async function upsertPaidOrderFromSession(session, user) {
  if (session.payment_status !== "paid") return null;

  await connectDB();

  const existing = await Order.findOne({ stripeSessionId: session.id });
  if (existing) return existing;

  const stripe = getStripe();
  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product", "payment_intent"],
  });

  const paymentIntentId =
    typeof full.payment_intent === "string"
      ? full.payment_intent
      : full.payment_intent?.id || "";

  const items = (full.line_items?.data || []).map((line) => {
    const product = line.price?.product;
    const productMeta =
      product && typeof product === "object" ? product.metadata || {} : {};
    const images =
      product && typeof product === "object" && Array.isArray(product.images)
        ? product.images
        : [];

    return {
      productId: productMeta.productId || line.id,
      name:
        (product && typeof product === "object" && product.name) ||
        line.description ||
        "Product",
      image: images[0] || "",
      unitAmount: line.price?.unit_amount || 0,
      quantity: line.quantity || 1,
    };
  });

  const order = await Order.create({
    userId: user._id,
    email: user.email,
    stripeSessionId: session.id,
    stripePaymentIntentId: paymentIntentId,
    currency: full.currency || "cad",
    amountTotal: full.amount_total || 0,
    items,
    status: "paid",
  });

  void sendOrderConfirmationEmail({ user, order });

  return order;
}

export function serializeOrder(order) {
  const doc = order.toObject ? order.toObject() : order;
  return {
    id: doc._id.toString(),
    email: doc.email,
    currency: doc.currency,
    amountTotal: doc.amountTotal,
    items: doc.items,
    status: doc.status,
    refundReason: doc.refundReason || "",
    refundedAt: doc.refundedAt,
    createdAt: doc.createdAt,
    stripeSessionId: doc.stripeSessionId,
  };
}
