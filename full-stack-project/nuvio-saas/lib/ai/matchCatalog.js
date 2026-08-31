import { products } from "@/lib/products";

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "with",
  "from",
  "this",
  "that",
  "to",
  "of",
  "in",
  "on",
  "at",
  "is",
  "it",
  "my",
  "me",
  "i",
  "need",
  "want",
  "looking",
  "find",
  "show",
  "please",
  "something",
]);

export function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s$]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

export function scoreProduct(product, tokens) {
  if (!tokens.length) return 0;
  const hay = `${product.name} ${product.description} ${product.category} ${product.categoryLabel}`.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (product.name.toLowerCase().includes(token)) score += 6;
    if (product.categoryLabel.toLowerCase().includes(token)) score += 4;
    if (product.category.toLowerCase().includes(token)) score += 3;
    if (hay.includes(token)) score += 2;
  }
  return score;
}

export function matchCatalog(query, { limit = 8, excludeIds = [] } = {}) {
  const tokens = tokenize(query);
  const excluded = new Set(excludeIds.filter(Boolean));
  const ranked = products
    .filter((product) => !excluded.has(product.id))
    .map((product) => ({ product, score: scoreProduct(product, tokens) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || Number(a.product.price) - Number(b.product.price));

  return ranked.slice(0, limit).map((row) => row.product);
}

export function toCardProduct(product) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    categoryLabel: product.categoryLabel,
    description: product.description,
  };
}
