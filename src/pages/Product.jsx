import React from "react";
import { AllProducts } from "../data/AllProducts";

const Product = () => {
  return (
    <div>
      <section className="Product">
        <h1>Product Administration</h1>
      </section>
      <AllProducts />
    </div>
  );
};

export default Product;
