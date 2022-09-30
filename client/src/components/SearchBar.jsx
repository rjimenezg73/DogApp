import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions/actions.js";
import "../styles/SearchBar.css";


const SearchBar = ({ setMinPageNumber, setMaxPageNumber, setActualPage }) => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");

  const handleChange = (e) => setNameInput(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      alert("Please write the name of the dog you want to find.");  
    }
    else {
      dispatch(getByName(nameInput.trim()));
      setActualPage(1);
      setMinPageNumber(0)
      setMaxPageNumber(5)  
      setNameInput('')
    }
  };

  return (
    <form className="search-bar">
      <input
        value={nameInput}
        className="search-input"
        type="text"
        onChange={handleChange}
        placeholder="Search dog..."
      />
      <button
        className="search-btn"
        type="submit"
        aria-label="search"
        onClick={(e) => handleSearch(e)}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style={{ fill: "white" }}
        >
          {" "}
          <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;