export type Sender = "user" | "assistant";

export interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
}

export interface ProductRecommendation {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  whyItMatches: string;
  pros: string[];
  cons: string[];
  matchScore: number;
}