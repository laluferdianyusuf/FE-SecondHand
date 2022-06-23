import React from "react";
import { Card, Button } from "react-bootstrap";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import UserImage from "../images/Rectangle-33.png";

export function SidebarCategory() {
  return (
    <>
      <div className="sidebar-category">
        <div className="p-3 card-sidebar-category">
          <h6 className="fw-bold pt-2 px-2">Kategori</h6>
          <div className="card-sidebar-catergory_body px-2 py-2">
            <Button className="d-flex gap-2 align-items-center w-100 p-0 mb-2">
              <FiBox /> Produk <FiChevronRight className="ms-auto" />
            </Button>

            <Button className="d-flex gap-2 align-items-center w-100 p-0 mb-2">
              <FiHeart /> Diminati <FiChevronRight className="ms-auto" />
            </Button>

            <Button className="d-flex gap-2 align-items-center w-100 p-0">
              <FiDollarSign />
              Terjual
              <FiChevronRight className="ms-auto" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SidebarUser() {
  const buttonStyle = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "8px",
  };

  return (
    <>
      <div className="navigasi-user">
        <Card className="p-3">
          <div className="d-flex gap-3">
            <Card.Img src={UserImage} style={{ width: "5%" }} />
            <div>
              <Card.Text className="mb-0 fw-bold">Nama Penjual</Card.Text>
              <Card.Text>Kota</Card.Text>
            </div>
            <Button
              size="sm"
              className="ms-auto align-self-center text-black px-3 fw-400"
              style={buttonStyle}
            >
              Edit
            </Button>
          </div>
          <div></div>
        </Card>
      </div>
    </>
  );
}
