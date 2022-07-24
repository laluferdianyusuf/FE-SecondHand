import React from "react";
import { InfoPenawarNavbar } from "../components/Navbar";
import { Offer } from "../components/Offer";

export default function infoOffer() {
  return (
    <>
      <div>
        <InfoPenawarNavbar />
      </div>
      <div>
        <Offer />
      </div>
    </>
  );
}
