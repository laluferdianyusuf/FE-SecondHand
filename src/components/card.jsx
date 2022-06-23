import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import firstImage from "../images/Rectangle-23.png";

export function CardProduct() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //fetching
    const response = await axios.get("http://localhost:2000/products");
    //get response data
    const data = await response.data.data.getDataAll;
    console.log(data);

    //assign response data to state "posts"
    setProduct(data);
  };
  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "91%",
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
              multiple
              src={`http://localhost:2000/files/${product.picture}`}
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
