import AppNavbar from "@/components/layout/AppNavbar";
import Container from "react-bootstrap/Container";

export default function ComparePage() {
  return (
    <>
      <AppNavbar />
      <main className="py-5">
        <Container>
          <h1 className="display-5 fw-bold mb-3">Compare Products</h1>
          <p className="lead text-light-emphasis">
            This page will show side-by-side product comparisons.
          </p>
        </Container>
      </main>
    </>
  );
}