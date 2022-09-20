import React from "react";
import { Link } from "react-router-dom";
import '../styles/Card.css';

const Card = ({ id, name, image, weight, temperaments }) => {
  return (
    <Link className="card" to={"/dogs/" + id}>
      <img className="dog-img" src={image} alt={name} />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-weight">{weight} kg</p>
        {Array.isArray(temperaments) ? (
          <p className="card-temperaments">{temperaments.map(t => Object.values(t)).join(', ')}</p>
        ) : (
          <p className="card-temperaments">{temperaments}</p>
        )}
      </div>
    </Link>
  );
};

export default Card;