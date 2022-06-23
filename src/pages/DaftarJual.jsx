import React from "react";
import { DaftarJualNavbar } from "../components/Navbar";
import { SidebarUser, SidebarCategory } from "../components/Sidebar";
import { Content } from "../components/Content";
import { Container, Row, Col } from "react-bootstrap";

export default function DaftarJual() {
  return (
    <>
      <div>
        <DaftarJualNavbar />
      </div>
      <Container className="mt-4 page-daftar-jual" style={{ width: "70%" }}>
        <h5 className="fw-bold mb-3">Daftar Jual Saya</h5>
        <Row>
          <Col md={12}>
            <div>
              <SidebarUser />
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <div>
              <SidebarCategory />
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Content />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
