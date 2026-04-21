'use client';

import { useEffect, useState } from "react";
import AppNavbar from "@/components/layout/AppNavbar";
import {
  getSavedProducts,
  getSavedProductsUpdatedEventName,
  removeSavedProduct,
} from "@/lib/storage";
import { ProductRecommendation } from "@/lib/types";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

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

  const handleRemove = (productName: string) => {
    removeSavedProduct(productName);
  };

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

                      <div className="d-flex gap-2 flex-wrap mb-3">
                        <Badge bg="success">Saved</Badge>
                      </div>

                      <Card.Text className="text-muted mb-3">
                        {product.description}
                      </Card.Text>

                      <div className="mb-3">
                        <div className="fw-semibold mb-1">Why it matches</div>
                        <div>{product.whyItMatches}</div>
                      </div>

                      <div className="mb-3">
                        <div className="fw-semibold mb-2">Pros</div>
                        <ul className="mb-0 ps-3">
                          {product.pros.map((pro, proIndex) => (
                            <li key={proIndex}>{pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <div className="fw-semibold mb-2">Cons</div>
                        <ul className="mb-0 ps-3">
                          {product.cons.map((con, conIndex) => (
                            <li key={conIndex}>{con}</li>
                          ))}
                        </ul>
                      </div>

                      <Stack direction="horizontal" gap={2} className="mt-auto flex-wrap">
                        <Button variant="primary" size="sm" href="/compare">
                          Compare
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(product.name)}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Card.Body>
                  </Card>
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