'use client';
import AppNavbar from "@/components/layout/AppNavbar";
import ComparisonTable from "@/components/product/ComparisonTable";
import { mockRecommendations } from "@/lib/mockData";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function ComparePage() {
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
                Compare recommended products across price, match score, strengths,
                and tradeoffs before making a decision.
              </p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <ComparisonTable products={mockRecommendations} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>Why this matters</Card.Title>
                  <Card.Text>
                    Users often struggle to compare product tradeoffs across many tabs.
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
                    Price, match score, pros, cons, and recommendation reasoning are
                    visible in one place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>MVP purpose</Card.Title>
                  <Card.Text>
                    This comparison layout helps validate the core shopping flow before
                    connecting real AI output.
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