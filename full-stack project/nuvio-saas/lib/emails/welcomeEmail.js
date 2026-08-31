import { sendMailSafe } from "@/lib/mailgun";

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:8080";
}

export function buildWelcomeEmail({ firstName, email }) {
  const name = firstName?.trim() || "there";
  const appUrl = getAppUrl();

  const subject = "Welcome to Nuvio";
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for creating your Nuvio account.",
    "You can browse the catalog, save items to your cart, and track orders from your dashboard.",
    "",
    `Start shopping: ${appUrl}`,
    "",
    "— The Nuvio team",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#12161f;max-width:560px">
      <p>Hi ${name},</p>
      <p>Thanks for creating your <strong>Nuvio</strong> account.</p>
      <p>You can browse the catalog, save items to your cart, and track orders from your dashboard.</p>
      <p><a href="${appUrl}" style="color:#e36a1a">Start shopping</a></p>
      <p style="color:#6b7280">— The Nuvio team</p>
    </div>
  `.trim();

  return { to: email, subject, text, html };
}

export async function sendWelcomeEmail(user) {
  if (!user?.email) return { skipped: true };

  return sendMailSafe(buildWelcomeEmail(user));
}
