import { Container, Button, Form, Alert, Card, Modal } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import "../style/component.css";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
  const [productSeller, setProductSeller] = useState([]);
  const { id } = useParams();
  console.log(productSeller);

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
        `https://be-final.herokuapp.com/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setProductSeller(dataProduct);
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
        `https://be-final.herokuapp.com/transactions/${id}`,
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
        `https://be-final.herokuapp.com/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setProductSeller(dataProduct);

      if (transactionResponse.status) navigate(`/offers/${productSeller.id}`);
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
        `https://be-final.herokuapp.com/transactions/${id}`,
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
        `https://be-final.herokuapp.com/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getTransactionById;
      console.log(dataProduct);

      setProductSeller(dataProduct);

      if (statusResponse.status) navigate(`/offers/${productSeller.id}`);
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
          <Link to="/" className="text-black position-absolute">
            <IoMdArrowBack style={{ fontSize: "20px" }} />
          </Link>
        </Root>

        <div className="product-offering">
          <div className="d-flex gap-3 card-buyer align-items-center p-3 mb-4">
            <div className="buyer">
              <img
                src={`${productSeller.user ? productSeller.user.picture : ""}`}
                alt=""
              />
            </div>
            <div>
              <h6>{productSeller.user && productSeller.user.name}</h6>
              <p className="m-0">
                {productSeller.user && productSeller.user.city}
              </p>
            </div>
          </div>
          <div className="items-offering">
            <h6 className="mb-4">Daftar Produkmu Yang Ditawar</h6>

            <div className="d-flex gap-3 first-div">
              <img
                src={`${
                  productSeller.product ? productSeller.product.picture[0] : ""
                }`}
                alt=""
              />
              <div>
                <div
                  className="d-flex"
                  style={{
                    fontSize: "10px",
                    color: "rgba(138, 138, 138, 1)",
                  }}
                >
                  <span>Penawaran produk</span>
                  <span className="position-absolute" style={{ right: "25%" }}>
                    {dateFormat(productSeller.createdAt, "d mmm, h:MM")}
                  </span>
                </div>
                <h6>{productSeller.product && productSeller.product.name}</h6>
                <h6>
                  Rp. {productSeller.product && productSeller.product.price}
                </h6>
                <h6>
                  Ditawar Rp.{" "}
                  {productSeller.product && productSeller.bargain_price}
                </h6>
              </div>
            </div>
            <div className="py-3 d-flex">
              <div className="ms-auto button-offers">
                <Button
                  className="me-3 py-1"
                  style={{ width: "158px" }}
                  onClick={
                    productSeller.isAccepted === true
                      ? (e) => handleShowStatus(e)
                      : (e) => updateTransaction(e, false, true, true)
                  }
                  hidden={
                    productSeller.isRejected === true ||
                    (productSeller.product && productSeller.product.sold) ===
                      true
                      ? true
                      : false
                  }
                >
                  {productSeller.isAccepted === true ? "Status" : "Tolak"}
                </Button>
                <Button
                  className="py-1"
                  style={{ width: "158px" }}
                  onClick={(e) => {
                    updateTransaction(e, true, false, true);
                    handleShowAccepted();
                  }}
                  hidden={
                    productSeller.isRejected === true ||
                    (productSeller.product && productSeller.product.sold) ===
                      true
                      ? true
                      : false
                  }
                >
                  {productSeller.isAccepted === true ? (
                    <span
                      className="d-flex justify-content-evenly"
                      style={{ fontSize: "14px" }}
                    >
                      Hubungi di <FaWhatsapp className=" align-self-center" />
                    </span>
                  ) : (
                    "Terima"
                  )}
                </Button>

                {errorResponse.isError && (
                  <Alert variant="danger">{errorResponse.message}</Alert>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* modal accepted */}
        <Modal
          show={showAccepted}
          onHide={handleCloseAccepted}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            className="px-0"
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body
            className="fw-bold px-0"
            style={{
              color: "black",
              fontSize: "14px",
            }}
          >
            Yeay kamu berhasil mendapat harga yang sesuai
          </Modal.Body>
          <Modal.Body
            className="px-0"
            style={{
              color: "#8A8A8A",
              marginTop: "-25px",
              fontSize: "14px",
            }}
          >
            Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
          </Modal.Body>

          <div>
            <Card
              style={{
                borderRadius: "16px ",
                backgroundColor: "#EEEEEE",
                border: "1px solid #EEEEEE",
              }}
            >
              <Modal.Body className="text-center px-0 fw-bold">
                Product Match
              </Modal.Body>

              <div className="d-flex flex-row p-3 gap-2">
                <Card.Img
                  src={`${
                    productSeller.user ? productSeller.user.picture : ""
                  }`}
                  alt=""
                  style={{ width: "48px", height: "48px" }}
                />
                <div>
                  <Card.Title className="mb-0 fw-bold">
                    {productSeller.user && productSeller.user.name}
                  </Card.Title>
                  <Card.Text>
                    {productSeller.user && productSeller.user.city}
                  </Card.Text>
                </div>
              </div>

              <div className="d-flex flex-row p-3 gap-2">
                <Card.Img
                  src={`${
                    productSeller.product
                      ? productSeller.product.picture[0]
                      : ""
                  }`}
                  alt=""
                  style={{ width: "48px", height: "48px" }}
                />
                <div>
                  <Card.Title className="mb-0 fw-bold">
                    {productSeller.product && productSeller.product.name}
                  </Card.Title>
                  <Card.Text>
                    <s>
                      Rp {productSeller.product && productSeller.product.price}
                    </s>
                  </Card.Text>
                  <Card.Text>
                    Ditawar Rp {productSeller.bargain_price}
                  </Card.Text>
                </div>
              </div>
            </Card>
          </div>

          <Modal.Footer className="px-0" style={{ borderTop: "none" }}>
            <button
              className="modal-offers-button w-100"
              onClick={handleCloseAccepted}
            >
              <Link
                to="/gatau"
                className="text-decoration-none d-flex"
                style={{
                  color: "white",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ opacity: 0 }}>p</div>
                Hubungi via Whatsapp
                <FaWhatsapp
                  style={{
                    fontSize: "normal",
                    placeSelf: "center",
                  }}
                />
              </Link>
            </button>
          </Modal.Footer>
        </Modal>

        {/* modal status */}
        <Modal
          show={showStatus}
          onHide={handleCloseStatus}
          centered
          size="sm"
          dialogClassName="modal-30w"
        >
          <div className="p-3">
            <Modal.Header closeButton className="border-0">
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="fw-bold">Perbarui status penjualan produkmu</p>
              <Form>
                <div key={`radio`} onChange={selectedButton} className="mb-3">
                  <Form.Check
                    name="status"
                    type="radio"
                    id={`radio-1`}
                    label={`Berhasil terjual`}
                    value={true}
                  />
                  <p className=" text-black-50">
                    Kamu telah sepakat menjual produk ini kepada pembeli
                  </p>

                  <Form.Check
                    name="status"
                    type="radio"
                    label={`Batalkan transaksi`}
                    id={`radio-2`}
                    value={false}
                  />
                  <p className=" text-black-50">
                    Kamu membatalkan transaksi produk ini dengan pembeli
                  </p>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                className="bg-color-primary w-100 radius-primary border-0"
                onClick={(e) => {
                  updateStatus(e);
                  handleCloseStatus();
                }}
              >
                Kirim
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>
    </>
  );
}
