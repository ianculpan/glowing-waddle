// Home.js

import React from "react";
import { AllProducts } from "../data/AllProducts";

const Home = () => {
  return (
    <div>
      <section className="Home">
        <h1>Sales Order Processing</h1>
      </section>
      <AllProducts />
    </div>
  );
};

export default Home;
