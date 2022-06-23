import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../style/component.css";
import { Card } from "react-bootstrap";
import Image from "../images/img-banner.png";
import ImageProduct from "../images/Rectangle-134.png";

export function Carousel() {
  return (
    <div className="slider">
      <OwlCarousel
        className="owl-theme slider-items"
        items={2}
        autoplay={true}
        autoplayTimeout={5000}
        autoplayHoverPause={true}
        center
        loop
        margin={10}
        nav
      >
        <div className="slider-card ">
          <Card className="card-content">
            <Card.Img src={Image} />
          </Card>
        </div>
        <div className="slider-card second-slide">
          <Card className="card-content">
            <Card.Img src={Image} />
          </Card>
        </div>
        <div className="slider-card third-slide">
          <Card className="card-content">
            <Card.Img src={Image} />
          </Card>
        </div>
      </OwlCarousel>
    </div>
  );
}

export function CarouselProduct() {
  return (
    <>
      <div className="slider-product">
        <OwlCarousel className="owl-theme" items={1} margin={10} nav>
          <div class="item">
            <img src={ImageProduct} className="w-100" alt="" />
          </div>
          <div class="item">
            <img src={ImageProduct} className="w-100" alt="" />
          </div>
          <div class="item">
            <img src={ImageProduct} className="w-100" alt="" />
          </div>
          <div class="item">
            <img src={ImageProduct} className="w-100" alt="" />
          </div>
          <div class="item">
            <img src={ImageProduct} className="w-100" alt="" />
          </div>
        </OwlCarousel>
      </div>
    </>
  );
}
