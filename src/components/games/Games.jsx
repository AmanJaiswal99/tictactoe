import React from 'react'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tictactoe from './Tictactoe';
import './games.css'
import Navbar from '../elements/Navbar';

function Games() {
  return (
    <div className='games'>
        <h2>Pick from the below Games</h2>
        <ol>
        <li><Link to="/tictac">Tic Tac Toe</Link></li>
        <li><Link to="/dino">Dino jump</Link></li>
        <li><Link to="/pingpong">Ping pong</Link></li>
        {/* Add more game links here */}
      </ol>
    </div>

  )
}

export default Games