import { faqs } from "@/lib/faqs";
import { categories, products } from "@/lib/products";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "to",
  "for",
  "of",
  "and",
  "or",
  "is",
  "are",
  "do",
  "does",
  "how",
  "what",
  "where",
  "when",
  "why",
  "can",
  "i",
  "my",
  "me",
  "on",
  "in",
  "at",
  "get",
  "got",
  "with",
  "from",
  "this",
  "that",
  "help",
]);

const TOPIC_ANSWERS = [
  {
    id: "identity",
    keywords: ["kavya", "your name", "who are you", "chatbot", "assistant"],
    answer:
      "I’m Kavya, Nuvio’s shopping assistant. Ask me about shopping, accounts, cart, payments, refunds, or how the site works.",
  },
  {
    id: "refund",
    keywords: ["refund", "refunds", "refunded", "money back", "chargeback"],
    answer:
      "To get a refund on Nuvio:\n1. Sign in.\n2. Open Account → Your Orders.\n3. Find a Paid order.\n4. Click Request refund and enter a short reason.\n5. Confirm — Stripe processes the refund.\n\nRefund is only available after payment is confirmed. Unpaid carts cannot be refunded.",
  },
  {
    id: "recommend",
    keywords: ["recommend", "suggestion", "suggest", "what should i buy", "gift"],
    answer:
      "I can recommend products from the Nuvio catalog. Try “Recommend a laptop”, use photo search in the header, or open a product page for personalized picks. Tell me a category or budget and I’ll narrow it down.",
  },
  {
    id: "buy",
    keywords: ["buy", "purchase", "checkout", "pay", "stripe", "payment"],
    answer:
      "To buy on Nuvio: Browse products → open a category → open a product → Add to cart (sign in if needed) → open Cart → Pay with Stripe. After payment succeeds, the order appears under Your Orders.",
  },
  {
    id: "login",
    keywords: ["login", "log in", "sign in", "signin"],
    answer:
      "Use Login for Nuvio on the homepage, or Login in the header on other pages. After signing in you go to the product browse page.",
  },
  {
    id: "signup",
    keywords: ["signup", "sign up", "register", "create account"],
    answer:
      "Open Sign Up, enter first name, optional last name, email, and password (min 6 characters). Then you can use cart, checkout, and settings.",
  },
  {
    id: "settings",
    keywords: ["settings", "change password", "update email", "profile"],
    answer:
      "When signed in, open Account → Help & Settings. There you can update name, delivery country, email, password, language, clear cart, sign out, or delete your account.",
  },
  {
    id: "orders",
    keywords: ["order", "orders"],
    answer:
      "Paid orders are listed under Account → Your Orders. From there you can review items and request a refund for paid orders.",
  },
  {
    id: "cart",
    keywords: ["cart", "basket"],
    answer:
      "Cart is in the header after you sign in. Add products from product pages, change quantities in /cart, then Pay with Stripe.",
  },
  {
    id: "categories",
    keywords: [
      "category",
      "categories",
      "electronics",
      "fashion",
      "grocery",
      "fitness",
    ],
    answer: `Nuvio categories: ${categories.map((cat) => cat.label).join(", ")}. Open Browse products to shop by category.`,
  },
  {
    id: "products",
    keywords: ["product", "catalog", "item"],
    answer: `Nuvio has ${products.length} products across categories. Open a category to browse, then open a product for details and Add to cart.`,
  },
  {
    id: "faq",
    keywords: ["faq"],
    answer:
      "Open Account → FAQ for common answers about Nuvio shopping, accounts, payments, and refunds.",
  },
];

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function scoreTopic(question, keywords) {
  const q = question.toLowerCase();
  let score = 0;
  for (const keyword of keywords) {
    if (q.includes(keyword)) {
      score += keyword.includes(" ") ? 6 : 5;
    }
  }
  return score;
}

function scoreFaq(question, faq) {
  const q = question.toLowerCase();
  const qWords = tokenize(question);
  const questionText = faq.question.toLowerCase();
  const answerText = faq.answer.toLowerCase();

  let score = 0;

  for (const word of qWords) {
    if (questionText.includes(word)) score += 4;
    else if (answerText.includes(word)) score += 1;
  }

  if (q.includes("refund") && faq.id === "refunds") score += 10;
  if (q.includes("return") && faq.id === "returns") score += 10;
  if ((q.includes("pay") || q.includes("stripe")) && faq.id === "payments") {
    score += 8;
  }

  // Avoid the chatbot self-help FAQ winning on generic words.
  if (faq.id === "chatbot") score -= 8;

  return score;
}

export function answerFromNuvioKnowledge(question) {
  const q = question.trim();
  if (!q) {
    return "I’m Kavya. Ask me anything about shopping, accounts, cart, payments, or refunds on Nuvio.";
  }

  let bestTopic = null;
  let bestTopicScore = 0;
  for (const topic of TOPIC_ANSWERS) {
    const score = scoreTopic(q, topic.keywords);
    if (score > bestTopicScore) {
      bestTopicScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && bestTopicScore >= 5) {
    return bestTopic.answer;
  }

  let bestFaq = null;
  let bestFaqScore = 0;
  for (const faq of faqs) {
    const score = scoreFaq(q, faq);
    if (score > bestFaqScore) {
      bestFaqScore = score;
      bestFaq = faq;
    }
  }

  if (bestFaq && bestFaqScore >= 4) {
    return bestFaq.answer;
  }

  if (bestTopic && bestTopicScore > 0) {
    return bestTopic.answer;
  }

  if (bestFaq && bestFaqScore > 0) {
    return bestFaq.answer;
  }

  return [
    "I’m Kavya — I can help with Nuvio topics like accounts, categories, cart, Stripe checkout, orders, and refunds.",
    "Try: “How do I get a refund?”, “How do I buy a product?”, or “What categories does Nuvio sell?”",
  ].join(" ");
}

export function isQuotaError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  const code = String(error?.code || error?.error?.code || "").toLowerCase();
  const status = error?.status || error?.statusCode;

  return (
    status === 429 ||
    code.includes("insufficient_quota") ||
    code.includes("rate_limit") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("429")
  );
}
