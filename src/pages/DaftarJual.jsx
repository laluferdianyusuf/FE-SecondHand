import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { HomeNav } from "../components/Navbar";
import { SidebarUser, SidebarFix } from "../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

export default function DaftarJual() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const validateLogin = async (e) => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "http://localhost:2000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    validateLogin();
  }, []);

  return isLoggedIn ? (
    <>
      <div>
        <HomeNav />
      </div>
      <Container className="mt-4 page-daftar-jual" style={{ width: "70%" }}>
        <h5 className="fw-bold mb-3">Daftar Jual Saya</h5>
        <Row>
          <Col md={12}>
            <div>
              <SidebarUser />
            </div>
          </Col>
        </Row>
        <SidebarFix />
      </Container>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
