import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Carousel from "react-bootstrap/Carousel";
import "../style/component.css";
import { Card, Col, Row, Alert } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { styled } from "@mui/material/styles";

export function CarouselHome() {
  const options = {
    items: 2,
    autoplay: false,
    autoplayTimeout: false,
    autoplayHoverPause: true,
    center: true,
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };

  return (
    <div className="slider">
      <OwlCarousel className="owl-theme slider-items" {...options}>
        <div className="slider-card">
          <Card className="card-content home-carousel-1">
            <Row>
              <Col xs={8} md={6} className="carousel-text">
                <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                <p className="text-2">Diskon Hingga</p>
                <p className="text-3">60%</p>
              </Col>
              <Col xs={4} md={2} className="carousel-1">
                <img src="/images/carousel-1.png" alt="" />
              </Col>
              <Col xs={6} md={4} className="carousel-2">
                <img src="/images/carousel-2.png" alt="" />
              </Col>
            </Row>
          </Card>
        </div>
        <div className="slider-card second-slide slider-2">
          <Card className="card-content home-carousel-2">
            <Row>
              <Col xs={8} md={6} className="carousel-text">
                <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                <p className="text-2">Diskon Hingga</p>
                <p className="text-3">60%</p>
              </Col>
              <Col xs={4} md={2} className="carousel-1">
                <img src="/images/carousel-1.png" alt="" />
              </Col>
              <Col xs={6} md={4} className="carousel-2">
                <img src="/images/carousel-3.png" alt="" />
              </Col>
            </Row>
          </Card>
        </div>
        <div className="slider-card third-slide slider-2">
          <Card className="card-content home-carousel-3">
            <Row>
              <Col xs={8} md={6} className="carousel-text">
                <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                <p className="text-2">Diskon Hingga</p>
                <p className="text-3">60%</p>
              </Col>
              <Col xs={4} md={2} className="carousel-1">
                <img src="/images/carousel-1.png" alt="" />
              </Col>
              <Col xs={6} md={4} className="carousel-2">
                <img src="/images/carousel-4.png" alt="" />
              </Col>
            </Row>
          </Card>
        </div>
      </OwlCarousel>
    </div>
  );
}

export function CarouselProduct() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  // console.log(data);
  const [user, setUser] = useState({});
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [successResponse, setSuccessResponse] = useState({
    isSuccess: false,
    message: "",
  });

  const fetchData = async () => {
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
      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const responseProduct = await axios.get(
        `http://localhost:2000/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getdata;
      console.log(dataProduct);

      setData(dataProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    getProduct();
  }, []);

  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));

  return (
    <>
      <div className="slider-product">
        {successResponse.isSuccess && (
          <Alert
            variant="success"
            className="mt-5"
            onClose={() => setSuccessResponse(true)}
            dismissible
          >
            {successResponse.message}
          </Alert>
        )}

        <Root>
          <Link to="/daftarjual" className="text-black">
            <h3
              className="position-absolute"
              style={{
                zIndex: 99999,
                backgroundColor: "white",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                top: "25px",
                left: "20px",
              }}
            >
              <FiArrowLeft className="position-absolute" />
            </h3>
          </Link>
        </Root>

        <Carousel className="carousel-home-product">
          {data.picture
            ? data.picture.map((pics) => (
                <Carousel.Item className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={`${pics}`}
                    alt="First slide"
                    style={{ borderRadius: "16px" }}
                  />
                </Carousel.Item>
              ))
            : ""}
        </Carousel>
      </div>
    </>
  );
}
