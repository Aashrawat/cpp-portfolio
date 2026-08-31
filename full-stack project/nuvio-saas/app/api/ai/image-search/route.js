import { NextResponse } from "next/server";
import { getOpenAI, isQuotaError } from "@/lib/ai/openai";
import { matchCatalog, toCardProduct } from "@/lib/ai/matchCatalog";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Add a photo to search" }, { status: 400 });
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { message: "Use a JPG, PNG, WEBP, or GIF photo" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ message: "Photo must be under 4MB" }, { status: 400 });
    }

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json({
        query: "",
        products: [],
        message: "Image search needs an OpenAI key. Try a text search for now.",
        source: "local",
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 80,
        messages: [
          {
            role: "system",
            content:
              "Identify the main object in a shopper photo for Nuvio, a general store. Reply with 6 to 10 lowercase catalog search keywords, comma-separated. No sentences.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "What should I search for in the store catalog?" },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
      });

      const query = (completion.choices[0]?.message?.content || "")
        .replace(/[".]/g, " ")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .slice(0, 8)
        .join(" ");

      const products = matchCatalog(query, { limit: 12 }).map(toCardProduct);

      return NextResponse.json({
        query,
        products,
        source: "openai",
      });
    } catch (error) {
      console.error("Image search model error:", error);
      return NextResponse.json({
        query: "",
        products: [],
        message: isQuotaError(error)
          ? "Image search is temporarily unavailable. Try a text search."
          : "Could not read that photo. Try another image or a text search.",
        source: "local-fallback",
      });
    }
  } catch (error) {
    console.error("Image search error:", error);
    return NextResponse.json(
      { message: error.message || "Image search failed" },
      { status: 500 }
    );
  }
}
