import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Error404.css'

const Error404 = () => {
  const navigate = useNavigate()
  const handleGoHome = () => navigate('/home')

  return(
    <div className="error404-container">
      <div className="error404-body">
        <h1>Error 404: page not found</h1>
        <button className="error404-btn" onClick={handleGoHome}>Go home</button>
      </div>
    </div>
  )
}

export default Error404