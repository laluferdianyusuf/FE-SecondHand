import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Navbar, Offcanvas } from "react-bootstrap";
import "../style/component.css";
import { FiLogIn, FiBell, FiUser } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

export function BlankNav() {
  return (
    <>
      <div className="blank-nav">
        <Navbar expand="lg" className="py-3 ">
          <Container>
            <div className="box me-3"></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <h6 style={{ transform: "translate(400px)" }}>
                Lengkapi Info Akun
              </h6>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export function BlankNavV2() {
  return (
    <Navbar expand="lg" className="py-3 blank-navV2">
      <Container>
        <div className="box me-3"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function HomeNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const validateLogin = async () => {
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

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUser({});
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buttonStyle = {
    borderRadius: "12px",
    backgroundColor: "rgba(113, 38, 181, 1)",
    border: "1px solid rgba(113, 38, 181, 1)",
  };
  const buttonStyleV2 = {
    border: "1px solid rgba(0,0,0,0)",
    backgroundColor: "rgba(0,0,0,0)",
    width: "50px",
  };
  const searchStyle = {
    backgroundColor: "rgba(238, 238, 238, 1)",
    border: "1px solid rgba(238, 238, 238, 1)",
  };
  return (
    <Navbar expand="lg" className="py-3 home-nav">
      <Container>
        <div className="box me-3"></div>
        <div className="d-flex gap-3">
          <Navbar.Toggle aria-controls="offcanvas" onClick={handleShow} />
          <Form className="d-flex me-auto">
            <Form.Control
              type="search"
              placeholder="Cari di sini..."
              className="me-2"
              aria-label="Search"
              style={searchStyle}
            />
          </Form>
        </div>

        <Navbar.Offcanvas
          show={show}
          className="w-50"
          id="offcanvas"
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {isLoggedIn ? (
              <div className="ms-auto d-flex ">
                <Button style={buttonStyleV2}>
                  <BsListUl
                    style={{ fontSize: "20px" }}
                    className="align-self-center text-black"
                  />
                </Button>

                <Dropdown>
                  <Dropdown.Toggle
                    style={buttonStyleV2}
                    variant="success"
                    id="dropdown-basic"
                  >
                    <FiBell
                      style={{ fontSize: "20px" }}
                      className="align-self-center text-black"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    style={buttonStyleV2}
                    variant="success"
                    id="dropdown-basic"
                  >
                    <FiUser
                      style={{ fontSize: "20px" }}
                      className="align-self-center text-black"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ minWidth: "0" }}>
                    <Dropdown.Item>
                      <Button onClick={logout}>Logout</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <Link to="/login" className="text-decoration-none ms-auto">
                <Button className=" d-flex gap-2" style={buttonStyle}>
                  <FiLogIn className="align-self-center" />
                  Masuk
                </Button>
              </Link>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export function HomeNavIsLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const searchStyle = {
    backgroundColor: "rgba(238, 238, 238, 1)",
    border: "1px solid rgba(238, 238, 238, 1)",
  };

  const buttonStyle = {
    border: "1px solid rgba(0,0,0,0)",
    backgroundColor: "rgba(0,0,0,0)",
  };

  const buttonStyleV2 = {
    border: "1px solid rgba(0,0,0,0)",
    backgroundColor: "rgba(0,0,0,0)",
    width: "50px",
  };
  return (
    <Navbar expand="lg" className="py-3 home-nav navbar-is_login">
      <Container>
        <div className="box me-3"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex me-auto">
            <Form.Control
              type="search"
              placeholder="Cari di sini..."
              className="me-2"
              aria-label="Search"
              style={searchStyle}
            />
          </Form>

          {isLoggedIn ? (
            <Button className=" d-flex gap-2" style={buttonStyle}>
              <FiLogIn className="align-self-center" />
              Masuk
            </Button>
          ) : (
            <div className="ms-auto d-flex navbar-items">
              <Button style={buttonStyle}>
                <BsListUl
                  style={{ fontSize: "20px" }}
                  className="align-self-center text-black"
                />
              </Button>
              <Dropdown>
                <Dropdown.Toggle
                  style={buttonStyleV2}
                  variant="success"
                  id="dropdown-basic"
                >
                  <FiBell
                    style={{ fontSize: "20px" }}
                    className="align-self-center text-black"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button style={buttonStyle}>
                <FiUser
                  style={{ fontSize: "20px" }}
                  className="align-self-center text-black"
                />
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function DaftarJualNavbar() {
  const searchStyle = {
    backgroundColor: "rgba(238, 238, 238, 1)",
    border: "1px solid rgba(238, 238, 238, 1)",
  };

  const buttonStyle = {
    border: "1px solid rgba(0,0,0,0)",
    backgroundColor: "rgba(0,0,0,0)",
  };
  return (
    <Navbar expand="lg" className="py-3 home-nav daftar-jual">
      <Container>
        <div className="box me-3"></div>
        <h3 className="me-auto fw-bold">Daftar Jual Saya</h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex me-auto">
            <Form.Control
              type="search"
              placeholder="Cari di sini..."
              className="me-2"
              aria-label="Search"
              style={searchStyle}
            />
          </Form>

          <div className="ms-auto d-flex navbar-items">
            <Button style={buttonStyle}>
              <BsListUl
                style={{ fontSize: "20px" }}
                className="align-self-center text-black"
              />
            </Button>
            <Button style={buttonStyle}>
              <FiBell
                style={{ fontSize: "20px" }}
                className="align-self-center text-black"
              />
            </Button>
            <Button style={buttonStyle}>
              <FiUser
                style={{ fontSize: "20px" }}
                className="align-self-center text-black"
              />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
