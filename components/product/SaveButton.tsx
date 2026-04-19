'use client';

import Button from "react-bootstrap/Button";

interface SaveButtonProps {
  label?: string;
  variant?: string;
  onClick?: () => void;
}

export default function SaveButton({
  label = "Save",
  variant = "outline-primary",
  onClick,
}: SaveButtonProps) {
  return (
    <Button variant={variant} size="sm" onClick={onClick}>
      {label}
    </Button>
  );
}