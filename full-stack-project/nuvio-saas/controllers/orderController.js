import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { serializeOrder } from "@/lib/orders";

export async function listUserOrders() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { status: 401, message: "Please sign in" };
  }

  await connectDB();
  const orders = await Order.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return {
    status: 200,
    orders: orders.map((order) => serializeOrder(order)),
  };
}
