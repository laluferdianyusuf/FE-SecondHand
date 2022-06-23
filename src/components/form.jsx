import React, { useRef, useState } from "react";
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

      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("city", cityField.current.value);
      createPostPayload.append("address", addressField.current.value);
      createPostPayload.append("phoneNumber", phoneNumberField.current.value);
      createPostPayload.append("picture", pictureField);

      const token = localStorage.getItem("token");

      const createRequest = await axios.put(
        `http://localhost/users/update/${id}`,
        createPostPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
              <Form.Control ref={pictureField} type="file" />
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

        <Form>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Nama Product</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Nama Produk"
                className="py-2"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Rp 0,00"
                className="py-2"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kategori</Form.Label>
              <Form.Select style={formStyle}>
                <option hidden>Pilih Kategori</option>
                <option>kategori</option>
                <option>Kategori</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3 upload-product d-flex flex-column ">
              <Form.Label>Foto Produk</Form.Label>
              <Button
                variant="secondary"
                style={buttonUpload}
                className="upload-image-product  "
              >
                <AiOutlinePlus
                  style={{ fontSize: "24px", color: "rgba(138, 138, 138, 1)" }}
                />
                <Form.Control type="file" />
              </Button>
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                type="submit"
                style={buttonStyleV2}
                className="w-50 py-2 text-black"
              >
                Preview
              </Button>
              <Button type="submit" style={buttonStyle} className="w-50 py-2">
                Terbitkan
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}
