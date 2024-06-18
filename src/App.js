import { useState, useEffect } from 'react';
import './App.css';

function App() {

  var count = 0;
  // array of length 9 containing cell values
  const [board, setBoard] = useState(Array(9).fill(null));
  // display status based on various situations in the game
  const [info,setInfo] = useState('Enter names!')
  // play chance logo of the current player
  const [logo,setLogo] = useState("x")
  // players
  const [player1,setplayer1] = useState("")
  const [player2,setplayer2] = useState("")
  // check if game is valid
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  // current player
  const [currentPlayer,setCurrentPlayer] = useState("")
  var winningIDs = [];

  // once name is entered and submitted
  const submitName = () => {
    if (player1 !== "" && player2 !== "") {
      setCurrentPlayer(player1)
      setIsPlayerReady(true);
      setInfo(`${player1}'s turn`)
    } else {
      setIsPlayerReady(false);
    }
  }
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
    if(currentPlayer == player1){
      setCurrentPlayer(player2)
      setInfo(`${player2}'s turn`)
    }else{
      setCurrentPlayer(player1)
      setInfo(`${player1}'s turn`)
    }

  }

  // check horizontal win
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

  // check vertical win
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

  // check diagonal win
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

  // color the winning blocks
  const colorWinner = () => {
    winningIDs.forEach(id => {
      document.getElementById(id).style.backgroundColor='green'
      document.getElementById(id).style.color='white'
      document.getElementById(id).value= "🎉"
    });
  }

  // check winner after current click
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
  
  // runs after a cell is clicked
    const turnClick = (event) => {
      showClick(event);
      if(checkWinner(event.target.id)){
        colorWinner();
        setInfo(`${currentPlayer} is the winner 🎉`);
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

      <div className='playerInfo'>
        <span className='playerInput'>
        <input className='inputName' type='text' disabled={isPlayerReady} onChange={e=>setplayer1(e.target.value)} placeholder='player 1'/>
        <input className='inputName' type='text' disabled={isPlayerReady} onChange={e=>setplayer2(e.target.value)} placeholder='player 2'/>
        </span>
        <input className='button' type='button' disabled={isGameOver || isPlayerReady} onClick={event=>submitName()} value="Submit"/>
      </div>
      <div>
    </div>

      <div className='box'>
      <div className='row'>
        {[0,1,2].map(item => (
        <input className='cell' type='button' disabled={isPlayerReady==false || isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item} id={item}/>
        ))}
      </div>
      <div className='row'>
        {[3,4,5].map(item => (
        <input className='cell' type='button' disabled={isPlayerReady==false || isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item}   id={item}/>
        ))}
      </div>
      <div className='row'>
        {[6,7,8].map(item => (
        <input className='cell' type='button' disabled={isPlayerReady==false || isGameOver || board[item] !== null} onClick={event => turnClick(event)} key={item}  id={item}/>
        ))}
      </div>
      <h2>{info}</h2>
      </div>
    </div>
  );
}

export default App;
