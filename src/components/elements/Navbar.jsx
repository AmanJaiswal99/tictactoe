import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <nav className="navbar">
    <div className="navbar-logo">Logo</div>
    <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
      <li><Link to='/'>Home</Link></li>
    </ul>
    <div className={`navbar-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
  )
}

export default Navbar