import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { Content } from "../components/Content";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { Alert, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

export function SidebarUser() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
        console.log(currentUserResponse);

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };
    validateLogin();
  }, []);

  const buttonStyle = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "8px",
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="navigasi-user">
          <Card className="p-3">
            <div className="d-flex gap-3">
              <Card.Img src={`${user.picture}`} style={{ width: "5%" }} />
              <div>
                <Card.Text className="mb-0 fw-bold">{user.name}</Card.Text>
                <Card.Text>{user.city}</Card.Text>
              </div>
              <Button
                href={`/updateaccv2/${user.id}`}
                size="sm"
                className="ms-auto align-self-center text-black px-3 fw-400"
                style={buttonStyle}
              >
                Edit
              </Button>
            </div>
            <div></div>
          </Card>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export function SidebarFix() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [productSeller, setproductSeller] = useState([]);
  const alert = useSelector((state) => state.product.alert);
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const [products, setProducts] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [sold, setSold] = useState(false);
  const productsHandler = (event, index) => {
    setProducts(true);
    setWishlist(false);
    setSold(false);
    setSelectedIndex(index);
  };
  const wishlistHandler = (event, index) => {
    setProducts(false);
    setWishlist(true);
    setSold(false);
    setSelectedIndex(index);
  };
  const soldHandler = (event, index) => {
    setProducts(false);
    setWishlist(false);
    setSold(true);
    setSelectedIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

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

        if (currentUserResponse.data.user.id) {
          const dataProducts = await axios.get(
            `http://localhost:2000/users/${currentUserResponse.data.user.id}/products`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const payloadData = dataProducts.data.data.products;
          console.log(payloadData);
          setproductSeller(payloadData);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, []);

  return isLoggedIn ? (
    <>
      <Stack
        sx={{
          width: "50%",
          left: "27%",
          right: 0,
          top: 0,
          transition: "0.5s",
          marginTop: show ? { xs: "120px", md: "100px" } : "-350px",
          position: "absolute",
          display: alert ? "block" : "none",
        }}
        spacing={2}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          {alert}
        </Alert>
      </Stack>

      <Container className="daftar-jual p-0 mt-3">
        <div class="d-flex">
          <div class="flex-shrink-0">
            <Card className="sidebar-category-responsive">
              <div className="category-daftar-jual-item">
                <Box>
                  <List>
                    <h5 className="category-seller-text1">Kategori</h5>
                    <ListItemButton
                      className="category-seller-button d-flex gap-3"
                      selected={selectedIndex === 1}
                      onClick={(event) => productsHandler(event, 1)}
                    >
                      <FiBox className="seller-icon" />

                      <ListItemText primary="Semua Produk" />
                      <FiChevronRight className="seller-icon" />
                    </ListItemButton>

                    <Divider variant="middle" />
                    <ListItemButton
                      className="d-flex gap-3"
                      selected={selectedIndex === 2}
                      onClick={(event) => wishlistHandler(event, 2)}
                    >
                      <FiHeart className="seller-icon" />

                      <ListItemText primary="Diminati" />
                      <FiChevronRight className="seller-icon" />
                    </ListItemButton>

                    <Divider variant="middle" />
                    <ListItemButton
                      className="d-flex gap-3"
                      selected={selectedIndex === 3}
                      onClick={(event) => soldHandler(event, 3)}
                    >
                      <FiDollarSign className="seller-icon" />

                      <ListItemText primary="Terjual" />
                      <FiChevronRight className="seller-icon" />
                    </ListItemButton>
                  </List>
                </Box>
              </div>
            </Card>
          </div>

          <Container className="category-daftar-jual_scroll">
            <div className="d-flex gap-3 button-second-category mb-3 ">
              <Button
                className="d-flex gap-2"
                variant="primary"
                onClick={productsHandler}
              >
                <FiBox className="align-self-center" /> Produk
              </Button>
              <Button
                className="d-flex gap-2"
                variant="primary"
                onClick={wishlistHandler}
              >
                <FiHeart className="align-self-center" /> Diminati
              </Button>
              <Button
                className="d-flex gap-2"
                variant="primary"
                onClick={soldHandler}
              >
                <FiDollarSign className="align-self-center" /> Terjual
              </Button>
            </div>
            {products && <Content productSeller={productSeller} />}
            {wishlist && <Content />}
            {sold && <Content />}
          </Container>
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
