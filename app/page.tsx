'use client';

import AppNavbar from "@/components/layout/AppNavbar";
import ChatLayout from "@/components/chat/ChatLayout";
import ProductCard from "@/components/product/ProductCard";
import { mockRecommendations } from "@/lib/mockData";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function HomePage() {
  return (
    <>
      <AppNavbar />

      <main className="py-5">
        <Container>
          <Row className="align-items-center gy-4 mb-5">
            <Col lg={6}>
              <span className="text-uppercase text-secondary fw-semibold small">
                AI Shopping Assistant
              </span>
              <h1 className="display-3 fw-bold mt-2 mb-3">
                Shop smarter with Purchase Pilot
              </h1>
              <p className="lead text-light-emphasis mb-4">
                Describe what you need, answer a few quick follow-up questions,
                and get product recommendations you can compare and save.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Button variant="primary" size="lg">
                  Start Shopping
                </Button>
                <Button variant="outline-light" size="lg">
                  View Demo Flow
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <ChatLayout />
            </Col>
          </Row>

          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 className="h2 fw-bold mb-1">Recommended Products</h2>
                <p className="text-light-emphasis mb-0">
                  Mock recommendation cards for the first MVP experience.
                </p>
              </div>
            </div>

            <Row className="g-4">
              {mockRecommendations.map((product) => (
                <Col md={6} xl={4} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </section>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Guided Discovery</Card.Title>
                  <Card.Text>
                    Users start with a natural language prompt instead of digging
                    through endless filters.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Smart Comparison</Card.Title>
                  <Card.Text>
                    Product recommendations are structured so users can compare
                    options with less decision fatigue.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Saved Picks</Card.Title>
                  <Card.Text>
                    Users can save strong candidates and revisit them later
                    instead of losing track across tabs.
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

/*import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}*/
