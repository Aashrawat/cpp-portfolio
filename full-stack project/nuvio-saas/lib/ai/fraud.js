const checkoutAttempts = new Map();

function pruneAttempts(email, now) {
  const windowMs = 10 * 60 * 1000;
  const list = (checkoutAttempts.get(email) || []).filter((time) => now - time < windowMs);
  checkoutAttempts.set(email, list);
  return list;
}

export function scoreCheckoutFraud({ items, productsById, user }) {
  const signals = [];
  let score = 0;

  const resolved = items.map((item) => {
    const product = productsById.get(item.id);
    return {
      ...item,
      product,
      lineTotal: Number(product?.price || 0) * Number(item.quantity || 0),
    };
  });

  const total = resolved.reduce((sum, item) => sum + item.lineTotal, 0);
  const qty = resolved.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const categories = new Set(resolved.map((item) => item.product?.category).filter(Boolean));

  if (qty >= 40) {
    score += 50;
    signals.push("Unusually large item quantity");
  } else if (qty >= 16) {
    score += 22;
    signals.push("High item quantity");
  }

  if (resolved.some((item) => item.quantity >= 25)) {
    score += 28;
    signals.push("Single-line quantity spike");
  }

  if (total >= 12000) {
    score += 45;
    signals.push("Very high order total");
  } else if (total >= 3500) {
    score += 18;
    signals.push("High order total");
  }

  if (categories.size >= 8 && resolved.length >= 10) {
    score += 16;
    signals.push("Many unrelated categories in one cart");
  }

  const email = String(user?.email || "").toLowerCase();
  const now = Date.now();
  if (email) {
    const recent = pruneAttempts(email, now);
    if (recent.length >= 5) {
      score += 30;
      signals.push("Repeated checkout attempts");
    }
    recent.push(now);
    checkoutAttempts.set(email, recent);
  }

  const accountAgeMs = user?.createdAt ? now - new Date(user.createdAt).getTime() : null;
  if (accountAgeMs != null && accountAgeMs < 15 * 60 * 1000 && total >= 800) {
    score += 20;
    signals.push("New account with a high first order");
  }

  let level = "low";
  if (score >= 70) level = "high";
  else if (score >= 32) level = "medium";

  return {
    score: Math.min(100, score),
    level,
    signals,
    blocked: score >= 85,
    total: Number(total.toFixed(2)),
  };
}
