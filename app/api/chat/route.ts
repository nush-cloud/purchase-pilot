import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildShoppingSystemPrompt } from "@/lib/prompts";

interface ChatRequestBody {
  message?: string;
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
    const message = body.message?.trim();

    if (!message) {
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

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: buildShoppingSystemPrompt(),
      messages: [
        {
          role: "user",
          content: message,
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
      ...parsed,
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