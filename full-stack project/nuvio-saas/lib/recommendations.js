import { getProductById, products } from "@/lib/products";
import { matchCatalog, tokenize, toCardProduct } from "@/lib/ai/matchCatalog";

function uniqueProducts(list) {
  const seen = new Set();
  return list.filter((product) => {
    if (!product || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

export function recommendProducts({
  productId,
  cartIds = [],
  viewedIds = [],
  query = "",
  excludeIds = [],
  limit = 8,
} = {}) {
  const seed = getProductById(productId);
  const cartProducts = cartIds.map(getProductById).filter(Boolean);
  const viewedProducts = viewedIds.map(getProductById).filter(Boolean);
  const excluded = new Set(
    [productId, ...cartIds, ...excludeIds].filter(Boolean)
  );

  const queryMatches = query ? matchCatalog(query, { limit: limit * 2, excludeIds: [...excluded] }) : [];

  const seeds = [seed, ...cartProducts, ...viewedProducts].filter(Boolean);
  const categories = new Set(seeds.map((item) => item.category));
  const avgPrice =
    seeds.reduce((sum, item) => sum + Number(item.price || 0), 0) /
    Math.max(seeds.length, 1);

  const scored = products
    .filter((product) => !excluded.has(product.id))
    .map((product) => {
      let score = 0;
      if (categories.has(product.category)) score += 8;
      const priceGap = Math.abs(Number(product.price) - avgPrice);
      if (Number.isFinite(priceGap)) score += Math.max(0, 6 - priceGap / 80);
      if (seeds.some((item) => tokenize(item.name).some((token) => product.name.toLowerCase().includes(token)))) {
        score += 3;
      }
      return { product, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  const merged = uniqueProducts([
    ...queryMatches,
    ...scored.map((row) => row.product),
  ]).slice(0, limit);

  if (merged.length < limit) {
    const filler = products.filter((product) => !excluded.has(product.id) && !merged.some((item) => item.id === product.id));
    merged.push(...filler.slice(0, limit - merged.length));
  }

  return merged.map(toCardProduct);
}
