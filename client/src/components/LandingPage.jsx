import React from "react";
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'
import hueso from '../assets/Hueso.png'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Link to='/home'>
        <button className='from-landing-to-home-btn'>
          Start
          <img className="hueso" src={hueso} alt='' />
        </button>
      </Link>
    </div>
  )
};

export default LandingPage;