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
      <li><a href='/tictactoe'>Home</a></li>
    </ul>
  </nav>
  )
}

export default Navbar