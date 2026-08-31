import { getProductById } from "@/lib/products";
import { chatText, isQuotaError } from "@/lib/ai/openai";
import { parseWithZod, productIdSchema } from "@/lib/validation";

function localDescription(product) {
  return `${product.name} is a ${product.categoryLabel.toLowerCase()} item on Nuvio for $${product.price}. ${product.description} A solid choice for everyday use with good value for the price.`;
}

export async function describeProduct(input) {
  const parsed = parseWithZod(productIdSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const product = getProductById(parsed.data.productId);
  if (!product) {
    return { status: 404, message: "Product not found" };
  }

  const fallback = localDescription(product);

  try {
    const text = await chatText({
      system:
        "You write clear shopper-facing product copy for Nuvio. Write 2-3 short sentences as one normal paragraph. Plain language, no hype, no bullet points, no invented specs.",
      user: `Name: ${product.name}\nCategory: ${product.categoryLabel}\nPrice: $${product.price}\nCurrent description: ${product.description}`,
      temperature: 0.5,
      max_tokens: 220,
    });

    return {
      status: 200,
      description: text || fallback,
      source: text ? "openai" : "local",
    };
  } catch (error) {
    console.error("Describe error:", error);
    return {
      status: 200,
      description: fallback,
      source: isQuotaError(error) ? "local-fallback" : "local",
    };
  }
}
