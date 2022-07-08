import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "../style/component.css";
import { styled } from "@mui/material/styles";

export function Offer() {
  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  return (
    <>
      <Container className="offers-page mt-5">
        <Root>
          <Link to="/daftarjual" className="text-black position-absolute">
            <IoMdArrowBack style={{ fontSize: "20px" }} />
          </Link>
        </Root>

        <div className="product-offering">
          <div className="d-flex gap-3 card-buyer align-items-center p-3 mb-4">
            <div className="buyer">
              <img src="/images/Rectangle-33.png" alt="" />
            </div>
            <div>
              <h6>Nama Pembeli</h6>
              <p className="m-0">Kota</p>
            </div>
          </div>
          <div className="items-offering">
            <h6 className="mb-4">Daftar Produkmu Yang Ditawar</h6>

            <div className="d-flex gap-3 first-div">
              <img src="/images/Rectangle-33-jam.png" alt="" />
              <div>
                <div
                  className="d-flex"
                  style={{ fontSize: "10px", color: "rgba(138, 138, 138, 1)" }}
                >
                  <span>Penawaran produk</span>
                  <span className="position-absolute" style={{ right: "25%" }}>
                    20 Apr, 14.04
                  </span>
                </div>
                <h6>Jam Tangan Casio</h6>
                <h6>Rp. 250.000</h6>
                <h6>Ditawar Rp. 200.000</h6>
              </div>
            </div>
            <div className="py-3 d-flex">
              <div className="ms-auto button-offers">
                <Button className="me-3 py-1" style={{ width: "158px" }}>
                  Tolak
                </Button>
                <Button className="py-1" style={{ width: "158px" }}>
                  Terima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
