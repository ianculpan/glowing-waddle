import React from "react";
// import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { UserMenu } from "./user";

export function MainMenu({ loginFlag, toggleLogin }) {
  return (
    <div className="nav-bar">
      <div className="nav-pages">
        <nav>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="product" activeclassname="active">
            Product
          </NavLink>
          <NavLink to="wip" activeclassname="active">
            Wip
          </NavLink>
          <NavLink to="about" activeclassname="active">
            About
          </NavLink>
          <NavLink to="contact" activeclassname="active">
            Contact
          </NavLink>
        </nav>
      </div>
      <div className="user-menu">
        <UserMenu loginFlag={loginFlag} toggleLogin={toggleLogin} />
      </div>
    </div>
  );
}
