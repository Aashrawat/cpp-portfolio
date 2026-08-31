import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { buildNuvioSystemPrompt } from "@/lib/nuvioKnowledge";
import { answerFromNuvioKnowledge, isQuotaError } from "@/lib/localChat";
import { parseWithZod } from "@/lib/validation";
import { recommendProducts } from "@/lib/recommendations";
import { matchCatalog, toCardProduct } from "@/lib/ai/matchCatalog";

const chatSchema = z.object({
  language: z.string().trim().max(8).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      })
    )
    .min(1, "Send at least one message")
    .max(24, "Conversation is too long"),
});

function latestUserQuestion(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === "user") return messages[i].content;
  }
  return "";
}

function shoppingIntent(question) {
  return /\b(recommend|suggest|find|show|looking|buy|need|want|best|under|gift|laptop|phone|headphones|shoes|bag|watch)\b/i.test(
    question
  );
}

function productsForQuestion(question) {
  if (!shoppingIntent(question)) return [];
  const matched = matchCatalog(question, { limit: 3 }).map(toCardProduct);
  if (matched.length) return matched;
  return recommendProducts({ query: question, limit: 3 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = parseWithZod(chatSchema, body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.message }, { status: 400 });
    }

    const question = latestUserQuestion(parsed.data.messages);
    const language = parsed.data.language || "en";
    const localReply = answerFromNuvioKnowledge(question);
    const products = productsForQuestion(question);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: localReply,
        products,
        source: "local",
      });
    }

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content: `${buildNuvioSystemPrompt()}\n\nReply in the user's preferred language code: ${language}.`,
          },
          ...parsed.data.messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      });

      const reply =
        completion.choices[0]?.message?.content?.trim() || localReply;

      return NextResponse.json({ reply, products, source: "openai" });
    } catch (error) {
      console.error("OpenAI chat error:", error);
      return NextResponse.json({
        reply: localReply,
        products,
        source: "local-fallback",
      });
    }
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { message: error.message || "Chatbot is unavailable right now" },
      { status: 500 }
    );
  }
}
