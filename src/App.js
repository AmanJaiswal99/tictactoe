import { useState } from 'react';
import './App.css';

function App() {

  var count = 0;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [info,setInfo] = useState('click to play')
  const [logo,setLogo] = useState("x")
  const [isGameOver, setIsGameOver] = useState(false);
  var winningIDs = [];

  // aids the visual change in x or o 
  const showClick = (event) => {
    count++;
    let tempBoard = board;
    tempBoard[event.target.id] = logo;
    setBoard(tempBoard)
    event.target.value = logo
    event.target.disabled = true;
    if(logo === "x"){
      setLogo("0")
    }else{
      setLogo("x")
    }
  }

  const horizontal = (id) => {
    id = parseInt(id,10)
    if(id%3 == 0 && board[id+1] === logo && logo === board[id+2]){
      winningIDs.push(id,id+1,id+2)
      return true;
    }
    if(id%3 == 1 && board[id-1]  === logo && logo === board[id+1]){
      winningIDs.push(id,id-1,id+1)
      return true;
    }
    if (id%3 == 2 && board[id-1] === logo && logo === board[id-2]){
      winningIDs.push(id,id-1,id-2)
      return true;
    }
    return false;
  }

  const vertical = (id) => {
    id = parseInt(id,10);
    if((id < 3) && logo ===  board[id+3] && logo === board[id + 6] ){
        winningIDs.push(id,id+3,id+6)
        return true;
    }
    if((id > 2 && id < 6) && logo === board[id-3] && logo === board[id + 3] ){
      winningIDs.push(id,id+3,id-6)
      return true;
    }
    if((id > 5 && id < 9) && logo === board[id-3] && logo === board[id - 6] ){
      winningIDs.push(id,id-3,id-6)
      return true;
    }
    return false
  }

  const diagonal = (id) => {
    if(id == 4){
      if( (board[4] === board[0] && board[4] === board[8])){
        winningIDs.push(id,id-4,id+4)
        return true;
      } else if ((board[4] === board[2] && board[4] === board[6])) {
        winningIDs.push(id,id-2,id+2)
        return true;
      }
    }
    if (id == 0 || id == 8){
      winningIDs.push(0,4,8)
      return (board[4] === board[0] && board[4] === board[8])
    }
    if (id == 2 || id == 6){
      winningIDs.push(2,6,4)
      return (board[4] === board[2] && board[4] === board[6])
    }

    return false
  }

  const colorWinner = () => {
    winningIDs.forEach(id => {
      document.getElementById(id).style.backgroundColor='green'
      document.getElementById(id).style.color='white'
      document.getElementById(id).value= "🎉"
    });
  }

  const checkWinner = (id) => {
    if(horizontal(id)){
      return true;
    }
    if(vertical(id)){
      return true;
    }
    if(diagonal(id)){
      return true;
    }
    return false;
  }
  
    const turnClick = (event) => {
      showClick(event);
      if(checkWinner(event.target.id)){
        colorWinner();
        setInfo(`${logo} is the winner 🎉`);
        setIsGameOver(true);
      }
      if(count === 9){
        setInfo(`Its a draw`);
        setIsGameOver(true);
      }

    }


  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className='box'>
      <div className='row'>
        {[0,1,2].map(item => (
        <input type='button' disabled={isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item} id={item}/>
        ))}
      </div>
      <div className='row'>
        {[3,4,5].map(item => (
        <input type='button' disabled={isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item}   id={item}/>
        ))}
      </div>
      <div className='row'>
        {[6,7,8].map(item => (
        <input type='button' disabled={isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item}  id={item}/>
        ))}
      </div>
      <h2>{info}</h2>
      </div>
    </div>
  );
}

export default App;
