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