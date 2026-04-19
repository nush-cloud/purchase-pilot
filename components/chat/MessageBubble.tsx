'use client';

import Card from "react-bootstrap/Card";
import { ChatMessage } from "@/lib/types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`d-flex mb-3 ${isUser ? "justify-content-end" : "justify-content-start"}`}>
      <Card
        className={`border-0 shadow-sm ${isUser ? "bg-primary text-white" : "bg-light text-dark"}`}
        style={{ maxWidth: "80%" }}
      >
        <Card.Body className="px-3 py-2">
          <div className="small fw-semibold mb-1">
            {isUser ? "You" : "Purchase Pilot"}
          </div>
          <div className="mb-0" style={{ whiteSpace: "pre-line" }}>
  {message.text}
</div>
        </Card.Body>
      </Card>
    </div>
  );
}