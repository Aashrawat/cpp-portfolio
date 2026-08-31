const STORAGE_KEY = "nuvio-viewed";
const LIMIT = 12;

export function getRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function trackProductView(productId) {
  if (typeof window === "undefined" || !productId) return;
  const next = [productId, ...getRecentlyViewed().filter((id) => id !== productId)].slice(
    0,
    LIMIT
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
