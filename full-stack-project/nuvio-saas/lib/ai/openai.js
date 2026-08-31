import OpenAI from "openai";
import { isQuotaError } from "@/lib/localChat";

export { isQuotaError };

export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function chatText({
  system,
  user,
  temperature = 0.5,
  max_tokens = 400,
}) {
  const openai = getOpenAI();
  if (!openai) return null;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature,
    max_tokens,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() || null;
}
