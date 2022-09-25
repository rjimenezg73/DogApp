import React from "react";
import styles from '../styles/SearchBar.css';


export default function SearchBar({onSearch}) {
  // Estado Para guardar lo que se escribe
  
  
  return (
    <div className={styles.searchBar}>
      <form onSubmit={(e) => {
          e.preventDefault();
          onSearch('Caracas');
        }}>
        <input 
          type='text' placeholder='Search Dog...'
        />
        <input 
          type="submit"
          value="Buscar"
        />
      </form>
    </div>
  );
}
