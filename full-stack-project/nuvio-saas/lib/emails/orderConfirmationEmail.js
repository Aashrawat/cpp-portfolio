import { sendMailSafe } from "@/lib/mailgun";

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:8080";
}

function formatMoney(amountCents, currency = "cad") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format((amountCents || 0) / 100);
}

function buildItemLines(items = []) {
  return items.map((item) => {
    const lineTotal = (item.unitAmount || 0) * (item.quantity || 1);
    return {
      text: `- ${item.name} × ${item.quantity} — ${formatMoney(lineTotal)}`,
      html: `<li>${item.name} × ${item.quantity} — <strong>${formatMoney(lineTotal)}</strong></li>`,
    };
  });
}

export function buildOrderConfirmationEmail({ user, order }) {
  const name = user?.firstName?.trim() || "there";
  const appUrl = getAppUrl();
  const ordersUrl = `${appUrl}/orders`;
  const itemLines = buildItemLines(order.items);
  const total = formatMoney(order.amountTotal, order.currency);

  const subject = `Your Nuvio order is confirmed`;
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for your purchase. Your payment was received and your order is confirmed.",
    "",
    "Items:",
    ...itemLines.map((line) => line.text),
    "",
    `Total: ${total}`,
    "",
    `View your orders: ${ordersUrl}`,
    "",
    "— The Nuvio team",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#12161f;max-width:560px">
      <p>Hi ${name},</p>
      <p>Thanks for your purchase. Your payment was received and your order is confirmed.</p>
      <p><strong>Items</strong></p>
      <ul>${itemLines.map((line) => line.html).join("")}</ul>
      <p><strong>Total:</strong> ${total}</p>
      <p><a href="${ordersUrl}" style="color:#e36a1a">View your orders</a></p>
      <p style="color:#6b7280">— The Nuvio team</p>
    </div>
  `.trim();

  return {
    to: order.email || user?.email,
    subject,
    text,
    html,
  };
}

export async function sendOrderConfirmationEmail({ user, order }) {
  const to = order?.email || user?.email;
  if (!to || !order) return { skipped: true };

  return sendMailSafe(buildOrderConfirmationEmail({ user, order }));
}
