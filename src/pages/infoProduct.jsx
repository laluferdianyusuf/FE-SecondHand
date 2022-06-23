import React from "react";
import { InfoProductForm } from "../components/Form";
import { BlankNavV2 } from "../components/Navbar";

export default function infoProduct() {
  return (
    <>
      <div className="mb-3">
        <BlankNavV2 />
      </div>

      <div>
        <InfoProductForm />
      </div>
    </>
  );
}
