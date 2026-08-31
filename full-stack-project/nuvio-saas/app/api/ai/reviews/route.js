import { NextResponse } from "next/server";
import { summarizeProductReviews } from "@/controllers/reviewController";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await summarizeProductReviews(body);
    const { status, message, ...data } = result;
    return NextResponse.json(message ? { message, ...data } : data, { status });
  } catch (error) {
    console.error("Reviews route error:", error);
    return NextResponse.json(
      { message: error.message || "Could not summarize reviews" },
      { status: 500 }
    );
  }
}
