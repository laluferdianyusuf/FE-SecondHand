import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Card, Button, Container, Form } from "react-bootstrap";
import { Alert, Stack } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import "../style/component.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { styled } from "@mui/material/styles";
import ImageWishList from "../images/wish.png";

export function Content({ productSeller }) {
  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "90%",
    height: "100px",
    margin: "5px",
  };

  const accesoris = {
    fontSize: "11px",
    opacity: "0.5",
  };

  return (
    <>
      <div className="content-product">
        <div className="px-2">
          <Form.Group className="mb-3 upload-product d-flex  ">
            <Button
              variant="secondary"
              className="w-100 d-flex upload-image-product gap-2  align-items-center justify-content-center"
            >
              <Link
                to="/createproductDJ"
                className="text-decoration-none"
                style={{ color: "rgba(138, 138, 138, 1)" }}
              >
                <FiPlus
                  style={{ fontSize: "24px", divor: "rgba(138, 138, 138, 1)" }}
                />{" "}
                <p>Tambah Produk</p>
              </Link>
            </Button>
          </Form.Group>
        </div>

        {productSeller
          ? productSeller.map((item) => (
              <div className="px-2 mb-3 w-100" key={item.id}>
                <Link
                  to={`/homeproduct/${item.id}`}
                  className="text-decoration-none text-black"
                >
                  <Card>
                    <Card.Img
                      className="w-80 align-self-center"
                      variant="top"
                      src={`${item.picture[0]}`}
                      style={image}
                    />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        {item.name}
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        {item.category}
                      </p>
                      <Card.Text className="mb-1">Rp. {item.price}</Card.Text>
                      <span>
                        {item.isPublish ? (
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "10px",
                              color: "grey",
                              flexDirection: "row-reverse",
                            }}
                          >
                            Publish
                          </span>
                        ) : (
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "10px",
                              color: "grey",
                              flexDirection: "row-reverse",
                            }}
                          >
                            Unublish
                          </span>
                        )}
                      </span>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}

