import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tictactoe from './components/games/Tictactoe';
import Homepage from './components/pages/Homepage';
import Navbar from './components/elements/Navbar';
import Dino from './components/games/Dino';
import About from './components/pages/About';
import Games from './components/games/Games';
import Blogs from './components/blogs/Blogs';
function App() {

  return (
    <Router>
    <div className="App">
    <Navbar/>
    <Routes>
        <Route path="/tictac" element={<Tictactoe/>} />
        <Route path="/dino" element={<Dino/>} />
        <Route path="/tictactoe" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/games" element={<Games/>} />
        <Route path="/blogs" element={<Blogs/>} />
    </Routes>
    </div>
    </Router>

  );
}

export default App;
