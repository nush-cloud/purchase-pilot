'use client';

import { useEffect, useRef, useState } from "react";
import AppNavbar from "@/components/layout/AppNavbar";
import ChatLayout from "@/components/chat/ChatLayout";
import ProductCard from "@/components/product/ProductCard";
import { mockMessages } from "@/lib/mockData";
import {
  ChatMessage,
  ProductRecommendation,
  ShoppingApiResponse,
} from "@/lib/types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { setSessionRecommendations } from "@/lib/storage";

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [shouldScrollToResults, setShouldScrollToResults] = useState(false);
  const [needsMoreInfo, setNeedsMoreInfo] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  const recommendationsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isLoading && shouldScrollToResults && recommendationsRef.current) {
      recommendationsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setShouldScrollToResults(false);
    }
  }, [isLoading, shouldScrollToResults]);

  const handleSend = async () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedValue,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);
    setShouldScrollToResults(true);
    setNeedsMoreInfo(false);
    setFollowUpQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedValue,
          messages: nextMessages.map((message) => ({
            sender: message.sender,
            text: message.text,
          })),
        }),
      });

      const data: ShoppingApiResponse = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to get a response from the API.");
      }

      const assistantParts: string[] = [];

      if (data.assistantReply?.trim()) {
        assistantParts.push(data.assistantReply.trim());
      }

      if (data.needsMoreInfo && data.followUpQuestion?.trim()) {
        assistantParts.push(data.followUpQuestion.trim());
      }

      const assistantText =
        assistantParts.join("\n\n") || "I updated the recommendations.";

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: assistantText,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      const nextRecommendations = data.recommendations ?? [];
      setRecommendations(nextRecommendations);
      setSessionRecommendations(nextRecommendations);
      setNeedsMoreInfo(Boolean(data.needsMoreInfo));
      setFollowUpQuestion(data.followUpQuestion?.trim() ?? "");
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          error instanceof Error
            ? `Something went wrong: ${error.message}`
            : "Something went wrong while getting recommendations.",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setRecommendations([]);
      setSessionRecommendations([]);
      setNeedsMoreInfo(false);
      setFollowUpQuestion("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setMessages(mockMessages);
    setInputValue("");
    setIsLoading(false);
    setRecommendations([]);
    setShouldScrollToResults(false);
    setNeedsMoreInfo(false);
    setFollowUpQuestion("");
    setSessionRecommendations([]);
  };

  return (
    <>
      <AppNavbar />

      <main className="py-5">
        <Container>
          <Row className="align-items-center gy-4 mb-5">
            <Col lg={6}>
              <span className="text-uppercase text-secondary fw-semibold small">
                AI Shopping Assistant
              </span>
              <h1 className="display-3 fw-bold mt-2 mb-3">
                Shop smarter with Purchase Pilot
              </h1>
              <p className="lead text-light-emphasis mb-4">
                Describe what you need, answer a few quick follow-up questions,
                and get product recommendations you can compare and save.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Button variant="primary" size="lg">
                  Start Shopping
                </Button>
                <Button variant="outline-light" size="lg">
                  View Demo Flow
                </Button>
                <Button variant="outline-secondary" size="lg" onClick={handleResetSearch}>
                  New Search
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <ChatLayout
                messages={messages}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSend={handleSend}
                isLoading={isLoading}
              />
            </Col>
          </Row>

          <section className="mb-5" ref={recommendationsRef}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 className="h2 fw-bold mb-1">Recommended Products</h2>
                <p className="text-light-emphasis mb-0">
                  Product cards now come from the real backend chat route.
                </p>
              </div>
            </div>

            {isLoading ? (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4 d-flex align-items-center gap-3">
                  <Spinner animation="border" />
                  <div>
                    <div className="fw-semibold">Finding recommendations...</div>
                    <div className="text-muted small">
                      Asking Claude to use the full conversation context.
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ) : recommendations.length > 0 ? (
              <Row className="g-4">
                {recommendations.map((product, index) => (
                  <Col md={6} xl={4} key={`${product.name}-${index}`}>
                    <ProductCard product={{ ...product, id: index + 1 }} />
                  </Col>
                ))}
              </Row>
            ) : needsMoreInfo ? (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h3 className="h5 mb-2">One quick detail needed</h3>
                  <p className="text-muted mb-3">
                    Purchase Pilot is ready to recommend products, but it needs one final detail first.
                  </p>

                  <Card className="bg-light border-0">
                    <Card.Body>
                      <div className="fw-semibold mb-2">Follow-up question</div>
                      <div className="mb-0">
                        {followUpQuestion || "Please answer the follow-up question shown in the chat."}
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h3 className="h5 mb-2">No direct matches yet</h3>
                  <p className="text-muted mb-0">
                    Try being a little more specific about the product type, budget, or use case.
                  </p>
                </Card.Body>
              </Card>
            )}
          </section>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Guided Discovery</Card.Title>
                  <Card.Text>
                    Users start with a natural language prompt instead of digging
                    through endless filters.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Smart Comparison</Card.Title>
                  <Card.Text>
                    Product recommendations are structured so users can compare
                    options with less decision fatigue.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Saved Picks</Card.Title>
                  <Card.Text>
                    Users can save strong candidates and revisit them later
                    instead of losing track across tabs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}