export function ContentWistlist() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [sellerProduct, setSellerProduct] = useState([]);

  const text = {
    fontSize: "16px",
    textAlign: "center",
    fontWeight: 400,
  };

  const productCard = {
    width: "300px",
  };

  const title = {
    fontSize: "16px",
  };

  const imageCard = {
    width: "91%",
    height: "100px",
    objectFit: "cover",
    margin: "8px",
    borderRadius: "5px",
  };

  const accesoris = {
    fontSize: "12px",
    opacity: "0.5",
  };

  const CardProduct = {
    width: "100%",
    height: "100%",
  };

  const image = {
    width: "276px",
    height: "194px",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          "https://be-final.herokuapp.com/auth/me",
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

        if (currentUserResponse.data.user.id) {
          const dataTransaction = await axios.get(
            `https://be-final.herokuapp.com/transactions/seller/${currentUserResponse.data.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(dataTransaction);
          const payloadData = dataTransaction.data.data.transactions;
          console.log(payloadData);
          setSellerProduct(payloadData);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, []);

  return isLoggedIn ? (
    <>
      {sellerProduct ? (
        <div className="card-content-seller">
          {sellerProduct.map((products) =>
            products.product.sold === false ? (
              <div key={products.id} className="product-seller">
                <Link
                  to={`/offers/${products.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card style={CardProduct}>
                    <Card.Img
                      className="w-80 align-self-center"
                      variant="top"
                      multiple
                      src={`${products.product.picture[0]}`}
                      style={imageCard}
                    />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        {products.product.name}
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        {products.product.category}
                      </p>
                      <Card.Text className="mb-1">
                        Rp {products.product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <div style={productCard} className="my-4">
                  <img style={image} src={ImageWishList} alt="" />

                  <p style={text}>
                    Belum ada produkmu yang diminati nih, sabar ya rejeki nggak
                    kemana kok
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        ""
      )}
    </>
  ) : (
    ""
  );
}

export function ContentSold() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [sellerProduct, setSellerProduct] = useState([]);

  const text = {
    fontSize: "16px",
    textAlign: "center",
  };

  const image = {
    width: "276px",
    height: "194px",
  };

  const productCard = {
    width: "300px",
  };

  const title = {
    fontSize: "16px",
  };

  const imageCard = {
    width: "91%",
    height: "100px",
    margin: "8px",
    borderRadius: "5px",
  };

  const accesoris = {
    fontSize: "12px",
    opacity: "0.5",
  };

  const CardProduct = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

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
          setUser(currentUserResponse.data.user);
        }

        if (currentUserResponse.data.user.id) {
          const dataTransaction = await axios.get(
            `https://be-final.herokuapp.com/transactions/user/${currentUserResponse.data.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(dataTransaction);
          const payloadData = dataTransaction.data.data.transactions;
          console.log(payloadData);
          setSellerProduct(payloadData);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, []);

  return isLoggedIn ? (
    <>
      {sellerProduct ? (
        <div className="card-content-seller">
          {sellerProduct.map((products) =>
            products.product.sold === true ? (
              <div key={products.id} className="product-seller">
                <Link
                  to={`/offers/${products.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card style={CardProduct}>
                    <Card.Img
                      className="w-80 align-self-center"
                      variant="top"
                      multiple
                      src={`${products.product.picture[0]}`}
                      style={imageCard}
                    />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        {products.product.name}
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        {products.product.category}
                      </p>
                      <Card.Text className="mb-1">
                        Rp {products.bargain_price}
                      </Card.Text>
                      <span>
                        {products.product.sold ? (
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "10px",
                              color: "grey",
                              flexDirection: "row-reverse",
                            }}
                          >
                            berhasil terjual
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <div style={productCard} className="my-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <img style={image} src={ImageWishList} alt="" />
            </div>
            <p style={text}>
              Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana
              kok
            </p>
          </div>
        </div>
      )}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export function UserProfile() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState([]);
  const [show, setShow] = useState(false);
  const bargain_price = useRef("");

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [successResponse, setSuccessResponse] = useState({
    isSuccess: false,
    message: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
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
        `https://be-final.herokuapp.com/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataProduct = await responseProduct.data.data.getdata;
      console.log(dataProduct);

      setData(dataProduct);
      console.log(dataProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateById = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const postPayload = new FormData();
      postPayload.append("isPublish", isPublish);

      const createRequest = await axios.put(
        `https://be-final.herokuapp.com/products/${id}`,
        postPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createResponse = createRequest.data;

      if (createResponse.status) navigate("/daftarjual");
    } catch (err) {
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  const onCreateTransaction = async (e, isOpened, isRejected, isAccepted) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const postPayload = {
        seller_id: data.user.id,
        product_id: data.id,
        bargain_price: bargain_price.current.value,
        isOpened: isOpened,
        isRejected: isRejected,
        isAccepted: isAccepted,
      };
      console.log(postPayload);
      setShow(false);
      const createRequest = await axios.post(
        "https://be-final.herokuapp.com/transactions",
        postPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createRequest);

      const successResponse = createRequest.data.message;
      setSuccessResponse({
        isSuccess: true,
        message: successResponse,
      });

      const user_id = localStorage.getItem("user");
      const userId = JSON.parse(user_id);
      // console.log(JSON.parse(user_id));
      const responseTransactionByUserId = await axios.get(
        `https://be-final.herokuapp.com/transactions/user/${userId.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataTransactionByUserId = await responseTransactionByUserId.data
        .data.transactions;

      setTransaksi(dataTransactionByUserId);
    } catch (err) {
      console.log(err);
      const response = err.response.data;
      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  const getTransactionByUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user");
      const userId = JSON.parse(user_id);
      // console.log(JSON.parse(user_id));
      const responseTransactionByUserId = await axios.get(
        `https://be-final.herokuapp.com/transactions/user/${userId.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataTransactionByUserId = await responseTransactionByUserId.data
        .data.transactions;

      setTransaksi(dataTransactionByUserId);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTransaction =
    Object.keys(transaksi).length !== 0
      ? transaksi.filter(
          (data) => data.product_id === Number(id) && data.isRejected === false
        )
      : "";

  useEffect(() => {
    fetchData();
    getProduct();
    getTransactionByUserId();
  }, []);
  const buttonStyle = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(113, 38, 181, 1)",
    borderRadius: "16px",
    padding: "9px 0",
  };
  const buttonStyleV2 = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
    borderRadius: "16px",
    padding: "9px 0",
  };

  const AlertStyle = styled("div")(({ theme }) => ({
    zIndex: 99999999,
    position: "absolute",

    [theme.breakpoints.up("md")]: {
      width: "50%",
      left: "25%",
      top: "14%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      left: "6%",
      top: "-33%",
    },
  }));

  return (
    <>
      {successResponse.isSuccess && (
        <AlertStyle>
          <Alert
            severity="success"
            variant="filled"
            icon={false}
            className="mt-2 "
            onClose={() => setSuccessResponse(true)}
            dismissible
            style={{ borderRadius: "16px " }}
          >
            {successResponse.message}
          </Alert>
        </AlertStyle>
      )}

      {errorResponse.isError && (
        <AlertStyle>
          <Alert
            severity="error"
            variant="filled"
            className="mt-2 "
            onClose={() => setErrorResponse(true)}
            style={{ borderRadius: "16px " }}
          >
            {errorResponse.message}
          </Alert>
        </AlertStyle>
      )}
      <div className="user-profile">
        <Card className="pb-2">
          <Card.Body>
            <Card.Title className="fw-bold">{data.name}</Card.Title>
            <Card.Text style={{ fontSize: "14px", color: "#8A8A8A" }}>
              {data.category}
            </Card.Text>
            <Card.Text style={{ fontSize: "16px" }}>Rp. {data.price}</Card.Text>
            <div className=" buttons-user">
              <div className="mt-3">
                <Button
                  className="w-100 mb-2"
                  style={buttonStyle}
                  disabled={Object.keys(filteredTransaction).length !== 0}
                  onClick={
                    data.user_id === user.id
                      ? (e) => onUpdateById(e, true)
                      : handleShow
                  }
                >
                  {data.user_id === user.id ? (
                    "terbitkan"
                  ) : Object.keys(filteredTransaction).length !== 0 ? (
                    "Menunggu Respon Penjual"
                  ) : (
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      Saya Tertarik dan Ingin Nego
                    </p>
                  )}
                </Button>
                <Link to={`/update/product/${data.id}`}>
                  <Button
                    className="w-100"
                    style={buttonStyleV2}
                    hidden={data.user_id === user.id ? false : true}
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="d-flex flex-row gap-3 px-3 py-3 mt-3"
          style={{
            borderRadius: "16px",
            border: "none",
            boxShadow: "0 0 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          <Card.Img
            src={`${data.user ? data.user.picture : ""}`}
            style={{ width: "20%", borderRadius: "12px" }}
          />
          <div>
            <Card.Title>{data.user && data.user.name}</Card.Title>
            <Card.Text>{data.user && data.user.city}</Card.Text>
          </div>
        </Card>

        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="modal-penawar"
        >
          <div className="p-3">
            <Modal.Header closeButton className="border-0"></Modal.Header>
            <Modal.Body className="py-0">
              <p className="fw-bold">Masukan Harga Tawarmu</p>
              <p className="text-black-50" style={{ fontSize: "14px" }}>
                Harga tawaranmu akan diketahui penual, jika penjual cocok kamu
                akan segera dihubungi penjual.
              </p>
              <Stack
                direction="row"
                spacing={2}
                style={{ backgroundColor: "#EEEEEE", borderRadius: "16px" }}
                className="p-3"
              >
                <img src={`${data.picture ? data.picture[0] : ""}`} alt="" />
                <Stack>
                  <p className="m-0 fw-bold">{data.name}</p>
                  <p className="m-0 text-black-50">Rp. {data.price}</p>
                </Stack>
              </Stack>
              <Form className="">
                <Form.Group className="mt-3">
                  <Form.Label className="fs-7">Harga Tawar</Form.Label>
                  <Form.Control
                    type="text"
                    ref={bargain_price}
                    placeholder="Rp. 0,00"
                    style={{ borderRadius: "16px" }}
                    className="p-2"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                className="w-100 py-2"
                onClick={(e) => onCreateTransaction(e, false, false, null)}
              >
                Kirim
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
}

export function ProductDesc() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  // console.log(data);
  const [user, setUser] = useState({});
  const fetchData = async () => {
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
        `https://be-final.herokuapp.com/products/${id}`,
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
  return (
    <>
      <div className="mb-3 mt-4">
        <Card
          className="card-description"
          style={{
            borderRadius: "16px",
            border: "none",
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.15)",
          }}
        >
          <Container className="py-3">
            <h4 className="fw-bold">Deskripsi</h4>
            <p style={{ textAlign: "justify" }}>{data.description}</p>
          </Container>
        </Card>
      </div>
    </>
  );
}

export function Profile() {}
