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
    <ul className='navbar-links'>
      <li><Link to='/tictactoe'>Home</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar