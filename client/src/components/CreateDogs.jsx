import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createDogs, getTemperaments } from "../actions/actions";
import { useNavigate } from "react-router-dom";
import svgArr from '../assets/svg-arrow.svg'
import '../styles/CreatedDog.css'


// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$")

// cb
const validateText = (input) => {
  const err = {};

  if (!input.name) err.name = "Write the name";
  else if (isBlankSpace.test(input.name)) err.name = "Shouldn't be a blank space"
  else if (input.name.length > 255) err.name = "Maximum number of characters: 255"

  if (!input.height_min) err.height_min = 'Write the min height'
  else if (input.height_min < 1) err.height_min = "Should be taller than 1cm";
  else if (isNaN(input.height_min)) err.height_min = "Should be a number";

  if (!input.height_max) err.height_max = 'Write the max height'
  else if (input.height_max > 500) err.height_max = "Should be smaller than 500cm";
  else if (isNaN(input.height_max)) err.height_max = "Should be a number";

  if (input.height_min && input.height_max && parseInt(input.height_min) >= parseInt(input.height_max)) err.height_max = 'Max height should be bigger than min'

  if (!input.weight_min) err.weight_min = "Write the min weight";
  else if (input.weight_min < 1) err.weight_min = "Should be heavier than 1kg";
  else if (isNaN(input.weight_min)) err.weight_min = "Should be a number";
  
  if (!input.weight_max) err.weight_max = "Write the max weight";
  else if (input.weight_max > 500) err.weight_max = "Should be less heavy than 500kg";
  else if (isNaN(input.weight_max)) err.weight_max = "Should be a number";
  
  if (input.weight_min && input.weight_max && parseInt(input.weight_min) >= parseInt(input.weight_max)) err.weight_max = 'Max weight should be bigger than min'

  // optionals
  if (input.image && !imgRegexp.test(input.image.trim())) err.image = 'Should be a valid URL'

  if (input.life_span_min && input.life_span_min < 1) err.life_span_min = "Min life span should be bigger than 1 year";
  else if (input.life_span_min && isNaN(input.life_span_min)) err.life_span_min = "Should be a number";

  if (input.life_span_max && input.life_span_max > 500) err.life_span_max = "Max life span should be smaller than 500 years";
  else if (input.life_span_max && isNaN(input.life_span_max)) err.life_span_max = "Should be a number";

  if (input.life_span_min && !input.life_span_max) err.life_span_min = 'Both life spans should be filled'
  if (!input.life_span_min && input.life_span_max) err.life_span_max = 'Both life spans should be filled'
  
  if (input.life_span_min && input.life_span_max && parseInt(input.life_span_min) >= parseInt(input.life_span_max)) err.life_span_max = 'Max life span should be bigger than min'

  return err
};


