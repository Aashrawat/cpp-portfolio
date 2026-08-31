import { NextResponse } from "next/server";
import { z } from "zod";
import { parseWithZod } from "@/lib/validation";
import { recommendProducts } from "@/lib/recommendations";

const schema = z.object({
  productId: z.string().trim().max(120).optional(),
  query: z.string().trim().max(200).optional(),
  cartIds: z.array(z.string().trim().max(120)).max(40).optional(),
  viewedIds: z.array(z.string().trim().max(120)).max(20).optional(),
  excludeIds: z.array(z.string().trim().max(120)).max(40).optional(),
  limit: z.coerce.number().int().min(1).max(12).optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = parseWithZod(schema, body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.message }, { status: 400 });
    }

    const products = recommendProducts(parsed.data);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Recommend error:", error);
    return NextResponse.json(
      { message: error.message || "Could not load recommendations" },
      { status: 500 }
    );
  }
}
