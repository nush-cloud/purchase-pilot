'use client';

import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  getCompareProductsCount,
  getCompareProductsUpdatedEventName,
  getSavedProductsCount,
  getSavedProductsUpdatedEventName,
} from "@/lib/storage";

export default function AppNavbar() {
  const [savedCount, setSavedCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const refreshCounts = () => {
      setSavedCount(getSavedProductsCount());
      setCompareCount(getCompareProductsCount());
    };

    refreshCounts();

    const savedEventName = getSavedProductsUpdatedEventName();
    const compareEventName = getCompareProductsUpdatedEventName();

    window.addEventListener(savedEventName, refreshCounts);
    window.addEventListener(compareEventName, refreshCounts);
    window.addEventListener("storage", refreshCounts);

    return () => {
      window.removeEventListener(savedEventName, refreshCounts);
      window.removeEventListener(compareEventName, refreshCounts);
      window.removeEventListener("storage", refreshCounts);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Purchase Pilot
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/compare" className="d-flex align-items-center gap-2">
              <span>Compare</span>
              {compareCount > 0 && <Badge bg="primary">{compareCount}</Badge>}
            </Nav.Link>

            <Nav.Link href="/saved" className="d-flex align-items-center gap-2">
              <span>Saved</span>
              {savedCount > 0 && <Badge bg="success">{savedCount}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}