import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { getStripe } from "@/lib/stripe";
import { serializeOrder } from "@/lib/orders";
import { parseWithZod, refundSchema } from "@/lib/validation";

export async function POST(request, { params }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ message: "Please sign in" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = parseWithZod(refundSchema, body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.message }, { status: 400 });
    }

    const reason = parsed.data.reason;

    await connectDB();
    const order = await Order.findOne({ _id: id, userId: user._id });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status !== "paid") {
      return NextResponse.json(
        {
          message:
            order.status === "refunded"
              ? "This order was already refunded."
              : "A refund has already been requested for this order.",
        },
        { status: 400 }
      );
    }

    if (!order.stripePaymentIntentId) {
      return NextResponse.json(
        { message: "This order cannot be refunded through Stripe." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const refund = await stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
      reason: "requested_by_customer",
      metadata: {
        orderId: order._id.toString(),
        userId: user._id.toString(),
        reason,
      },
    });

    order.status = "refunded";
    order.refundReason = reason;
    order.refundedAt = new Date();
    order.stripeRefundId = refund.id;
    await order.save();

    return NextResponse.json({
      message: "Refund processed successfully",
      order: serializeOrder(order),
    });
  } catch (error) {
    console.error("Refund error:", error);
    return NextResponse.json(
      { message: error.message || "Could not process refund" },
      { status: 500 }
    );
  }
}
