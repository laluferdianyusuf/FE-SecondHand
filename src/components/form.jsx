import React, { useRef, useState, useEffect } from "react";
import { Alert, Row, Col, Button, Form, Container } from "react-bootstrap";
import "../style/component.css";
import ImageLogin from "../images/img.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

export function LoginForm() {
  const navigate = useNavigate();
  const emailField = useRef("");
  const passwordField = useRef("");
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userToLoginPayload = {
        email: emailField.current.value,
        password: passwordField.current.value,
      };

      const loginRequest = await axios.post(
        "http://localhost:2000/auth/login",
        userToLoginPayload
      );

      const loginResponse = loginRequest.data;

      console.log(loginResponse);
      if (loginResponse.status) {
        localStorage.setItem("token", loginResponse.data.token);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  const buttonStyle = {
    borderRadius: "12px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const formStyle = {
    borderRadius: "12px",
  };

  const textStyle = {
    color: "rgba(113, 38, 181, 1)",
  };
  return (
    <>
      <Row className="row-login gx-0">
        <Col>
          <img
            src={ImageLogin}
            alt=""
            style={{ height: "617px", width: "100%" }}
          />
        </Col>
        <Col className="mx-5 px-5 align-self-center">
          <Link to="" className="text-black">
            <IoMdArrowBack />
          </Link>
          <div className="w-100 px-5">
            <h3 className="mb-3 fw-bold">Masuk</h3>
            <Form onSubmit={onLogin}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                ref={emailField}
                placeholder="Enter email"
                className="mb-3"
                style={formStyle}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordField}
                placeholder="Enter password"
                className="mb-4"
                style={formStyle}
              />

              <Button type="submit" style={buttonStyle} className="w-100">
                Masuk
              </Button>

              <p className="text-center pt-3">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  style={textStyle}
                  className="text-decoration-none fw-bold"
                >
                  Daftar di sini
                </Link>
              </p>
              {errorResponse.isError && (
                <Alert variant="danger">{errorResponse.message}</Alert>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export function RegisterForm() {
  const navigate = useNavigate();

  const nameField = useRef("");
  const emailField = useRef("");
  const passwordField = useRef("");

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });
  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const userToRegisterPayload = {
        name: nameField.current.value,
        email: emailField.current.value,
        password: passwordField.current.value,
      };

      const registerRequest = await axios.post(
        "http://localhost:2000/auth/register",
        userToRegisterPayload
      );

      const registerResponse = registerRequest.data;

      if (registerResponse.status) navigate("/login");
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  const buttonStyle = {
    borderRadius: "12px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const formStyle = {
    borderRadius: "12px",
  };

  const textStyle = {
    color: "rgba(113, 38, 181, 1)",
  };

  return (
    <>
      <Row className="row-register gx-0">
        <Col>
          <img
            src={ImageLogin}
            alt=""
            style={{ height: "617px", width: "100%" }}
          />
        </Col>
        <Col className="mx-5 px-5 align-self-center">
          <Link to="" className="text-black">
            <IoMdArrowBack />
          </Link>
          <div className="w-100 px-5">
            <h3 className="mb-3 fw-bold">Daftar</h3>
            <Form onSubmit={onRegister}>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                className="mb-3"
                style={formStyle}
                ref={nameField}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh:johndee@gmail.com"
                className="mb-3"
                style={formStyle}
                ref={emailField}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukan Password"
                className="mb-4"
                style={formStyle}
                ref={passwordField}
              />

              {errorResponse.isError && (
                <Alert variant="danger">{errorResponse.message}</Alert>
              )}

              <Button type="submit" style={buttonStyle} className="w-100">
                Daftar
              </Button>

              <p className="text-center pt-3">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  style={textStyle}
                  className="text-decoration-none fw-bold"
                >
                  Masuk di sini
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export function InfoAccForm() {
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
  const navigate = useNavigate();
  const nameField = useRef("");
  const cityField = useRef("");
  const addressField = useRef("");
  const phoneNumberField = useRef("");
  const [pictureField, setPictureField] = useState();
  const { id } = useParams();
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });
  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const createPostPayload = new FormData();

      console.log(pictureField);
      // console.log(setPictureField);
      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("city", cityField.current.value);
      createPostPayload.append("address", addressField.current.value);
      createPostPayload.append("phoneNumber", phoneNumberField.current.value);
      createPostPayload.append("picture", pictureField);

      const token = localStorage.getItem("token");

      const createRequest = await axios.put(
        `http://localhost:2000/users/update/${id}`,
        createPostPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createRequest);

      const createResponse = createRequest.data;

      if (createResponse.status) {
        navigate("/createproduct");
      }
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  const buttonStyle = {
    borderRadius: "12px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const buttonUpload = {
    borderRadius: "12px",
    backgroundColor: "rgba(226, 212, 240, 1)",
    border: "1px solid rgba(226, 212, 240, 1)",
  };

  const formStyle = {
    borderRadius: "12px",
  };
  return (
    <>
      <Container className="form-info-acc ">
        <Link
          to="/"
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Lengkapi Info Akun</h5>
        <Form onSubmit={onUpdate}>
          <Form.Group className="mb-3 upload ">
            <Button
              variant="secondary"
              style={buttonUpload}
              className="upload-image "
            >
              <MdOutlinePhotoCamera
                style={{ fontSize: "36px", color: "rgba(113, 38, 181, 1)" }}
              />
              <Form.Control
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setPictureField(e.target.files[0]);
                }}
              />
            </Button>
          </Form.Group>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Nama"
                className="py-2"
                ref={nameField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kota</Form.Label>
              <Form.Select ref={cityField} style={formStyle}>
                <option hidden>Pilih Kota</option>
                <option value="Lombok">Lombok</option>
                <option value="Mataram">Mataram</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
                ref={addressField}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No. Handphone</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="contoh: +628123456789"
                className="py-2"
                ref={phoneNumberField}
              />
            </Form.Group>
            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}
            <Button type="submit" style={buttonStyle} className="w-100 py-2">
              Simpan
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export function InfoAccFormV2() {
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
  const navigate = useNavigate();
  const nameField = useRef("");
  const cityField = useRef("");
  const addressField = useRef("");
  const phoneNumberField = useRef("");
  const [pictureField, setPictureField] = useState();
  const { id } = useParams();
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });
  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const createPostPayload = new FormData();

      console.log(pictureField);
      // console.log(setPictureField);
      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("city", cityField.current.value);
      createPostPayload.append("address", addressField.current.value);
      createPostPayload.append("phoneNumber", phoneNumberField.current.value);
      createPostPayload.append("picture", pictureField);

      const token = localStorage.getItem("token");

      const createRequest = await axios.put(
        `http://localhost:2000/users/update/${id}`,
        createPostPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createRequest);

      const createResponse = createRequest.data;

      if (createResponse.status) {
        navigate("/daftarjual");
      }
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  const buttonStyle = {
    borderRadius: "12px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const buttonUpload = {
    borderRadius: "12px",
    backgroundColor: "rgba(226, 212, 240, 1)",
    border: "1px solid rgba(226, 212, 240, 1)",
  };

  const formStyle = {
    borderRadius: "12px",
  };
  return (
    <>
      <Container className="form-info-acc ">
        <Link
          to="/"
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Lengkapi Info Akun</h5>
        <Form onSubmit={onUpdate}>
          <Form.Group className="mb-3 upload ">
            <Button
              variant="secondary"
              style={buttonUpload}
              className="upload-image "
            >
              <MdOutlinePhotoCamera
                style={{ fontSize: "36px", color: "rgba(113, 38, 181, 1)" }}
              />
              <Form.Control
                type="file"
                onChange={(e) => {
                  setPictureField(e.target.files[0]);
                }}
              />
            </Button>
          </Form.Group>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Nama"
                className="py-2"
                ref={nameField}
                defaultValue={user.name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kota</Form.Label>
              <Form.Select ref={cityField} style={formStyle} value={user.city}>
                <option hidden>Pilih Kota</option>
                <option value="Lombok">Lombok</option>
                <option value="Mataram">Mataram</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
                ref={addressField}
                defaultValue={user.address}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No. Handphone</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="contoh: +628123456789"
                className="py-2"
                ref={phoneNumberField}
                defaultValue={user.phoneNumber}
              />
            </Form.Group>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}
            <Button type="submit" style={buttonStyle} className="w-100 py-2">
              Simpan
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export function InfoProductForm() {
  const navigate = useNavigate();
  const nameField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);
  const [isPublish, setIsPublish] = useState(Boolean);
  const [pictureField, setPictureField] = useState();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const buttonStyle = {
    borderRadius: "16px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const buttonStyleV2 = {
    borderRadius: "16px",
    backgroundColor: "rgba(113, 38, 181, 0)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };

  const buttonUpload = {
    borderRadius: "12px",
    backgroundColor: "rgba(226, 212, 240, 0)",
    border: "2px dashed rgba(226, 212, 240, 1)",
  };

  const formStyle = {
    borderRadius: "12px",
  };

  const onCreate = async (e) => {
    e.preventDefault();

    try {
      const createPostPayload = new FormData();

      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("price", priceField.current.value);
      createPostPayload.append("category", categoryField.current.value);
      createPostPayload.append("description", descriptionField.current.value);
      createPostPayload.append("sold", isSold);
      createPostPayload.append("isPublish", isPublish);
      createPostPayload.append("picture", pictureField);

      const token = localStorage.getItem("token");

      const createRequest = await axios.post(
        "http://localhost:2000/products/create",
        createPostPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createResponse = createRequest.data.data;

      if (createResponse.status) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  return (
    <>
      <Container className="form-info-product">
        <Link
          to="/"
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Lengkapi Detail Product</h5>

        <Form onSubmit={onCreate}>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Nama Product</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Nama Produk"
                className="py-2"
                ref={nameField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Rp 0,00"
                className="py-2"
                ref={priceField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kategori</Form.Label>
              <Form.Select style={formStyle} ref={categoryField}>
                <option hidden>Pilih Kategori</option>
                <option value="Hobi">Hobi</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Baju">Baju</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Kesehatan">Kesehatan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
                ref={descriptionField}
              />
            </Form.Group>

            <Form.Group className="mb-3 upload-product d-flex flex-column ">
              <Form.Label>Foto Produk</Form.Label>
              <Button
                variant="secondary"
                style={buttonUpload}
                className="upload-image-product"
              >
                <AiOutlinePlus
                  style={{ fontSize: "24px", color: "rgba(138, 138, 138, 1)" }}
                />
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => {
                    setPictureField(e.target.files[0]);
                  }}
                />
              </Button>
            </Form.Group>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}

            <div className="d-flex gap-3">
              <Button
                type="submit"
                style={buttonStyleV2}
                className="w-50 py-2 text-black"
                onClick={() => setIsPublish(false)}
              >
                Preview
              </Button>
              <Button
                type="submit"
                style={buttonStyle}
                className="w-50 py-2"
                onClick={() => setIsPublish(true)}
              >
                Terbitkan
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}
