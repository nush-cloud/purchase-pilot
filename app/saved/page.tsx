'use client';

import { useEffect, useState } from "react";
import AppNavbar from "@/components/layout/AppNavbar";
import ProductCard from "@/components/product/ProductCard";
import {
  getSavedProducts,
  getSavedProductsUpdatedEventName,
} from "@/lib/storage";
import { ProductRecommendation } from "@/lib/types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function SavedPage() {
  const [savedProducts, setSavedProducts] = useState<ProductRecommendation[]>([]);

  useEffect(() => {
    const refreshSavedProducts = () => {
      setSavedProducts(getSavedProducts());
    };

    refreshSavedProducts();

    const eventName = getSavedProductsUpdatedEventName();

    window.addEventListener(eventName, refreshSavedProducts);
    window.addEventListener("storage", refreshSavedProducts);

    return () => {
      window.removeEventListener(eventName, refreshSavedProducts);
      window.removeEventListener("storage", refreshSavedProducts);
    };
  }, []);

  return (
    <>
      <AppNavbar />

      <main className="py-5">
        <Container>
          <Row className="mb-4">
            <Col lg={8}>
              <span className="text-uppercase text-secondary fw-semibold small">
                Saved Products
              </span>
              <h1 className="display-5 fw-bold mt-2 mb-3">
                Your saved shortlist
              </h1>
              <p className="lead text-light-emphasis mb-0">
                Keep track of strong product options and revisit them before making
                a final decision.
              </p>
            </Col>
          </Row>

          {savedProducts.length > 0 ? (
            <Row className="g-4 mb-5">
              {savedProducts.map((product, index) => (
                <Col md={6} xl={4} key={`${product.name}-${index}`}>
                  <ProductCard product={{ ...product, id: index + 1 }} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="mb-5">
              <Col lg={8}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h2 className="h4 mb-3">Nothing saved yet</h2>
                    <p className="text-muted mb-0">
                      Save products from the homepage recommendations, then come
                      back here to review your shortlist.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <Row>
            <Col lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h2 className="h4 mb-3">Why this page matters</h2>
                  <p className="text-muted mb-0">
                    Saved items help users narrow options over time instead of
                    losing track across tabs and searches.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}