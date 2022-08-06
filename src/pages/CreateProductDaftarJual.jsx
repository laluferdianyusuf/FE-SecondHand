import React from "react";
import { InfoProductFormV2 } from "../components/Form";
import { BlankNavV2 } from "../components/Navbar";

export default function CreateProductDaftarJual() {
  return (
    <>
      <div className="mb-3">
        <BlankNavV2 />
      </div>

      <div>
        <InfoProductFormV2 />
      </div>
    </>
  );
}
