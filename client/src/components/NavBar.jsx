import React from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/NavBar.css';

function NavBar({onSearch}) {
  return (
    <div className = "navContainer">
      <div className = "navContainerSec">
        
        <div className = "dogapp">
          <h2>DogApp</h2>
        </div>
        
        <div className = "navTitulo">
          <span> DogApp - RGJG</span> 
        </div>

        <div className = "navSearch">
          <SearchBar
            onSearch={onSearch} 
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
 