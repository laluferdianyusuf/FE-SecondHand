import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { HomeNav } from "../components/Navbar";
import { UserProfile, ProductDesc } from "../components/Content";
import { CarouselProduct } from "../components/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import { styled } from "@mui/material/styles";

export default function PageProduct() {
  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const RootV2 = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      top: "30%",
    },
  }));

  const RootV3 = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      position: "sticky",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));

  return (
    <>
      <Root>
        <div>
          <HomeNav />
        </div>
      </Root>
      <RootV3>
        <div>
          <CarouselProduct />
        </div>
      </RootV3>
      <RootV2>
        <Container className="mt-5" style={{ width: "70%" }}>
          <Row>
            <Col md={8}>
              <Root>
                <div>
                  <CarouselProduct />
                </div>
              </Root>
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
      </RootV2>
    </>
  );
}
