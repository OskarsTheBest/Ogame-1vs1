import React, { useState, createContext, useEffect  } from 'react'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import './Chat.css';
import MainGame from './Maingame';
import './Components.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from './Words';



export const Gamecontext = createContext();

function Game({channel}) {
  //wordle
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});

  const correctWord = "RIGHT";
  useEffect(() => {
  // Here goes the input from player 2 for player 1 word, and otherwise too
  }, [])

  const onSelectLetter = (keyVal) =>{
    if (currAttempt.letterPos > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0 ) return; 
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos -1 });
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
  }

  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

channel.on("user.watching.start", (event) => {
  setPlayersJoined(event.watcher_count === 2);
});

// winner
const [result, setResult] = useState({winner: "none", state:"none"})
if (!playersJoined){
        return <div>Waiting for other player to join</div>
    }
  return (
    <div className='gameContainer'>

      {/* <MainGame result ={result} setResult={setResult}/> */}
      <Gamecontext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord,}}>
      <div className='game'>
      <Board/>
      <Keyboard/>
      </div>
      </Gamecontext.Provider>
      <Window>
       <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={["react"]} hideDeletedMessages/>
       <MessageInput noFiles/>
      </Window>
    </div>
  )
}

export default Game


