function normalizeApiKey(apiKey) {
  if (!apiKey) return "";
  const trimmed = apiKey.trim();
  if (trimmed.startsWith("key-")) return trimmed;
  return trimmed;
}

function getMailgunConfig() {
  const apiKey = normalizeApiKey(process.env.MAILGUN_API_KEY);
  const domain = process.env.MAILGUN_DOMAIN?.trim() || "";

  if (!apiKey || !domain) {
    return null;
  }

  if (!domain.includes(".")) {
    console.error(
      "MAILGUN_DOMAIN must be a full sending domain from Mailgun (e.g. sandbox123.mailgun.org), not an API key."
    );
    return null;
  }

  const from =
    process.env.MAILGUN_FROM?.trim() ||
    (domain.includes("mailgun.org")
      ? `Nuvio <postmaster@${domain}>`
      : `Nuvio <noreply@${domain}>`);

  return {
    apiKey,
    domain,
    from,
    apiBase: process.env.MAILGUN_API_BASE || "https://api.mailgun.net",
  };
}

export function isMailgunConfigured() {
  return Boolean(getMailgunConfig());
}

export async function sendMail({ to, subject, text, html }) {
  const config = getMailgunConfig();
  if (!config) {
    console.warn("Mailgun is not configured. Skipping email.");
    return { skipped: true };
  }

  if (!to || !subject || !text) {
    throw new Error("Email requires to, subject, and text");
  }

  const body = new URLSearchParams({
    from: config.from,
    to,
    subject,
    text,
  });

  if (html) {
    body.set("html", html);
  }

  const auth = Buffer.from(`api:${config.apiKey}`).toString("base64");
  const response = await fetch(
    `${config.apiBase}/v3/${config.domain}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.message || `Mailgun request failed (${response.status})`;
    console.error("Mailgun error details:", {
      status: response.status,
      message: payload?.message,
      domain: config.domain,
      hint:
        response.status === 401
          ? "Check MAILGUN_API_KEY (Private API key) and MAILGUN_DOMAIN in .env.local"
          : undefined,
    });
    throw new Error(message);
  }

  return payload;
}

export function sendMailSafe(options) {
  return sendMail(options).catch((error) => {
    console.error("Mailgun send failed:", error.message);
    return { error: error.message };
  });
}
