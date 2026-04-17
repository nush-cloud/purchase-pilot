import AppNavbar from "@/components/layout/AppNavbar";
import Container from "react-bootstrap/Container";

export default function SavedPage() {
  return (
    <>
      <AppNavbar />
      <main className="py-5">
        <Container>
          <h1 className="display-5 fw-bold mb-3">Saved Products</h1>
          <p className="lead text-light-emphasis">
            This page will hold the products the user bookmarks.
          </p>
        </Container>
      </main>
    </>
  );
}