'use client';

import { useState } from "react";
import Card from "react-bootstrap/Card";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { mockMessages } from "@/lib/mockData";
import { ChatMessage } from "@/lib/types";

export default function ChatLayout() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: trimmedValue,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-4 d-flex flex-column">
        <div className="mb-3">
          <h2 className="h4 mb-1">Shopping Conversation</h2>
          <p className="text-muted mb-0">
            A preview of how the AI shopping flow will work.
          </p>
        </div>

        <div
          className="bg-light rounded p-3 mb-3 flex-grow-1"
          style={{ minHeight: "320px" }}
        >
          <MessageList messages={messages} />
        </div>

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
        />
      </Card.Body>
    </Card>
  );
}