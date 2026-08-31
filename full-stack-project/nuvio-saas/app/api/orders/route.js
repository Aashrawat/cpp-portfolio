import { NextResponse } from "next/server";
import { listUserOrders } from "@/controllers/orderController";

export async function GET() {
  try {
    const result = await listUserOrders();
    const { status, message, ...data } = result;
    return NextResponse.json(message ? { message, ...data } : data, { status });
  } catch (error) {
    console.error("Orders list error:", error);
    return NextResponse.json(
      { message: error.message || "Could not load orders" },
      { status: 500 }
    );
  }
}
