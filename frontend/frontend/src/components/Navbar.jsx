import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `nav-link px-2 menu-color${isActive ? ' active' : ''}`

const Navbar = () => {
  return (
    <header className="header fixed-top border-bottom border-dark">
      <nav className="navbar navbar-expand-md h-100 px-4 px-md-5">
        <NavLink to="/" className="navbar-brand text-decoration-none" end>
          <span className="logo-text">De la Nana</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/faq" className={navLinkClass}>FAQs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
