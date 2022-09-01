import React from "react";
import { AllProducts } from "../data/AllProducts";
import { useState } from "react";
import { AddProduct } from "../data/AddProduct";

const Product = () => {
  let [toggleAddProduct, setToggleAddProduct] = useState(false);

  return (
    <div>
      <section className="Product">
        <h1>Product Administration</h1>
        <button
          onClick={() => {
            setToggleAddProduct(!toggleAddProduct);
          }}
        >
          Add Product
        </button>
      </section>
      <AllProducts />
      {toggleAddProduct && <AddProduct />}
    </div>
  );
};

export default Product;
