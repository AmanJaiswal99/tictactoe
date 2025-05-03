import React from 'react'
import Games from '../games/Games'
import About from './About'
import '../../styles/homepage.css'
import home from '../../shared/images/home.jpg'

function Homepage() {
  return (
    <div className='homepage'>
        <h1>Aman Jaiswal</h1>
        <img className="home-img" src={home} alt="Aman Jaiswal" />
        <ul className='homepage-list'> 
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <a href='/games'>Games</a>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <a href='/blogs'>Blogs</a>
          </li>
        </ul>
    </div>
  )
}

export default Homepage