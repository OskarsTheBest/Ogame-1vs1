import React, { useState, createContext, useEffect, useContext, useRef } from 'react'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import './Chat.css';
import MainGame from './Maingame';
import './Components.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault, generateWordSet } from './Words';
import WordInput from './WordInput';
import { Inputcontext } from './WordInput';
import wordleInput from './WordInput';
export const Gamecontext = createContext();

function Game({channel}) {



  //popup
 // const [showWordInput, setShowWordInput] = useState(true)
  // input for wordle

  //wordle
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([]);

  const correctWord = "HELLO";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      console.log(words);
    });
  }, [setWordSet]);


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
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0});
    } else {
      alert ("Word not found, look here for every accepted wordle word https://www.stadafa.com/2021/09/every-worlde-word-so-far-updated-daily.html")
    }

    if (currWord === correctWord){
      alert("Game finished")
    }
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
      <Gamecontext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters}}>
        <div className='game'>
          {/*<button onClick={() =>
          setShowWordInput(true)}>Show</button> */}
         {/* <WordInput  visible={showWordInput} onClose={() => setShowWordInput(false)}  />  */}
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


