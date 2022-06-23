import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export function Category() {
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
  return (
    <Container className="category">
      <h6 className="fw-bold">Telusuri Kategori</h6>
      <div>
        <div className="d-flex gap-3 button-category">
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Semua
          </Button>
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Hobi
          </Button>
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Kendaraan
          </Button>
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Baju
          </Button>
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Elektronik
          </Button>
          <Button className="d-flex gap-1 px-3" variant="primary">
            <FiSearch className="align-self-center" /> Kesehatan
          </Button>
        </div>

        {isLoggedIn ? (
          <Link to={`/updateacc/${user.id}`} className="text-decoration-none">
            <Button className="d-flex gap-2 px-3 py-2 fixed-bottom button-sell mb-4">
              <BsPlus
                className="align-self-center "
                style={{ fontSize: "24px" }}
              />{" "}
              Jual
            </Button>
          </Link>
        ) : (
          <Link to="/login" className="text-decoration-none">
            <Button className="d-flex gap-2 px-3 py-2 fixed-bottom button-sell mb-4">
              <BsPlus
                className="align-self-center "
                style={{ fontSize: "24px" }}
              />{" "}
              Jual
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
}
