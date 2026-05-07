import React from 'react'
import HeroImage from '../assets/images/hero1.jpg'
import Certificate from '../assets/images/certi.png'

export const Hero = () => {
  return (
    <div className="hero-container d-flex align-items-center justify-content-center">
      <div className="row w-100 align-items-center justify-content-between">
        <div className="col-lg-6 text-center text-lg-start hero-text">
          <h1 className="display-4 fw-bold lh-1 mb-3">
            Casa Puchica
          </h1>
          <p className="lead mb-4">
            Bringing you the best and freshest pupusas in the 805.
            <br />Straight from San Miguel, El Salvador
          </p>
          <div className="d-flex align-items-center my-3 justify-content-center justify-content-lg-start">
            <img src={Certificate} alt="Certificate" className="me-2" width="40" height="40" />
            <span className="fw-bold">Certified Gluten-Free</span>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start justify-content-center">
            <button type="button" className="btn btn-custom-primary btn-lg px-4 me-md-2">Order Now</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">About Us</button>
          </div>
        </div>
        <div className="col-lg-6 hero-image text-center">
          <img 
            src={HeroImage} 
            className="img-fluid" 
            alt="Pupusas" 
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}