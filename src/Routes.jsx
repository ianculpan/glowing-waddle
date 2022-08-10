import React from "react";
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export function MainRoutes (){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}