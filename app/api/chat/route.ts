import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildShoppingSystemPrompt } from "@/lib/prompts";

interface ConversationMessage {
  sender: "user" | "assistant";
  text: string;
}

interface ChatRequestBody {
  message?: string;
  messages?: ConversationMessage[];
}

interface RawRecommendation {
  name?: unknown;
  price?: unknown;
  category?: unknown;
  description?: unknown;
  whyItMatches?: unknown;
  pros?: unknown;
  cons?: unknown;
  matchScore?: unknown;
}

const recommendationSchema = {
  type: "object",
  properties: {
    needsMoreInfo: { type: "boolean" },
    followUpQuestion: { type: "string" },
    assistantReply: { type: "string" },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          price: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          whyItMatches: { type: "string" },
          pros: {
            type: "array",
            items: { type: "string" },
          },
          cons: {
            type: "array",
            items: { type: "string" },
          },
          matchScore: { type: "number" },
        },
        required: [
          "name",
          "price",
          "category",
          "description",
          "whyItMatches",
          "pros",
          "cons",
          "matchScore",
        ],
        additionalProperties: false,
      },
    },
  },
  required: [
    "needsMoreInfo",
    "followUpQuestion",
    "assistantReply",
    "recommendations",
  ],
  additionalProperties: false,
};

function buildConversationTranscript(messages: ConversationMessage[]) {
  return messages
    .filter((message) => message.text.trim().length > 0)
    .map((message) => {
      const roleLabel = message.sender === "user" ? "User" : "Assistant";
      return `${roleLabel}: ${message.text}`;
    })
    .join("\n\n");
}

function toCleanString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim();
}

function toCleanList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function toPriceString(value: unknown) {
  const raw = toCleanString(value);
  if (!raw) return "Price unavailable";

  if (raw.startsWith("$")) return raw;

  const numeric = Number(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isNaN(numeric) && numeric > 0) {
    return `$${Math.round(numeric)}`;
  }

  return raw;
}

function toMatchScore(value: unknown) {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? Number(value)
      : 80;

  if (Number.isNaN(numeric)) return 80;

  return Math.min(98, Math.max(70, Math.round(numeric)));
}

function normalizeRecommendations(raw: unknown) {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      const recommendation = item as RawRecommendation;

      const name = toCleanString(recommendation.name);
      const category = toCleanString(recommendation.category, "Products");
      const description = toCleanString(recommendation.description);
      const whyItMatches = toCleanString(recommendation.whyItMatches);
      const pros = toCleanList(recommendation.pros);
      const cons = toCleanList(recommendation.cons);

      if (!name || !description || !whyItMatches) {
        return null;
      }

      return {
        name,
        price: toPriceString(recommendation.price),
        category,
        description,
        whyItMatches,
        pros: pros.length > 0 ? pros : ["Good general fit"],
        cons: cons.length > 0 ? cons : ["May involve tradeoffs"],
        matchScore: toMatchScore(recommendation.matchScore),
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

export async function GET() {
  const client = getAnthropicClient();

  return NextResponse.json({
    ok: true,
    route: "/api/chat",
    apiKeyConfigured: Boolean(client),
    message: client
      ? "Anthropic client is configured."
      : "Anthropic client is not configured yet.",
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    const history = Array.isArray(body.messages) ? body.messages : [];
    const latestMessage = body.message?.trim();

    if (!latestMessage && history.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Message is required." },
        { status: 400 }
      );
    }

    const client = getAnthropicClient();

    if (!client) {
      return NextResponse.json(
        { ok: false, error: "Anthropic API key is not configured." },
        { status: 500 }
      );
    }

    const transcript =
      history.length > 0
        ? buildConversationTranscript(history)
        : `User: ${latestMessage}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: buildShoppingSystemPrompt(),
      messages: [
        {
          role: "user",
          content: `
Use the full conversation below as context.

Conversation:
${transcript}

Instructions:
- Use earlier user answers when deciding whether more info is needed.
- Do not ask for details the user already gave.
- Ask only one follow-up question if necessary.
- If enough information is already available, return recommendations now.
          `.trim(),
        },
      ],
      output_config: {
        format: {
          type: "json_schema",
          schema: recommendationSchema,
        },
      },
    });

    const textBlock = response.content.find((block) => block.type === "text");

    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { ok: false, error: "Claude did not return text content." },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(textBlock.text);

    return NextResponse.json({
      ok: true,
      needsMoreInfo: Boolean(parsed.needsMoreInfo),
      followUpQuestion:
        typeof parsed.followUpQuestion === "string"
          ? parsed.followUpQuestion.trim()
          : "",
      assistantReply:
        typeof parsed.assistantReply === "string"
          ? parsed.assistantReply.trim()
          : "",
      recommendations: normalizeRecommendations(parsed.recommendations),
    });
  } catch (error) {
    console.error("POST /api/chat error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}