// component
const CreatedDog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const temps = useSelector(state => state.temperaments)
  const [tempsDB, setTempsDB] = useState([])
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    image: '',
    life_span_min: '',
    life_span_max: '',
    temperaments: []
  })

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])
  
  const handleSubmit = e => {
    e.preventDefault()
    if (!input.name && !input.weight_min && !input.weight_max && !input.height_min && !input.height_max && !Object.keys(errors).length) {
      alert("Please complete the form");  
    }
    else if(!errors.name && !errors.weight_min && !errors.weight_max && !errors.height_min && !errors.height_max && !errors.image && !errors.life_span_min && !errors.life_span_max) {
      const newDog = {
        ...input,
        name: input.name.trim(),
        image: input.image.trim(),
        temperaments: tempsDB
      };
      // console.log(newDog);
      dispatch(createDogs(newDog));
      alert("Your dog is ready!");

      setInput({
        name: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        image: "",
        life_span_min: "",
        life_span_max: "",
        temperaments: [],
      });
      setTempsDB([])
      navigate('/home')
    } else {
      alert("Please complete the form with the correct data.");  
    }
  }

  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
    setErrors(validateText({...input, [e.target.name]: e.target.value}))
  }
  
  const handleSelect = (e) => {
    if(!tempsDB.includes(e.target.value)) setTempsDB([...tempsDB, e.target.value])
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setTempsDB(tempsDB.filter((temp) => temp !== e.target.value))
  }

  const handleGoBack = () => navigate('/home')

  return (
    <div className="form-container">
      <div className="form-body">
        <button onClick={handleGoBack} className="back-btn">
          <img src={svgArr} alt='Go back' aria-label="Go back" />
        </button>

        <h2 className="form-title">Complete the form and create your original breed! 🐕</h2>
        <h5 className="form-subtitle">Fields with <span className="obligatory">*</span> are required.</h5>

        <form className="form-creation" onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label-title">Name <span className="obligatory">*</span></label>
          <input name="name" value={input.name} placeholder='Breed name' onChange={handleChange} />
          {errors.name && (<p className="form-error">{errors.name}</p>)}
          
          <label className="form-label-title">Height <span className="obligatory">*</span></label>
          <div className="form-doble-input-container">
            <input className="form-doble-input" name="height_min" value={input.height_min} placeholder='Min cm' onChange={handleChange} type='number'/>
            <input className="form-doble-input" name="height_max" value={input.height_max} placeholder='Max cm' onChange={handleChange} type='number'/>
          </div>
          <div className="form-doble-error-container">
            {errors.height_min && (<p className="form-error form-doble-error">{errors.height_min}</p>)}
            {errors.height_max && (<p className="form-error form-doble-error">{errors.height_max}</p>)}
          </div>

          <label className="form-label-title">Weight <span className="obligatory">*</span></label>
          <div className="form-doble-input-container">
            <input className="form-doble-input" name="weight_min" value={input.weight_min} placeholder='Min kg' onChange={handleChange} type='number' />
            <input className="form-doble-input" name="weight_max" value={input.weight_max} placeholder='Max kg' onChange={handleChange} type='number' />
          </div>
          <div className="form-doble-error-container">
            {errors.weight_min && (<p className="form-error form-doble-error">{errors.weight_min}</p>)}
            {errors.weight_max && (<p className="form-error form-doble-error">{errors.weight_max}</p>)}
          </div>

          <label className="form-label-title">Image</label>
          <input name="image" value={input.image} placeholder='Image URL' onChange={handleChange} />
          {errors.image && (<p className="form-error">{errors.image}</p>)}
          <label className="form-label-title">Life span</label>
          <div className="form-doble-input-container">
            <input className="form-doble-input" name="life_span_min" value={input.life_span_min} placeholder='Min year' onChange={handleChange} type='number' />
            <input className="form-doble-input" name="life_span_max" value={input.life_span_max} placeholder='Max year' onChange={handleChange} type='number' />
          </div>
          <div className="form-doble-error-container">
            {errors.life_span_min && (<p className="form-error form-doble-error">{errors.life_span_min}</p>)}
            {errors.life_span_max && (<p className="form-error form-doble-error">{errors.life_span_max}</p>)}
          </div>
          <label className="form-label-title">Temperaments</label>
          <select defaultValue='DEFAULT' name="form-temperaments" onChange={handleSelect}>
            <option value="DEFAULT" disabled>Select temperaments...</option>
            {temps.map((temps) => (
              <option className="form-option" key={temps.name} value={temps.name}>{temps.name}</option>
            ))}
          </select>
          <ul className="form-temperaments-selected">
            {tempsDB.map((temp, id)=> (
              <li className="form-temperaments-selected-item" key={id}>
                {temp}
                <button className="form-temperaments-delete-btn" value={temp} onClick={e => handleDelete(e)}>
                  x
                </button>
              </li>
            ))}
          </ul>
          <button className="form-submit-btn" type="submit">Create dog</button>
        </form>
      </div>
    </div>
  );
};

export default CreatedDog;