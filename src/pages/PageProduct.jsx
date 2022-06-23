import React from "react";
import { HomeNavIsLogin } from "../components/Navbar";
import { UserProfile, ProductDesc } from "../components/Content";
import { CarouselProduct } from "../components/Carousel";
import { Container, Row, Col } from "react-bootstrap";

export default function PageProduct() {
  return (
    <>
      <div>
        <HomeNavIsLogin />
      </div>
      <Container className="mt-5" style={{ width: "70%" }}>
        <Row>
          <Col md={8}>
            <div>
              <CarouselProduct />
            </div>
          </Col>
          <Col md={4}>
            <div>
              <UserProfile />
            </div>
          </Col>
          <Col md={8}>
            <div>
              <ProductDesc />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
