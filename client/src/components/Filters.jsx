import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament, filterCreated } from "../actions/actions.js";
import '../styles/Filters.css'

function Filters({ setMinPageNumber, setMaxPageNumber, setActualPage }) {
  const temperamentsState = useSelector(state => state.temperaments)

  const dispatch = useDispatch();
  
  const handleFilterCreated = (e) =>{
    setActualPage(1)
    setMinPageNumber(0)
    setMaxPageNumber(5)
    dispatch(filterCreated(e.target.value))
  }
  
  const handleFilterTemperaments = (e) =>{
    setActualPage(1)
    setMinPageNumber(0)
    setMaxPageNumber(5)
    dispatch(filterByTemperament(e.target.value))
  }

  return (
    <div className="filter-container">
    <span className="filter-title">Filter by: </span>
    <select defaultValue='DEFAULT' onChange={(e) => handleFilterTemperaments(e)}>
      <option value="DEFAULT" disabled>Temperament</option>
      <option key={0} value="all">All</option>
      {temperamentsState.length
        ? temperamentsState.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))
        : null}
    </select>

    <select defaultValue='DEFAULT' onChange={(e) => handleFilterCreated(e)}>
      <option value="DEFAULT" disabled>Creation</option>
      <option value="all">All dogs</option>
      <option value="created">Created</option>
      <option value="api">API</option>
    </select>
  </div>
);
}

export default Filters;