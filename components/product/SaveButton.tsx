'use client';

import Button from "react-bootstrap/Button";

interface SaveButtonProps {
  label?: string;
  variant?: string;
}

export default function SaveButton({
  label = "Save",
  variant = "outline-primary",
}: SaveButtonProps) {
  return (
    <Button variant={variant} size="sm">
      {label}
    </Button>
  );
}