import React from "react";
import { BlankNav } from "../components/Navbar";
import { UpdateProductForm } from "../components/Form";

export default function UpdateProduct() {
  return (
    <>
      <div className="mb-3">
        <BlankNav />
      </div>
      <div>
        <UpdateProductForm />
      </div>
    </>
  );
}
