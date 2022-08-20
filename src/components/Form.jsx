import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Button, Form, Container, Card } from "react-bootstrap";
import { Alert } from "@mui/material";
import "../style/component.css";
import ImageLogin from "../images/img.png";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { addProduct } from "../slices/productSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function LoginForm() {
  const navigate = useNavigate();
  const emailField = useRef("");
  const passwordField = useRef("");
  const [open, setOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const handleCloseProgress = () => {
    setOpen(false);
  };

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userToLoginPayload = {
        email: emailField.current.value,
        password: passwordField.current.value,
      };
      setOpen(true);
      const loginRequest = await axios.post(
        "https://be-final.herokuapp.com/auth/login",
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
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Row className="row-login gx-0">
        <Col>
          <img
            src={ImageLogin}
            alt=""
            style={{ height: "617px", width: "100%" }}
          />
        </Col>
        <Col className="mx-5 px-5 align-self-center">
          <Link to="" className="text-black arrow-back">
            <IoMdArrowBack className="arrow-back" />
          </Link>
          <div className="w-100 px-5 row-login-body">
            <h3 className="mb-3 fw-bold">Sign In</h3>
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
              <div className="d-flex position-relative">
                <Form.Control
                  type={showPass ? "text" : "password"}
                  ref={passwordField}
                  placeholder="Enter password"
                  className="mb-4"
                  style={formStyle}
                />

                <Button
                  onClick={handleShowPass}
                  className="position-absolute"
                  style={{
                    right: "0",
                    backgroundColor: "transparent",
                    border: "1px solid transparent",
                  }}
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible
                      style={{ fontSize: "20px" }}
                      className="text-black"
                    />
                  ) : (
                    <AiOutlineEye
                      className="text-black"
                      style={{ fontSize: "20px" }}
                    />
                  )}
                </Button>
              </div>

              {errorResponse.isError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  {errorResponse.message}
                </Alert>
              )}

              <Button type="submit" style={buttonStyle} className="w-100 mt-3">
                Sign In
              </Button>

              <p className="text-center pt-3">
                Don't Hhave any account?{" "}
                <Link
                  to="/register"
                  style={textStyle}
                  className="text-decoration-none fw-bold"
                >
                  Click Here
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const nameField = useRef("");
  const emailField = useRef("");
  const passwordField = useRef("");

  const handleCloseProgress = () => {
    setOpen(false);
  };

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const userToRegisterPayload = {
        name: nameField.current.value,
        email: emailField.current.value,
        password: passwordField.current.value,
      };

      const registerRequest = await axios.post(
        "https://be-final.herokuapp.com/auth/register",
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
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Row className="row-register gx-0">
        <Col>
          <img
            src={ImageLogin}
            alt=""
            style={{ height: "617px", width: "100%" }}
          />
        </Col>
        <Col className="mx-5 px-5 align-self-center ">
          <Link to="" className="text-black">
            <IoMdArrowBack className="arrow-back" />
          </Link>
          <div className="w-100 px-5 row-register-body">
            <h3 className="mb-3 fw-bold">Daftar</h3>
            <Form onSubmit={onRegister}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                className="mb-3"
                style={formStyle}
                ref={nameField}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ex:johndee@gmail.com"
                className="mb-3"
                style={formStyle}
                ref={emailField}
              />

              <Form.Label>Password</Form.Label>
              <div className="d-flex position-relative">
                <Form.Control
                  type={showPass ? "text" : "password"}
                  ref={passwordField}
                  placeholder="Enter password"
                  className="mb-4"
                  style={formStyle}
                />

                <Button
                  onClick={handleShowPass}
                  className="position-absolute"
                  style={{
                    right: "0",
                    backgroundColor: "transparent",
                    border: "1px solid transparent",
                  }}
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible
                      style={{ fontSize: "20px" }}
                      className="text-black"
                    />
                  ) : (
                    <AiOutlineEye
                      className="text-black"
                      style={{ fontSize: "20px" }}
                    />
                  )}
                </Button>
              </div>

              {errorResponse.isError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  {errorResponse.message}
                </Alert>
              )}

              <Button type="submit" style={buttonStyle} className="w-100 mt-3">
                Daftar
              </Button>

              <p className="text-center pt-3">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={textStyle}
                  className="text-decoration-none fw-bold"
                >
                  Click Here
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
  const [open, setOpen] = useState(false);
  const handleCloseProgress = () => {
    setOpen(false);
  };
  useEffect(() => {
    const validateLogin = async (e) => {
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
  const { id } = useParams();
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });
  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const createPostPayload = new FormData();

      // console.log(setPictureField);
      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("city", cityField.current.value);
      createPostPayload.append("address", addressField.current.value);
      createPostPayload.append("phoneNumber", phoneNumberField.current.value);
      files.forEach((element) => {
        createPostPayload.append("picture", element);
      });

      setOpen(true);
      const token = localStorage.getItem("token");

      const createRequest = await axios.put(
        `https://be-final.herokuapp.com/users/update/${id}`,
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

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoggedIn ? (
        <Container className="form-info-acc ">
          <Link
            to="/"
            className="text-black position-absolute "
            style={{ left: "25%" }}
          >
            <IoMdArrowBack style={{ fontSize: "20px" }} />
          </Link>
          <h5 className="text-center">Complete Your Account</h5>
          <Form onSubmit={onUpdate}>
            <Form.Group className="mb-3 upload ">
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <Button
                      variant="secondary"
                      style={buttonUpload}
                      className="upload-image "
                    >
                      <h2>
                        <MdOutlinePhotoCamera
                          style={{
                            fontSize: "36px",
                            color: "rgba(113, 38, 181, 1)",
                          }}
                        />
                      </h2>
                    </Button>
                  ) : (
                    <div>{thumbs}</div>
                  )}
                </div>
              </section>
            </Form.Group>
            <div className="w-50 form-body">
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  style={formStyle}
                  placeholder="Name"
                  className="py-2"
                  ref={nameField}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>City</Form.Label>
                <Form.Select ref={cityField} style={formStyle}>
                  <option hidden>Choose a city</option>
                  <option value="Lombok">Praya</option>
                  <option value="Mataram">Mataram</option>
                  <option value="Mataram">Tangerang</option>
                  <option value="Mataram">Bandung</option>
                  <option value="Mataram">Jakarta</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  style={formStyle}
                  as="textarea"
                  placeholder="Ex: Jalan Ikan Hiu 33"
                  className="py-2"
                  ref={addressField}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  style={formStyle}
                  placeholder="Ex: +628123456789"
                  className="py-2"
                  ref={phoneNumberField}
                />
              </Form.Group>
              {errorResponse.isError && (
                <Alert variant="danger">{errorResponse.message}</Alert>
              )}
              <Button type="submit" style={buttonStyle} className="w-100 py-2">
                Save
              </Button>
            </div>
          </Form>
        </Container>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export function InfoAccFormV2() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const handleCloseProgress = () => {
    setOpen(false);
  };
  useEffect(() => {
    const validateLogin = async (e) => {
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
      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("city", cityField.current.value);
      createPostPayload.append("address", addressField.current.value);
      createPostPayload.append("phoneNumber", phoneNumberField.current.value);
      createPostPayload.append("picture", pictureField);
      setOpen(true);
      const token = localStorage.getItem("token");

      const createRequest = await axios.put(
        `https://be-final.herokuapp.com/users/update/${id}`,
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

  const image = {
    display: "block",
    width: "45%",
    height: "100%",
  };

  const RootInfoAcc = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
  }));
  return (
    <>
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoggedIn ? (
        <Container className="form-info-acc mt-3">
          <Link
            to="/daftarjual"
            className="text-black position-absolute "
            style={{ left: "25%" }}
          >
            <IoMdArrowBack style={{ fontSize: "20px" }} />
          </Link>
          <h5 className="text-center">Complete Your Account</h5>
          <Form onSubmit={onUpdate}>
            <div className="w-50 form-body">
              {user.picture ? (
                <RootInfoAcc className="m-auto">
                  <Card className="profil-image-preview ">
                    <img
                      component={"img"}
                      src={`${user.picture}`}
                      style={image}
                      alt=""
                    />

                    <Form.Control
                      type="file"
                      className="formCamera"
                      onChange={(e) => {
                        setPictureField(e.target.files[0]);
                      }}
                    />
                  </Card>
                </RootInfoAcc>
              ) : (
                <Form.Group className="mb-3 upload ">
                  <Button
                    variant="secondary"
                    style={buttonUpload}
                    className="upload-image "
                  >
                    <MdOutlinePhotoCamera
                      style={{
                        fontSize: "36px",
                        color: "rgba(113, 38, 181, 1)",
                      }}
                    />
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        setPictureField(e.target.files[0]);
                      }}
                    />
                  </Button>
                </Form.Group>
              )}
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  style={formStyle}
                  placeholder="Name"
                  className="py-2"
                  ref={nameField}
                  defaultValue={user.name}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Kota</Form.Label>
                <Form.Select
                  ref={cityField}
                  defaultValue={user.city}
                  style={formStyle}
                >
                  <option hidden>Pilih Kota</option>
                  <option value="Lombok">Lombok</option>
                  <option value="Mataram">Mataram</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
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
                Save
              </Button>
            </div>
          </Form>
        </Container>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export function InfoProductForm(props) {
  const navigate = useNavigate();
  const nameField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCloseProgress = () => {
    setOpen(false);
  };

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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

  const formStyle = {
    borderRadius: "12px",
  };

  const onCreate = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const createPostPayload = new FormData();

      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("price", priceField.current.value);
      createPostPayload.append("category", categoryField.current.value);
      createPostPayload.append("description", descriptionField.current.value);
      createPostPayload.append("sold", isSold);
      createPostPayload.append("isPublish", isPublish);
      files.forEach((element) => {
        createPostPayload.append("picture", element);
      });
      setOpen(true);

      const createRequest = await axios.post(
        "https://be-final.herokuapp.com/products/create",
        createPostPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createResponse = createRequest.data;

      dispatch(addProduct(createResponse.message));

      if (createResponse.status) {
        if (isPublish) navigate("/daftarjual");
        else navigate("/daftarjual");
      }
    } catch (err) {
      const response = err.response.data;
      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container className="form-info-product">
        <Link
          to="/"
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Product Detail</h5>

        <Form>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Product Name"
                className="py-2"
                ref={nameField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Rp 0,00"
                className="py-2"
                ref={priceField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select style={formStyle} ref={categoryField}>
                <option hidden>Category</option>
                <option value="Hobby">Hobby</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Cloth">Cloth</option>
                <option value="Electronic">Electronic</option>
                <option value="Health">Health</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Ex: Jalan Ikan Hiu 33"
                className="py-2"
                ref={descriptionField}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column ">
              <Form.Label>Product Image</Form.Label>

              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <Button className="upload-image-button">
                      <h2>
                        <FiPlus />
                      </h2>
                    </Button>
                  ) : (
                    <div>{thumbs}</div>
                  )}
                </div>
              </section>
            </Form.Group>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}

            <div className="d-flex gap-3">
              <Button
                type="submit"
                style={buttonStyleV2}
                className="w-50 py-2 text-black"
                onClick={(e) => onCreate(e, false)}
              >
                Preview
              </Button>
              <Button
                type="submit"
                style={buttonStyle}
                className="w-50 py-2"
                onClick={(e) => onCreate(e, true)}
              >
                Publish
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}

export function InfoProductFormV2(props) {
  const navigate = useNavigate();
  const nameField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCloseProgress = () => {
    setOpen(false);
  };

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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

  const formStyle = {
    borderRadius: "12px",
  };

  const onCreate = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const createPostPayload = new FormData();

      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("price", priceField.current.value);
      createPostPayload.append("category", categoryField.current.value);
      createPostPayload.append("description", descriptionField.current.value);
      createPostPayload.append("sold", isSold);
      createPostPayload.append("isPublish", isPublish);
      files.forEach((element) => {
        createPostPayload.append("picture", element);
      });

      setOpen(true);
      const createRequest = await axios.post(
        "https://be-final.herokuapp.com/products/create",
        createPostPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createResponse = createRequest.data;

      dispatch(addProduct(createResponse.message));

      if (createResponse.status) {
        if (isPublish) navigate("/daftarjual");
        else navigate("/daftarjual");
      }
    } catch (err) {
      const response = err.response.data;
      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container className="form-info-product">
        <Link
          to="/daftarjual"
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Product Detail</h5>

        <Form>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Product Name"
                className="py-2"
                ref={nameField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Rp 0,00"
                className="py-2"
                ref={priceField}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select style={formStyle} ref={categoryField}>
                <option hidden>Category</option>
                <option value="Hobby">Hobby</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Cloth">Cloth</option>
                <option value="Electronic">Electronic</option>
                <option value="Health">Health</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
                ref={descriptionField}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column ">
              <Form.Label>Product Image</Form.Label>

              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <Button className="upload-image-button">
                      <h2>
                        <FiPlus />
                      </h2>
                    </Button>
                  ) : (
                    <div>{thumbs}</div>
                  )}
                </div>
              </section>
            </Form.Group>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}

            <div className="d-flex gap-3">
              <Button
                type="submit"
                style={buttonStyleV2}
                className="w-50 py-2 text-black"
                onClick={(e) => onCreate(e, false)}
              >
                Preview
              </Button>
              <Button
                type="submit"
                style={buttonStyle}
                className="w-50 py-2"
                onClick={(e) => onCreate(e, true)}
              >
                Publish
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}

export function UpdateProductForm(props) {
  const navigate = useNavigate();
  const nameField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleCloseProgress = () => {
    setOpen(false);
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const buttonStyle = {
    borderRadius: "16px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };
  const cancelButtonStyle = {
    borderRadius: "16px",
    backgroundColor: "grey",
    border: "1px solid grey",
  };

  const formStyle = {
    borderRadius: "12px",
  };

  const onUpdate = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const createPostPayload = new FormData();

      createPostPayload.append("name", nameField.current.value);
      createPostPayload.append("price", priceField.current.value);
      createPostPayload.append("category", categoryField.current.value);
      createPostPayload.append("description", descriptionField.current.value);
      createPostPayload.append("sold", isSold);
      createPostPayload.append("isPublish", isPublish);
      files.forEach((element) => {
        createPostPayload.append("picture", element);
      });
      setOpen(true);
      const createRequest = await axios.put(
        `https://be-final.herokuapp.com/products/${id}`,
        createPostPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createResponse = createRequest.data;

      dispatch(addProduct(createResponse.message));

      if (createResponse.status) navigate(`/homeproduct/${data.id}`);
    } catch (err) {
      const response = err.response.data;
      setErrorResponse({
        isError: true,
        message: response.message,
      });
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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#7126B5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container className="form-info-product">
        <Link
          to={`/homeproduct/${data.id}`}
          className="text-black position-absolute "
          style={{ left: "25%" }}
        >
          <IoMdArrowBack style={{ fontSize: "20px" }} />
        </Link>
        <h5 className="text-center">Update Produk</h5>

        <Form>
          <div className="w-50 form-body">
            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Product Name"
                className="py-2"
                ref={nameField}
                defaultValue={data.name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                style={formStyle}
                placeholder="Rp 0,00"
                className="py-2"
                ref={priceField}
                defaultValue={data.price}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                style={formStyle}
                ref={categoryField}
                defaultValue={data.category}
              >
                <option hidden>Category</option>
                <option value="Hobby">Hobby</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Cloth">Cloth</option>
                <option value="Electronic">Electronic</option>
                <option value="Health">Health</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={formStyle}
                as="textarea"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                className="py-2"
                ref={descriptionField}
                defaultValue={data.description}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column ">
              <Form.Label>Product Image</Form.Label>

              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <Button className="upload-image-button">
                      <h2>
                        <FiPlus />
                      </h2>
                    </Button>
                  ) : (
                    <div>{thumbs}</div>
                  )}
                </div>
              </section>
            </Form.Group>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}

            <div className="d-flex gap-3 justify-content-center">
              <Button
                type="submit"
                style={buttonStyle}
                className="w-50 py-2"
                onClick={(e) => onUpdate(e, false)}
              >
                Save
              </Button>
              <Link className="w-50" to={`/homeproduct/${data.id}`}>
                <Button style={cancelButtonStyle} className="w-100 py-2">
                  Calcel
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}
