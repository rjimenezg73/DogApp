
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "../styles/Nav.css";

const Nav = ({ setMinPageNumber, setMaxPageNumber, setActualPage }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="nav-title">
          <Link to="/home">Dog App</Link>
        </h1>
        <SearchBar setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
      </div>
    </nav>
  );
};

export default Nav;