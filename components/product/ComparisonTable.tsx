'use client';

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { ProductRecommendation } from "@/lib/types";

interface ComparisonTableProps {
  products: ProductRecommendation[];
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  const getProductKey = (product: ProductRecommendation, index: number) =>
    `${product.name}-${index}`;

  return (
    <div className="table-responsive">
      <Table bordered hover className="align-middle bg-white shadow-sm">
        <thead>
          <tr>
            <th style={{ minWidth: "180px" }}>Criteria</th>
            {products.map((product, index) => (
              <th
                key={`header-${getProductKey(product, index)}`}
                style={{ minWidth: "240px" }}
              >
                <div className="fw-bold">{product.name}</div>
                <div className="text-primary">{product.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Category</td>
            {products.map((product, index) => (
              <td key={`category-${getProductKey(product, index)}`}>
                {product.category}
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Match Score</td>
            {products.map((product, index) => (
              <td key={`score-${getProductKey(product, index)}`}>
                <Badge bg="success">{product.matchScore}% Match</Badge>
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Description</td>
            {products.map((product, index) => (
              <td key={`description-${getProductKey(product, index)}`}>
                {product.description}
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Why it matches</td>
            {products.map((product, index) => (
              <td key={`why-${getProductKey(product, index)}`}>
                {product.whyItMatches}
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Pros</td>
            {products.map((product, index) => (
              <td key={`pros-${getProductKey(product, index)}`}>
                <ul className="mb-0 ps-3">
                  {product.pros.map((pro, proIndex) => (
                    <li key={`${getProductKey(product, index)}-pro-${proIndex}`}>
                      {pro}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          <tr>
            <td className="fw-semibold">Cons</td>
            {products.map((product, index) => (
              <td key={`cons-${getProductKey(product, index)}`}>
                <ul className="mb-0 ps-3">
                  {product.cons.map((con, conIndex) => (
                    <li key={`${getProductKey(product, index)}-con-${conIndex}`}>
                      {con}
                    </li>
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