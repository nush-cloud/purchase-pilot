import { ChatMessage } from "./types";

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "assistant",
    text: "Hi! I’m Purchase Pilot. Tell me what you’re shopping for, and I’ll help narrow down the best options.",
  },
  {
    id: 2,
    sender: "user",
    text: "I need running shoes under $120 for daily use.",
  },
  {
    id: 3,
    sender: "assistant",
    text: "Got it. Do you prefer more cushioning, lightweight performance, or a balance of both?",
  },
];