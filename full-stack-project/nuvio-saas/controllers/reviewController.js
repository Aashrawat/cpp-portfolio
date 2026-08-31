import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { getProductById } from "@/lib/products";
import {
  formatReviewAuthor,
  getAllProductReviews,
  localReviewSummary,
  serializeReview,
  summarizeReviewsWithAi,
} from "@/lib/reviews";
import { parseWithZod, reviewDeleteSchema, reviewSchema } from "@/lib/validation";

async function buildReviewPayload(productId, user) {
  const product = getProductById(productId);
  if (!product) {
    return { status: 404, message: "Product not found" };
  }

  const reviews = await getAllProductReviews(productId, {
    userId: user?._id || null,
  });
  const stats = localReviewSummary(reviews);

  let userReview = null;
  if (user) {
    await connectDB();
    const existing = await Review.findOne({ userId: user._id, productId }).lean();
    if (existing) {
      userReview = serializeReview(existing, { isOwn: true });
    }
  }

  return {
    status: 200,
    ...stats,
    reviews,
    userReview,
    isLoggedIn: Boolean(user),
  };
}

export async function listProductReviews(productId) {
  const id = productId?.trim();
  if (!id) {
    return { status: 400, message: "Product is required" };
  }

  const user = await getAuthenticatedUser();
  return buildReviewPayload(id, user);
}

export async function saveProductReview(input) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { status: 401, message: "Please sign in to leave a review" };
  }

  const parsed = parseWithZod(reviewSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const { productId, rating, text } = parsed.data;
  const product = getProductById(productId);
  if (!product) {
    return { status: 404, message: "Product not found" };
  }

  await connectDB();
  const authorName = formatReviewAuthor(user);
  const review = await Review.findOneAndUpdate(
    { userId: user._id, productId },
    { rating, text, authorName },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  const payload = await buildReviewPayload(productId, user);
  if (payload.status !== 200) return payload;

  const serialized = serializeReview(review, { isOwn: true });

  return {
    ...payload,
    message: "Review saved",
    review: serialized,
    userReview: serialized,
    isLoggedIn: true,
  };
}

export async function deleteProductReview(productId) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { status: 401, message: "Please sign in to manage your review" };
  }

  const parsed = parseWithZod(reviewDeleteSchema, { productId });
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const id = parsed.data.productId;
  const product = getProductById(id);
  if (!product) {
    return { status: 404, message: "Product not found" };
  }

  await connectDB();
  const result = await Review.deleteOne({ userId: user._id, productId: id });
  if (!result.deletedCount) {
    return { status: 404, message: "Review not found" };
  }

  const payload = await buildReviewPayload(id, user);
  if (payload.status !== 200) return payload;

  return {
    ...payload,
    message: "Review deleted",
    userReview: null,
    isLoggedIn: true,
  };
}

export async function summarizeProductReviews(input) {
  const parsed = parseWithZod(reviewDeleteSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const product = getProductById(parsed.data.productId);
  if (!product) {
    return { status: 404, message: "Product not found" };
  }

  const reviews = await getAllProductReviews(product.id);
  const stats = await summarizeReviewsWithAi(product, reviews);

  return {
    status: 200,
    ...stats,
    reviews,
  };
}
