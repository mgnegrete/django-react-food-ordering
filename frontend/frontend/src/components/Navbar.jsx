import Logo from '../assets/images/nanas_logo.jpg'

const Navbar = () => {
  return (
    <header className="header fixed-top border-bottom border-dark d-flex align-items-center justify-content-between px-4 px-md-5">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        <img src={Logo} alt="Casa Puchica" style={{ height: '44px', width: 'auto' }} />
      </a>
      <ul className="nav mb-0">
        <li><a href="#" className="nav-link px-2 menu-color">Home</a></li>
        <li><a href="#" className="nav-link px-2 menu-color">FAQs</a></li>
        <li><a href="#" className="nav-link px-2 menu-color">About</a></li>
      </ul>
    </header>
  )
}

export default Navbar
