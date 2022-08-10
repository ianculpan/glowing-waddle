// Home.js

import React from "react";
import { AllSkiDays } from "../data/AllSkiDays";

const Home = () => {
  return (
    <div>
      <section className="Home">
        <h1>Sales Order Processing</h1>
      </section>
      <AllSkiDays />
    </div>
  );
};

export default Home;
