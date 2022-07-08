import React from "react";
import { HomeNav } from "../components/Navbar";
import { Category } from "../components/Category";

import { Carousel } from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Homepage() {
  return (
    <>
      {/* navbar */}
      <div>
        <HomeNav />
      </div>

      {/* carousel */}
      <div className="mt-4">
        <Carousel />
      </div>

      {/* category */}
      <div className="mb-4">
        <Category />
      </div>
    </>
  );
}
