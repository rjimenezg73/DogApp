import React, { Fragment, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments } from "../actions/actions";
import Card from "./Card.jsx";
import '../styles/Home.css';
import NavBar from "./NavBar";

const Home = () => {

  const dispatch = useDispatch();


  const allDogs = useSelector((state) => state.dogs); // Es lo mismo que hacer maps state props


  useEffect(()=>{
    dispatch(getDogs())
    dispatch(getTemperaments())
}, [])
 
  
  function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
  };

  return(
    <div>
      <NavBar />
      <h1>Home App</h1>
      <button onClick={e => {handleClick(e)}}>
        Volver a cargar todos los Dogs
      </button> 
      <div>
        <select>
          <option value= 'asc' >Ascendente</option>
          <option value = 'desc' >Descendente</option>
        </select>
        <select>
          <option value = 'all'>Todos</option>
          <option value = 'raza'>Raza</option>
          <option value = 'peso'>Peso</option>
          <option value = 'altura'>Altura</option>
          <option value = 'tempera'>Temperamento</option>
          <option value = 'anios'>Años de vida</option>
        </select>
      </div>

      {
        allDogs?.map((element) => {
          return(
            <Fragment>
              <Link to = {"/home" + element.id}>
                <Card id = {element.id} name = {element.name} image = {element.image} weight =  {element.weight} height = {element.height} life_span = {element.life_span} temperaments = {element.temperaments} key={element.id} />
              </Link>
            </Fragment>
          );
        })
      }

    </div>
  );
};

export default Home;
