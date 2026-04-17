'use client';

import AppNavbar from "@/components/layout/AppNavbar";
import SaveButton from "@/components/product/SaveButton";
import { mockRecommendations } from "@/lib/mockData";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

export default function SavedPage() {
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

          <Row className="g-4 mb-5">
            {mockRecommendations.map((product) => (
              <Col md={6} xl={4} key={product.id}>
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

                    <Stack direction="horizontal" gap={2} className="mt-auto flex-wrap">
                      <Button variant="primary" size="sm">
                        Compare
                      </Button>
                      <SaveButton label="Saved" variant="success" />
                      <SaveButton label="Remove" variant="outline-danger" />
                    </Stack>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h2 className="h4 mb-3">Empty state idea for later</h2>
                  <p className="text-muted mb-3">
                    When users have not saved anything yet, this page should guide
                    them back to recommendations clearly instead of feeling blank.
                  </p>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      You haven’t saved any products yet. Start a shopping
                      conversation and bookmark products you want to revisit.
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}