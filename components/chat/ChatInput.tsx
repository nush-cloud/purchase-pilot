'use client';

import { FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
}: ChatInputProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type your shopping need here..."
          aria-label="Shopping input"
        />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
}