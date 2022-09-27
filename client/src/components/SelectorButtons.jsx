import React from 'react';
import { getDogs, getTemperaments, filterDogByStatus } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


import '../styles/SelectorButtons.css';

function SelectorButtons() {

  const dispatch = useDispatch();

  function handleFilterStatus(e){
    dispatch(filterDogByStatus(e.target.value));
  }

  return (
    <div className = "selectorContainer">
      <div className = "selectorContainerSec">
        
        <div className = "filter">
          <select onChange={e=>handleFilterStatus(e)}>
            <option value = 'id'>Todos</option>
            <option value = 'name'>Raza</option>
            <option value = 'weight'>Peso</option>
            <option value = 'height'>Altura</option>
            <option value = 'temperaments'>Temperamento</option>
            <option value = 'life_span'>Años de vida</option>
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
 