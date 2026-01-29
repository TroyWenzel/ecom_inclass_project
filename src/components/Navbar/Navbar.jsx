import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <NavLink to='/' className="brand-container">
        <span className="brand-logo">🛒</span>
        <h1>Cartify</h1>
      </NavLink>
      <div className="navLinks">
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/products/search'>SEARCH</NavLink>
        <NavLink to='/favorites'>FAVORITES</NavLink>
        <NavLink to='/cart'>CART</NavLink>
      </div>
    </header>
  )
}

export default Navbar