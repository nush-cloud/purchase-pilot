'use client';

import { useEffect, useState } from "react";
import AppNavbar from "@/components/layout/AppNavbar";
import ComparisonTable from "@/components/product/ComparisonTable";
import {
  clearCompareProducts,
  getCompareProducts,
  getCompareProductsUpdatedEventName,
} from "@/lib/storage";
import { ProductRecommendation } from "@/lib/types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function ComparePage() {
  const [products, setProducts] = useState<ProductRecommendation[]>([]);

  useEffect(() => {
    const refreshProducts = () => {
      setProducts(getCompareProducts());
    };

    refreshProducts();

    const eventName = getCompareProductsUpdatedEventName();

    window.addEventListener(eventName, refreshProducts);
    window.addEventListener("storage", refreshProducts);

    return () => {
      window.removeEventListener(eventName, refreshProducts);
      window.removeEventListener("storage", refreshProducts);
    };
  }, []);

  const handleClearCompare = () => {
    clearCompareProducts();
    setProducts([]);
  };

  return (
    <>
      <AppNavbar />

      <main className="py-5">
        <Container>
          <Row className="mb-4">
            <Col lg={8}>
              <span className="text-uppercase text-secondary fw-semibold small">
                Compare Products
              </span>
              <h1 className="display-5 fw-bold mt-2 mb-3">
                Side-by-side comparison
              </h1>
              <p className="lead text-light-emphasis mb-0">
                Compare the products you selected across price, match score,
                strengths, and tradeoffs before making a decision.
              </p>
            </Col>

            <Col
              lg={4}
              className="d-flex justify-content-lg-end align-items-start mt-3 mt-lg-0"
            >
              {products.length > 0 && (
                <Button variant="outline-danger" onClick={handleClearCompare}>
                  Clear Compare
                </Button>
              )}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              {products.length > 0 ? (
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <ComparisonTable products={products} />
                  </Card.Body>
                </Card>
              ) : (
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h2 className="h5 mb-2">No products selected yet</h2>
                    <p className="text-muted mb-0">
                      Go back to the homepage and click Compare on the products
                      you want to evaluate side by side.
                    </p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>Why this matters</Card.Title>
                  <Card.Text>
                    Users often struggle to compare tradeoffs across many tabs.
                    This view reduces that friction.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>What users can scan</Card.Title>
                  <Card.Text>
                    Price, match score, pros, cons, and recommendation reasoning
                    are visible in one place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>MVP purpose</Card.Title>
                  <Card.Text>
                    This comparison layout helps validate a more intentional
                    shopping decision flow.
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