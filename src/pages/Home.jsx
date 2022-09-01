// Home.js

import React from "react";
import { AllContacts } from "../data/AllContacts";
import { AllProducts } from "../data/AllProducts";

const Home = () => {
  return (
    <div>
      <section className="Home">
        <h1>Sales Order Processing</h1>
      </section>
      <AllProducts />
      <h3> Contacts </h3>
      <AllContacts />
    </div>
  );
};

export default Home;
