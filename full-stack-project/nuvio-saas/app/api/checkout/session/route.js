import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { getStripe } from "@/lib/stripe";
import { serializeOrder, upsertPaidOrderFromSession } from "@/lib/orders";

export async function GET(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ message: "Please sign in" }, { status: 401 });
    }

    const sessionId = request.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ message: "Missing session id" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.userId && session.metadata.userId !== user._id.toString()) {
      return NextResponse.json(
        { message: "Session does not match this account" },
        { status: 403 }
      );
    }

    let order = null;
    if (session.payment_status === "paid") {
      order = await upsertPaidOrderFromSession(session, user);
    }

    return NextResponse.json({
      status: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email || session.customer_email,
      order: order ? serializeOrder(order) : null,
    });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { message: error.message || "Could not load payment session" },
      { status: 500 }
    );
  }
}
