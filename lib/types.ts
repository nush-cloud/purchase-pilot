export type Sender = "user" | "assistant";

export interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
}