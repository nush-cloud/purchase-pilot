import { ChatMessage, ProductRecommendation } from "./types";

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "assistant",
    text: "Hi! I’m Purchase Pilot. Tell me what you’re shopping for, and I’ll help narrow down the best options.",
  },
];

export const runningShoeRecommendations: ProductRecommendation[] = [
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

export const laptopRecommendations: ProductRecommendation[] = [
  {
    id: 4,
    name: "Acer Aspire 5",
    price: "$799",
    category: "Laptops",
    description: "A practical laptop for students and general creative work.",
    whyItMatches: "Fits an under-$900 budget and works for everyday design tools and multitasking.",
    pros: ["Affordable", "Good everyday performance", "Solid value"],
    cons: ["Average display quality", "Not a premium build"],
    matchScore: 86,
  },
  {
    id: 5,
    name: "Lenovo IdeaPad Slim 5",
    price: "$849",
    category: "Laptops",
    description: "A balanced laptop with strong everyday productivity performance.",
    whyItMatches: "A good fit for design students who want a modern, portable machine under budget.",
    pros: ["Slim design", "Good battery life", "Reliable performance"],
    cons: ["Integrated graphics", "Mid-range screen"],
    matchScore: 88,
  },
  {
    id: 6,
    name: "HP Pavilion 15",
    price: "$899",
    category: "Laptops",
    description: "A mainstream laptop with a larger screen and versatile everyday use.",
    whyItMatches: "Stays near your budget ceiling and offers flexibility for productivity and light design work.",
    pros: ["Large display", "Good general use", "Widely available"],
    cons: ["Not ideal for heavy creative workloads", "Bulkier than ultrabooks"],
    matchScore: 85,
  },
];

export function getMockRecommendations(query: string): ProductRecommendation[] {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("laptop") ||
    lowerQuery.includes("design") ||
    lowerQuery.includes("macbook") ||
    lowerQuery.includes("computer")
  ) {
    return laptopRecommendations;
  }

  if (
    lowerQuery.includes("shoe") ||
    lowerQuery.includes("running") ||
    lowerQuery.includes("sneaker")
  ) {
    return runningShoeRecommendations;
  }

  return [];
}

export function getAssistantReply(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("laptop") ||
    lowerQuery.includes("design") ||
    lowerQuery.includes("computer")
  ) {
    return "Got it — I’ve updated the recommendations with some laptop options that match your request.";
  }

  if (
    lowerQuery.includes("shoe") ||
    lowerQuery.includes("running") ||
    lowerQuery.includes("sneaker")
  ) {
    return "Got it — I’ve updated the recommendations with shoe options that fit your request.";
  }

  return "I couldn’t find a close product category match yet. Try including the item type, budget, or use case.";
}