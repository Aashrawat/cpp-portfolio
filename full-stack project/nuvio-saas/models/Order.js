import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, default: "" },
    unitAmount: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    email: { type: String, required: true },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String, default: "" },
    currency: { type: String, default: "cad" },
    amountTotal: { type: Number, required: true },
    items: { type: [orderItemSchema], default: [] },
    status: {
      type: String,
      enum: ["paid", "refund_requested", "refunded"],
      default: "paid",
      index: true,
    },
    refundReason: { type: String, default: "" },
    refundedAt: { type: Date, default: null },
    stripeRefundId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
