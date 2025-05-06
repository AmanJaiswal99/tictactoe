import React from 'react'
import Games from '../games/Games'
import About from './About'
import '../../styles/homepage.css'
import home from '../../shared/images/home.jpg'
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className='homepage'>
        <h1>Aman Jaiswal</h1>
        <img className="home-img" src={home} alt="Aman Jaiswal" />
        <ul className='homepage-list'> 
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <Link to='/games'>Games</Link>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <Link to='/blogs'>Blogs</Link>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
    </div>
  )
}

export default Homepage