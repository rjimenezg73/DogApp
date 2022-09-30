import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearDetail, deleteDog } from "../actions/actions.js";
import svgArr from '../assets/svg-arrow.svg';

import '../styles/Detail.css';


const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const details = useSelector(state => state.details)
  
  useEffect(() => {
    dispatch(getById(id))
    dispatch(clearDetail())
  }, [dispatch, id])

  const handleDeleteDog = () => {
    window.confirm('Are you sure you want to delete this dog?')
    .then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDog(id));
        alert('The dog was successfully deleted from existence.')
        navigate("/home");
      } else if (result.isDenied) {
        alert('The dog is safe!')
      }
    })
  }
  
  const handleEditDog = () => navigate(`/dogs/${id}/edit`);

  const handleGoBack = () => navigate(-1)
  
  return (
    <div className="detail">
      <div className="detail-container">
        <button onClick={handleGoBack} className="back-btn">
          <img src={svgArr} alt='Go back'/>
        </button>
      {
        Object.keys(details).length && typeof details !== 'string' ? (
          <div className="detail-body">
            <img className="detail-img" src={details.image} alt={details.name + ' img'} /> 
            <div className="detail-description">
              <h1 className="detail-title">{details.name}</h1>
              <h3 className="detail-aboutme">About me</h3>
              <p><span className="detail-category">Height: </span>{details.height} cm</p>
              <p><span className="detail-category">Weight: </span>{details.weight} kg</p>
              {
                details.life_span && details.life_span[0] !== ' '
                ? <p><span className="detail-category">Life span: </span>{details.life_span}</p>
                : null
              }
              {/* dogs created in db */}
              {
                Array.isArray(details.temperaments) && details.temperaments.length
                ? <p>My temperament is: {details.temperaments.map(t => Object.values(t)).join(', ')}.</p>
                : null
              }
              {/* dogs api */}
              {
                typeof details.temperaments === 'string' && details.temperaments.length
                ? <p>{details.temperaments.length ? `My temperament is: ${details.temperaments}.` : null}</p>
                : null
              }
              <div className="detail-delete-edit-btn-container">
                {details.createdInDB && <button className="detail-delete-edit-btn" onClick={handleEditDog}>Edit</button>}
                {details.createdInDB && <button className="detail-delete-edit-btn detail-delete-btn" onClick={handleDeleteDog}>Delete</button>}
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(details) 
          ? <h3>Loading...</h3> 
          : <div className="detail-body">
              <h1 className="detail-dog-not-found-title">Dog not found...</h1>
            </div>
        )
      }
      </div>
    </div>
  );
};

export default Detail;