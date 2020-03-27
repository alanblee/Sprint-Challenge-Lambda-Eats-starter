import React from "react";
import {Link} from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <h1 className="logo">Lambda Eats</h1>
      <nav>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/pizza">Form</Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
