import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css'; // Import the custom CSS file
import Logo from '../assets/images/nanas_logo.jpg'

const Navbar = () => {
    return (
      <div className="container-fluid px-5 header sticky-top">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between mb-4 border-bottom fixed-top border-dark">
            <a 
                href="/" 
                className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
            >
                <img src={Logo} alt="Casa Puchica" className="w-25 h-25"/>
            </a>
  
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-2 menu-color">Home</a></li>
            <li><a href="#" className="nav-link px-2 menu-color">FAQs</a></li>
            <li><a href="#" className="nav-link px-2 menu-color">About</a></li>
          </ul>
  
          <div className="col-md-3 text-end">
            <i className='bi bi-search fs-3 me-4'></i>
            <i className='bi bi-cart fs-3'>0</i>  
          </div>
        </header>
      </div>
    );
  };
export default Navbar