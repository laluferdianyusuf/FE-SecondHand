import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InfoAcc from "./pages/InfoAcc";
import InfoProduct from "./pages/InfoProduct";
import PageProduct from "./pages/PageProduct";
import DaftarJual from "./pages/DaftarJual";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateacc/:id" element={<InfoAcc />} />
        <Route path="/createproduct" element={<InfoProduct />} />
        <Route path="/homeproduct" element={<PageProduct />} />
        <Route path="/daftarjual" element={<DaftarJual />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
