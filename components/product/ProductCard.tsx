'use client';

import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import SaveButton from "./SaveButton";
import { ProductRecommendation } from "@/lib/types";
import {
  addCompareProduct,
  isProductCompared,
  isProductSaved,
  removeCompareProduct,
  removeSavedProduct,
  saveProduct,
} from "@/lib/storage";

interface ProductCardProps {
  product: ProductRecommendation;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);

  useEffect(() => {
    setSaved(isProductSaved(product.name));
    setCompared(isProductCompared(product.name));
  }, [product.name]);

  const handleSaveToggle = () => {
    if (saved) {
      removeSavedProduct(product.name);
      setSaved(false);
    } else {
      saveProduct(product);
      setSaved(true);
    }
  };

  const handleCompareToggle = () => {
    if (compared) {
      removeCompareProduct(product.name);
      setCompared(false);
    } else {
      addCompareProduct(product);
      setCompared(true);
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div className="text-secondary small text-uppercase fw-semibold mb-1">
              {product.category}
            </div>
            <Card.Title className="mb-1">{product.name}</Card.Title>
            <div className="fw-bold text-primary">{product.price}</div>
          </div>

          <Badge bg="success" pill>
            {product.matchScore}% Match
          </Badge>
        </div>

        <Card.Text className="text-muted mb-3">
          {product.description}
        </Card.Text>

        <div className="mb-3">
          <div className="fw-semibold mb-1">Why it matches</div>
          <div>{product.whyItMatches}</div>
        </div>

        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item className="px-0">
            <div className="fw-semibold mb-2">Pros</div>
            <ul className="mb-0 ps-3">
              {product.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <div className="fw-semibold mb-2">Cons</div>
            <ul className="mb-0 ps-3">
              {product.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </ListGroup.Item>
        </ListGroup>

        <Stack direction="horizontal" gap={2} className="mt-auto flex-wrap">
          <Button
            variant={compared ? "success" : "primary"}
            size="sm"
            onClick={handleCompareToggle}
          >
            {compared ? "Added to Compare" : "Compare"}
          </Button>

          <SaveButton
            label={saved ? "Saved" : "Save"}
            variant={saved ? "success" : "outline-primary"}
            onClick={handleSaveToggle}
          />
        </Stack>
      </Card.Body>
    </Card>
  );
}