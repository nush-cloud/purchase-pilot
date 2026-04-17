'use client';

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { ProductRecommendation } from "@/lib/types";

interface ComparisonTableProps {
  products: ProductRecommendation[];
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  return (
    <div className="table-responsive">
      <Table bordered hover className="align-middle bg-white shadow-sm">
        <thead>
          <tr>
            <th style={{ minWidth: "180px" }}>Criteria</th>
            {products.map((product) => (
              <th key={product.id} style={{ minWidth: "240px" }}>
                <div className="fw-bold">{product.name}</div>
                <div className="text-primary">{product.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Category</td>
            {products.map((product) => (
              <td key={product.id}>{product.category}</td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Match Score</td>
            {products.map((product) => (
              <td key={product.id}>
                <Badge bg="success">{product.matchScore}% Match</Badge>
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Description</td>
            {products.map((product) => (
              <td key={product.id}>{product.description}</td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Why it matches</td>
            {products.map((product) => (
              <td key={product.id}>{product.whyItMatches}</td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Pros</td>
            {products.map((product) => (
              <td key={product.id}>
                <ul className="mb-0 ps-3">
                  {product.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Cons</td>
            {products.map((product) => (
              <td key={product.id}>
                <ul className="mb-0 ps-3">
                  {product.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}