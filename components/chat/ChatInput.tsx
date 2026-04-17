'use client';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function ChatInput() {
  return (
    <InputGroup>
      <Form.Control
        placeholder="Type your shopping need here..."
        aria-label="Shopping input"
      />
      <Button variant="primary">Send</Button>
    </InputGroup>
  );
}