import React, { Fragment, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments } from "../actions/actions";
import Card from "./Card.jsx";
import '../styles/Home.css';
import NavBar from "./NavBar";
import SelectorButtons from "./SelectorButtons";

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
      <SelectorButtons />

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
