import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Wip from "./pages/Wip";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/Product";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/wip" element={<Wip />} />

      {/* <Route path="/add-product" element={<AddProduct />} /> */}
    </Routes>
  );
}
