import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, editDog, getTemperaments } from "../actions/actions.js";
import svgArr from '../assets/svg-arrow.svg';
import '../styles/Detail.css';
import { useState } from "react";


// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$")

// cb
const validateText = (input) => {
  const err = {};

  if (isBlankSpace.test(input.name)) err.name = "Shouldn't be a blank space"

  if (input.height_min && input.height_min < 1) err.height_min = "Should be taller than 1cm";
  else if (input.height_min && isNaN(input.height_min)) err.height_min = "Should be a number";
  else if (input.name.length > 255) err.name = "Maximum number of characters: 255"

  if (input.height_max > 500) err.height_max = "Should be smaller than 500cm";
  else if (input.height_max && isNaN(input.height_max)) err.height_max = "Should be a number";

  if (input.height_min && input.height_max && parseInt(input.height_min) >= parseInt(input.height_max)) err.height_max = 'Max height should be bigger than min'

  if (input.height_min && !input.height_max) err.height_min = 'Both heights should be filled'
  if (!input.height_min && input.height_max) err.height_max = 'Both heights should be filled'

  if (input.weight_min && input.weight_min < 1) err.weight_min = "Should be heavier than 1kg";
  else if (input.weight_min && isNaN(input.weight_min)) err.weight_min = "Should be a number";
  
  if (input.weight_max > 500) err.weight_max = "Should be less heavy than 500kg";
  else if (input.weight_max && isNaN(input.weight_max)) err.weight_max = "Should be a number";
  
  if (input.weight_min && input.weight_max && parseInt(input.weight_min) >= parseInt(input.weight_max)) err.weight_max = 'Max weight should be bigger than min'

  if (input.weight_min && !input.weight_max) err.weight_min = 'Both weights should be filled'
  if (!input.weight_min && input.weight_max) err.weight_max = 'Both weights should be filled'

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
const EditCreatedDog = () => {
  const {id} = useParams()
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
    dispatch(getById(id))
  }, [dispatch, id])
  
  const handleEditDog = e => {
    e.preventDefault()
    // si no hay ningún cambio no envía el form (espero q la solcito del futuro vuelva a ver esto y sepa mejorarlo)
    if (!input.name && !input.height_min && !input.height_max && !input.weight_min && !input.weight_max && !input.image && !input.life_span_min && !input.life_span_max && !tempsDB.length) {
      alert("There are no changes. If you want to edit the dog, please complete the form.");  
    }
    else if(!Object.values(errors).length) {
      const editDataDog = {};
      if(input.name) editDataDog.name = input.name.trim();
      if(input.height_min && input.height_max) editDataDog.height = `${input.height_min} - ${input.height_max}`
      if(input.weight_min && input.weight_max) editDataDog.weight = `${input.weight_min} - ${input.weight_max}`
      if(input.life_span_min && input.life_span_max) editDataDog.life_span = `${input.life_span_min} - ${input.life_span_max} years`;
      if(input.image) editDataDog.image = input.image.trim();
      if(tempsDB.length) editDataDog.temperaments = tempsDB
      // console.log('editDataDog',editDataDog);
      dispatch(editDog(editDataDog, id));
      alert("The dog was successfully edited!");

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

  const handleGoBack = () => navigate(-1)

  return (
    <div className="form-container">
      <div className="form-body">
        <button onClick={handleGoBack} className="back-btn">
          <img src={svgArr} alt='Go back' aria-label="Go back" />
        </button>

        <h2 className="form-title">Edit your breed 🐕</h2>

        <form className="form-creation" onSubmit={(e) => handleEditDog(e)}>
          <label className="form-label-title">Name</label>
          <input name="name" value={input.name} placeholder='Breed name' onChange={handleChange} />
          {errors.name && (<p className="form-error">{errors.name}</p>)}
          
          <label className="form-label-title">Height</label>
          <div className="form-doble-input-container">
            <input className="form-doble-input" name="height_min" value={input.height_min} placeholder='Min cm' onChange={handleChange} type='number'/>
            <input className="form-doble-input" name="height_max" value={input.height_max} placeholder='Max cm' onChange={handleChange} type='number'/>
          </div>
          <div className="form-doble-error-container">
            {errors.height_min && (<p className="form-error form-doble-error">{errors.height_min}</p>)}
            {errors.height_max && (<p className="form-error form-doble-error">{errors.height_max}</p>)}
          </div>

          <label className="form-label-title">Weight</label>
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
          <button className="form-submit-btn" type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
};


export default EditCreatedDog