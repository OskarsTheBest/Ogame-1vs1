import React, { useState, createContext, useEffect, useContext, useRef } from 'react'
import { Window, MessageList, MessageInput, useChatContext } from 'stream-chat-react'
import './Chat.css';

import './Components.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault, generateWordSet } from './Words';
import WordInput from './WordInput';
import { Inputcontext } from './WordInput';
import wordleInput from './WordInput';
import GameOver from './GameOver';
import Cookies from "universal-cookie";



export const Gamecontext = createContext();

function Game({channel, selectedWord, wordSet}) {



  //popup
 // const [showWordInput, setShowWordInput] = useState(true)
  // input for wordle

  //wordle
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false,});
  const [correctWord, setCorrectWord] = useState(selectedWord);
  const [wordleWord, setWordleWord] = useState("");
  const { client } = useChatContext();





  

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
      currWord.toLowerCase()
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0});
    } else {
      alert ("Word not found")
    }

    if (currWord.trim().toLowerCase() === correctWord.trim().toLowerCase()) {
      setGameOver({gameOver: true, guessedWord: true})
      channel.sendMessage({
        text: `${client.user?.name} guessed the word "${correctWord}"!`,
        message_type: 'win',
      });
    }
    if (currAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())){
      setGameOver({gameOver: true, guessedWord: false});
    }
    console.log(correctWord);
  }



  // PLAYER LOGIC
 



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
      <Gamecontext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, gameOver, setGameOver, }}>
        <div className='game'>
          {/*<button onClick={() =>
          setShowWordInput(true)}>Show</button> */}
         {/* <WordInput  visible={showWordInput} onClose={() => setShowWordInput(false)}  />  */}
          <Board/>
          { gameOver.gameOver ? <GameOver /> : <Keyboard/>}
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


