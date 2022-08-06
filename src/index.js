import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InfoAcc from "./pages/InfoAcc";
import InfoAccV2 from "./pages/InfoAccV2";
import UpdateProduct from "./pages/UpdateProduct";
import InfoProduct from "./pages/InfoProduct";
import CreateProductDaftarJual from "./pages/CreateProductDaftarJual";
import PageProduct from "./pages/PageProduct";
import DaftarJual from "./pages/DaftarJual";
import InfoOffer from "./pages/InfoOffer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");
render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateacc/:id" element={<InfoAcc />} />
        <Route path="/updateaccv2/:id" element={<InfoAccV2 />} />
        <Route path="/createproduct" element={<InfoProduct />} />
        <Route path="/createproductDJ" element={<CreateProductDaftarJual />} />
        <Route path="/update/product/:id" element={<UpdateProduct />} />
        <Route path="/homeproduct/:id" element={<PageProduct />} />
        <Route path="/daftarjual" element={<DaftarJual />} />
        <Route path="/offers/:id" element={<InfoOffer />} />
      </Routes>
    </Router>
  </Provider>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
