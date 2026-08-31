import { NextResponse } from "next/server";
import { describeProduct } from "@/controllers/aiController";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await describeProduct(body);
    const { status, message, ...data } = result;
    return NextResponse.json(message ? { message, ...data } : data, { status });
  } catch (error) {
    console.error("Describe route error:", error);
    return NextResponse.json(
      { message: error.message || "Could not generate description" },
      { status: 500 }
    );
  }
}
