import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { getProductById } from "@/lib/products";
import { chatText, isQuotaError } from "@/lib/ai/openai";

/** Review model layer — data access, serialization, and seeded catalog reviews. */

const AUTHORS = [
  "Maya K.",
  "Jordan P.",
  "Samira L.",
  "Chris T.",
  "Priya N.",
  "Alex R.",
  "Noah B.",
  "Elena V.",
];

const COMMENTS = [
  "Exactly what I needed. Quality feels solid for the price.",
  "Arrived quickly and matches the listing. Would buy again.",
  "Nice everyday pick — not flashy, just reliable.",
  "A bit pricey, but the finish and details are worth it.",
  "Setup was simple and it works as described.",
  "Gifted this and got great feedback. Packaging was clean.",
  "Good value on Nuvio compared with similar options.",
  "Does the job well. Battery/build (depending on type) held up after a week of use.",
];

function hashId(id) {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function formatReviewAuthor(user) {
  const first = user?.firstName?.trim();
  const last = user?.lastName?.trim();
  if (first && last) return `${first} ${last[0]}.`;
  if (first) return first;
  return "Customer";
}

export function getSeededReviews(productId) {
  const product = getProductById(productId);
  if (!product) return [];

  const seed = hashId(productId);
  const count = 4 + (seed % 4);

  return Array.from({ length: count }, (_, index) => {
    const n = seed + index * 17;
    const rating = 3 + (n % 3);
    return {
      id: `${productId}-rev-${index}`,
      author: AUTHORS[n % AUTHORS.length],
      rating,
      text: COMMENTS[(n * 3) % COMMENTS.length],
      date: new Date(Date.now() - (index + 1) * 86400000 * (2 + (n % 11))).toISOString(),
      isCustomer: false,
    };
  });
}

export function serializeReview(review, { isOwn = false } = {}) {
  return {
    id: review._id.toString(),
    author: review.authorName,
    rating: review.rating,
    text: review.text,
    date: review.createdAt.toISOString(),
    isCustomer: true,
    isOwn,
  };
}

export async function getCustomerReviews(productId) {
  await connectDB();
  const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
  return reviews;
}

export async function getAllProductReviews(productId, { userId = null } = {}) {
  const customerReviews = await getCustomerReviews(productId);
  const seeded = getSeededReviews(productId);

  const mapped = customerReviews.map((review) =>
    serializeReview(review, {
      isOwn: userId ? review.userId.toString() === userId.toString() : false,
    })
  );

  return [...mapped, ...seeded];
}

export function localReviewSummary(reviews) {
  if (!reviews.length) {
    return {
      average: 0,
      count: 0,
      summary: "No reviews yet for this product.",
    };
  }

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const positive = reviews.filter((review) => review.rating >= 4).length;
  const share = Math.round((positive / reviews.length) * 100);

  return {
    average: Number(average.toFixed(1)),
    count: reviews.length,
    summary: `Shoppers rate this ${average.toFixed(1)} out of 5 from ${reviews.length} reviews. ${share}% of recent comments are positive, often mentioning quality, value, and that it matches the listing.`,
  };
}

export async function summarizeReviewsWithAi(product, reviews) {
  const local = localReviewSummary(reviews);

  try {
    const text = await chatText({
      system:
        "You summarize ecommerce product reviews in 2 sentences. Mention overall sentiment and one or two recurring themes. Do not invent ratings.",
      user: `Product: ${product.name}\nAverage: ${local.average}/5 from ${local.count} reviews\nReviews:\n${reviews
        .map((review) => `- ${review.rating}/5 ${review.author}: ${review.text}`)
        .join("\n")}`,
      temperature: 0.3,
      max_tokens: 180,
    });

    return {
      ...local,
      summary: text || local.summary,
      source: text ? "openai" : "local",
    };
  } catch (error) {
    console.error("Review summary error:", error);
    return {
      ...local,
      source: isQuotaError(error) ? "local-fallback" : "local",
    };
  }
}

/** @deprecated use getSeededReviews or getAllProductReviews */
export function getProductReviews(productId) {
  return getSeededReviews(productId);
}
