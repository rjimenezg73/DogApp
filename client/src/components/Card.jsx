import React from "react";
import { Link } from "react-router-dom";
import '../styles/Card.css';

const Card = ({ id, name, image, weight, height, life_span, temperaments, key }) => {

  return (

    <Link to={"/dogs/" + id}>


      <div className="container">
        <div className="card-container">
          <div className="img-dog">
            <img className="img-dog" src={image} alt={name} />
          </div> 
          <div className="info-dog">
            <h3 className="title-dog">{name}</h3>
            <p className="weight-dog">{weight} kg</p>
            {Array.isArray(temperaments) 
              ? (
                <p 
                  className="temperaments-dog">{temperaments.map(t => Object.values(t)).join(', ')}
                </p>
              ) 
              : (
                <p className="temperaments-dog">{temperaments}</p>
              )
            }
          </div>
        </div>

      </div>
      
    </Link>



  );
};

export default Card;


