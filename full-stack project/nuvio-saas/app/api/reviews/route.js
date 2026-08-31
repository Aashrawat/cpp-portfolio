import { NextResponse } from "next/server";
import {
  deleteProductReview,
  listProductReviews,
  saveProductReview,
} from "@/controllers/reviewController";

function jsonFromResult(result) {
  const { status, message, ...data } = result;
  return NextResponse.json(message ? { message, ...data } : data, { status });
}

export async function GET(request) {
  try {
    const productId = request.nextUrl.searchParams.get("productId");
    const result = await listProductReviews(productId);
    return jsonFromResult(result);
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json(
      { message: error.message || "Could not load reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await saveProductReview(body);
    return jsonFromResult(result);
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { message: error.message || "Could not save review" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const productId = request.nextUrl.searchParams.get("productId");
    const result = await deleteProductReview(productId);
    return jsonFromResult(result);
  } catch (error) {
    console.error("Reviews DELETE error:", error);
    return NextResponse.json(
      { message: error.message || "Could not delete review" },
      { status: 500 }
    );
  }
}
