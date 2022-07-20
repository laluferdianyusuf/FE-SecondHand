import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Form } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import "../style/component.css";
import axios from "axios";

export function Content({ productSeller }) {
  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "55%",
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
                to="/createproduct"
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
                <Link to={`/homeproduct/${item.id}`}>
                  <Card style={{ gap: "37px" }}>
                    <Card.Img
                      className="align-self-center"
                      variant="top"
                      src={`${item.picture[0]}`}
                      style={image}
                    />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        {item.title}
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        {item.category}
                      </p>
                      <Card.Text className="mb-1">Rp. {item.price}</Card.Text>
                      <span class="label other">
                        {item.isPublish ? "Publish" : "Unpublish"}
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

export function UserProfile() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
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
        `http://localhost:2000/products/${id}`,
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

  useEffect(() => {
    fetchData();
    getProduct();
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
  return (
    <>
      <div className="user-profile">
        <Card className="pb-2">
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.category}</Card.Text>
            <Card.Title>Rp. {data.price}</Card.Title>
            <div className=" buttons-user">
              <div className="d-flex flex-column gap-3 mt-3">
                <Button
                  className="w-100"
                  onClick={(e) => onUpdateById(e, true)}
                  style={buttonStyle}
                >
                  Terbitkan
                </Button>
                <Button className="w-100" style={buttonStyleV2}>
                  Edit
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className="d-flex flex-row gap-3 px-3 py-3 mt-3">
          <Card.Img src={`${user.picture}`} style={{ width: "20%" }} />
          <div>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.city}</Card.Text>
          </div>
        </Card>
      </div>
    </>
  );
}

export function ProductDesc() {
  return (
    <>
      <div className="mb-3 mt-4">
        <Card className="card-description">
          <Container className="py-3">
            <h4 className="fw-bold">Deskripsi</h4>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
              reiciendis quam ipsa distinctio, non, molestiae libero iste
              aliquam, magnam obcaecati ratione deserunt facilis harum debitis?
              Iure quidem maxime quo sequi harum distinctio animi unde,
              doloribus aliquid autem dolores neque voluptas cupiditate est
              omnis nihil cum, debitis consequatur totam voluptatibus maiores.
            </p>

            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
              reiciendis quam ipsa distinctio, non, molestiae libero iste
              aliquam, magnam obcaecati ratione deserunt facilis harum debitis?
              Iure quidem maxime quo sequi harum distinctio animi unde,
              doloribus aliquid autem dolores neque voluptas cupiditate est
              omnis nihil cum, debitis consequatur totam voluptatibus maiores.
            </p>
          </Container>
        </Card>
      </div>
    </>
  );
}

export function Profile() {}
