import React from 'react';
import '../styles/SelectorButtons.css';

function SelectorButtons() {


  return (
    <div className = "selectorContainer">
      <div className = "selectorContainerSec">
        
        <div className = "filter">
          <select>
            <option value = 'all'>Todos</option>
            <option value = 'raza'>Raza</option>
            <option value = 'peso'>Peso</option>
            <option value = 'altura'>Altura</option>
            <option value = 'tempera'>Temperamento</option>
            <option value = 'anios'>Años de vida</option>
          </select>
        </div>
        
        <div className = "dogs">
          <select>
            <option value = 'all'>Todos</option>
            <option value = 'raza'>Raza</option>
            <option value = 'peso'>Peso</option>
            <option value = 'altura'>Altura</option>
            <option value = 'tempera'>Temperamento</option>
            <option value = 'anios'>Años de vida</option>
          </select>
        </div>

        <div className = "sort">
          <select>
            <option value= 'asc' >Ascendente</option>
            <option value = 'desc' >Descendente</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default SelectorButtons;
 