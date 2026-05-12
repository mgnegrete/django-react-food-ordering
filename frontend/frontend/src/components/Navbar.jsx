import { Link } from 'react-router-dom'
import Logo from '../assets/images/nanas_logo.jpg'

const Navbar = () => {
  return (
    <header className="header fixed-top border-bottom border-dark d-flex align-items-center justify-content-between px-4 px-md-5">
      <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
        <img src={Logo} alt="Casa Puchica" style={{ height: '44px', width: 'auto' }} />
      </Link>
      <ul className="nav mb-0">
        <li><Link to="/" className="nav-link px-2 menu-color">Home</Link></li>
        <li><Link to="/faq" className="nav-link px-2 menu-color">FAQs</Link></li>
        <li><Link to="/about" className="nav-link px-2 menu-color">About</Link></li>
      </ul>
    </header>
  )
}

export default Navbar
