import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tictactoe from './components/games/Tictactoe';
import Homepage from './components/pages/Homepage';
import Navbar from './components/elements/Navbar';
function App() {

  return (
    <Router>
    <div className="App">
    <Navbar/>
    <Routes>
        <Route path="/tictactoe" element={<Tictactoe/>} />
        <Route path="/" element={<Homepage/>} />
    </Routes>
    </div>
    </Router>

  );
}

export default App;
