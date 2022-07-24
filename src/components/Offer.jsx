import {
  Container,
  Button,
  Nav,
  Navbar,
  Form,
  Alert,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import "../style/component.css";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import dateFormat from "dateformat";

export function Offer() {
  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [sellerProduct, setSellerProduct] = useState([]);
  const { id } = useParams();

  const [showAccepted, setShowAccepted] = useState(false);
  const handleCloseAccepted = () => setShowAccepted(false);
  const handleShowAccepted = () => setShowAccepted(true);
  const [showStatus, setShowStatus] = useState(false);
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = (e) => {
    e.preventDefault();
    setShowStatus(true);
  };

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const getTransaksiById = async () => {
    try {
      const token = localStorage.getItem("token");
      const responseProduct = await axios.get(
        `http://localhost:8888/api/transactionById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setSellerProduct(dataProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTransaction = async (e, isAccepted, isRejected, isOpened) => {
    e.preventDefault();

    try {
      const updateTransaction = {
        isAccepted: isAccepted,
        isRejected: isRejected,
        isOpened: isOpened,
      };

      const token = localStorage.getItem("token");
      const transactionRequest = await axios.put(
        `http://localhost:8888/api/transaction/${id}`,
        updateTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transactionResponse = transactionRequest.data;
      console.log(transactionResponse);

      const responseProduct = await axios.get(
        `http://localhost:8888/api/transactionById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setSellerProduct(dataProduct);

      if (transactionResponse.status)
        navigate(`/sellerproductpenawar/${sellerProduct.id}`);
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  const [selectedSold, setSelectedSold] = useState();
  const selectedButton = (e) => {
    setSelectedSold(e.target.value);
    console.log(e.target.value);
  };

  const updateStatus = async (e) => {
    e.preventDefault();

    try {
      const payloadUpdateStatus = {
        isAccepted: selectedSold === true ? true : false,
        isRejected: selectedSold === true ? false : true,
        sold: selectedSold,
      };

      const token = localStorage.getItem("token");
      const statusRequest = await axios.put(
        `http://localhost:2000/transactions/${id}`,
        payloadUpdateStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statusResponse = statusRequest.data;
      console.log(statusResponse);

      const responseProduct = await axios.get(
        `http://localhost:2000/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setSellerProduct(dataProduct);

      if (statusResponse.status) navigate(`/offers/${sellerProduct.id}`);
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  useEffect(() => {
    getTransaksiById();
  }, []);
  return (
    <>
      <Container className="offers-page mt-5">
        <Root>
          <Link to="/daftarjual" className="text-black position-absolute">
            <IoMdArrowBack style={{ fontSize: "20px" }} />
          </Link>
        </Root>

        <div className="product-offering">
          <div className="d-flex gap-3 card-buyer align-items-center p-3 mb-4">
            <div className="buyer">
              <img src="/images/Rectangle-33.png" alt="" />
            </div>
            <div>
              <h6>Nama Pembeli</h6>
              <p className="m-0">Kota</p>
            </div>
          </div>
          <div className="items-offering">
            <h6 className="mb-4">Daftar Produkmu Yang Ditawar</h6>

            <div className="d-flex gap-3 first-div">
              <img src="/images/Rectangle-33-jam.png" alt="" />
              <div>
                <div
                  className="d-flex"
                  style={{ fontSize: "10px", color: "rgba(138, 138, 138, 1)" }}
                >
                  <span>Penawaran produk</span>
                  <span className="position-absolute" style={{ right: "25%" }}>
                    20 Apr, 14.04
                  </span>
                </div>
                <h6>Jam Tangan Casio</h6>
                <h6>Rp. 250.000</h6>
                <h6>Ditawar Rp. 200.000</h6>
              </div>
            </div>
            <div className="py-3 d-flex">
              <div className="ms-auto button-offers">
                <Button className="me-3 py-1" style={{ width: "158px" }}>
                  Tolak
                </Button>
                <Button className="py-1" style={{ width: "158px" }}>
                  Terima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
