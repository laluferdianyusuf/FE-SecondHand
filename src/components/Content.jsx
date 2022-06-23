import React from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import "../style/component.css";
import ImageUser from "../images/Rectangle-33.png";
import firstImage from "../images/Rectangle-23.png";

export function Content() {
  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "91%",
    margin: "8px",
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
              <FiPlus
                style={{ fontSize: "24px", divor: "rgba(138, 138, 138, 1)" }}
              />{" "}
              <p>Tambah Produk</p>
              <Form.Control type="file" />
            </Button>
          </Form.Group>
        </div>
        <div className="px-2 w-100">
          <Card>
            <Card.Img variant="top" src={firstImage} style={image} />
            <Card.Body className="p-2">
              <Card.Title className="mb-0" style={title}>
                Jam Tangan Casio
              </Card.Title>
              <p className="mb-0" style={accesoris}>
                Aksesoris
              </p>
              <Card.Text className="mb-1">Rp 250.000</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="px-2">
          <Card>
            <Card.Img variant="top" src={firstImage} style={image} />
            <Card.Body className="p-2">
              <Card.Title className="mb-0" style={title}>
                Jam Tangan Casio
              </Card.Title>
              <p className="mb-0" style={accesoris}>
                Aksesoris
              </p>
              <Card.Text className="mb-1">Rp 250.000</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="px-2">
          <Card>
            <Card.Img variant="top" src={firstImage} style={image} />
            <Card.Body className="p-2">
              <Card.Title className="mb-0" style={title}>
                Jam Tangan Casio
              </Card.Title>
              <p className="mb-0" style={accesoris}>
                Aksesoris
              </p>
              <Card.Text className="mb-1">Rp 250.000</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export function UserProfile() {
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
            <Card.Title>Jam Tangan Casio</Card.Title>
            <Card.Text>Aksesoris</Card.Text>
            <Card.Title>Rp 250.000</Card.Title>
            <div className=" buttons-user">
              <div className="d-flex flex-column gap-3 mt-3">
                <Button className="w-100" style={buttonStyle}>
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
          <Card.Img src={ImageUser} style={{ width: "20%" }} />
          <div>
            <Card.Title>Nama Penjual</Card.Title>
            <Card.Text>kota</Card.Text>
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
