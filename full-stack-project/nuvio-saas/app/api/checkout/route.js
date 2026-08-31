import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { getAppUrl, getStripe } from "@/lib/stripe";
import { checkoutSchema, parseWithZod } from "@/lib/validation";
import { scoreCheckoutFraud } from "@/lib/ai/fraud";

export async function POST(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to checkout" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = parseWithZod(checkoutSchema, body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.message }, { status: 400 });
    }

    const productsById = new Map();
    for (const item of parsed.data.items) {
      const product = getProductById(item.id);
      if (product) productsById.set(item.id, product);
    }

    const fraud = scoreCheckoutFraud({
      items: parsed.data.items,
      productsById,
      user,
    });

    if (fraud.blocked) {
      return NextResponse.json(
        {
          message:
            "This order looks unusual and was paused by fraud checks. Reduce quantities or try a smaller cart.",
          fraud,
        },
        { status: 403 }
      );
    }

    const line_items = [];

    for (const item of parsed.data.items) {
      const product = getProductById(item.id);
      if (!product) {
        return NextResponse.json(
          { message: `Unknown product: ${item.id}` },
          { status: 400 }
        );
      }

      const unitAmount = Math.round(Number(product.price) * 100);

      if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
        return NextResponse.json(
          { message: `Invalid price for ${product.name}` },
          { status: 400 }
        );
      }

      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "cad",
          unit_amount: unitAmount,
          product_data: {
            name: product.name,
            description: product.description.slice(0, 200),
            images: product.image ? [product.image] : [],
            metadata: {
              productId: product.id,
              category: product.category,
            },
          },
        },
      });
    }

    const stripe = getStripe();
    const appUrl = getAppUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: {
        userId: user._id.toString(),
        email: user.email,
        street: user.street || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || user.deliveryCountry || "",
        fraudLevel: fraud.level,
        fraudScore: String(fraud.score),
      },
      shipping_address_collection: {
        allowed_countries: [
          "CA",
          "US",
          "GB",
          "IN",
          "AU",
          "DE",
          "FR",
          "JP",
          "NP",
        ],
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: error.message || "Could not start checkout" },
      { status: 500 }
    );
  }
}
