import { ChatMessage, ProductRecommendation } from "./types";

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

export const mockRecommendations: ProductRecommendation[] = [
  {
    id: 1,
    name: "Nike Revolution 7",
    price: "$85",
    category: "Running Shoes",
    description: "A budget-friendly daily running shoe with a soft ride.",
    whyItMatches: "Fits your budget and works well for everyday running and walking.",
    pros: ["Affordable", "Comfortable for daily wear", "Good beginner option"],
    cons: ["Less premium cushioning", "Not ideal for advanced runners"],
    matchScore: 89,
  },
  {
    id: 2,
    name: "Adidas Duramo SL",
    price: "$75",
    category: "Running Shoes",
    description: "A lightweight trainer designed for casual runs and everyday movement.",
    whyItMatches: "Great for daily use and offers a lightweight feel at a lower price point.",
    pros: ["Lightweight", "Good value", "Versatile for casual wear"],
    cons: ["Moderate support", "Less plush cushioning"],
    matchScore: 84,
  },
  {
    id: 3,
    name: "ASICS Gel-Contend 8",
    price: "$95",
    category: "Running Shoes",
    description: "A stable daily trainer with a comfortable fit and soft step-in feel.",
    whyItMatches: "Balances comfort and support while staying under your budget.",
    pros: ["Reliable support", "Comfortable fit", "Good for beginners"],
    cons: ["Slightly heavier", "More basic design"],
    matchScore: 91,
  },
];