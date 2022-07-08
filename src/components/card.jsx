import React from "react";
import { Container, Card } from "react-bootstrap";

export function CardProduct({ product }) {
  const title = {
    fontSize: "14px",
  };

  const image = {
    margin: "8px",
  };

  const accesoris = {
    fontSize: "11px",
    opacity: "0.5",
  };
  return (
    <Container className="card-content">
      {product.map((product) => (
        <div key={product.id}>
          <Card>
            <Card.Img
              variant="top"
              className="align-self-center w-75"
              multiple
              src={`http://localhost:2000/public/files/${product.picture[0]}`}
              style={image}
            />
            <Card.Body className="p-2">
              <Card.Title className="mb-0" style={title}>
                {product.title}
              </Card.Title>
              <p className="mb-0" style={accesoris}>
                {product.category}
              </p>
              <Card.Text className="mb-1">{product.price}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
}
