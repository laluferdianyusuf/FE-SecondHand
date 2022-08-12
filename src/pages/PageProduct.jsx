import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { HomeNav } from "../components/Navbar";
import { UserProfile, ProductDesc } from "../components/Content";
import { CarouselProduct } from "../components/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { addUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

export default function PageProduct() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "https://be-final.herokuapp.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;

        if (currentUserResponse.status) {
          dispatch(
            addUser({
              user: currentUserResponse.data.user,
              token: token,
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify(currentUserResponse.data.user)
          );
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    validateLogin();
  }, []);

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

  return isLoggedIn ? (
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
  ) : (
    <Navigate to="/login" replace />
  );
}
