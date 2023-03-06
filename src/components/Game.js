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
import Win from './Win';
import Loose from './Loose';
import axios from 'axios';


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
  const [checkWin, setCheckWin] = useState(false);
  const [winnerUserId, setWinnerUserId] = useState(null);
  const [winnerUsername, setWinnerUsername] = useState("");
  const [winnerTempWord, setWinnerTempWord] = useState("");
  const [winnerAttempt, setWinnerAttempt] = useState("");
  const [checkLoose, setCheckLoose] = useState(false);
  const [timer, setTimer] = useState(320);

  //db
  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  const [userId, setUserId] = useState(null);






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
      channel.sendMessage({
        text: `${client.user?.name} guessed the word "${correctWord}"!`,
        message_type: 'win',
        winnerUserId: client.user?.id,
        winnerTempWord: currWord,
        winnerUsername: client.user?.name,
        winnerAttempt: currAttempt.attempt
        
      });
      addStatsToDatabase(client.user?.id, true);


    }
    if (currAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())){
      channel.sendMessage({
        text: `${client.user?.name} failed to guess the word "${correctWord}"!`,
        message_type: 'loose'
      })
      setGameOver({gameOver: true, guessedWord: false});
      addStatsToDatabase(client.user?.id, false);
    }
    console.log(correctWord);

  };


   

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          channel.sendMessage({
            text: `${client.user?.name} failed to guess the word "${correctWord}"!`,
            message_type: 'loose'
          })
          addStatsToDatabase(client.user?.id, false);
          clearInterval(intervalId);
          return prevTimer;
        }
      });
    }, 1000); // 1000ms = 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  const addStatsToDatabase = async (userId, win) => {
    try {
      const response = await axios.post('http://localhost:3001/addStats', { userId, win });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };











  useEffect(() => {
    // This effect will run when the component mounts or when a new game is created
    // and will clear the messages in the channel
    channel.truncate();
  }, [channel]);








  //checkwin
  useEffect(() => {

    const handleEvent = (event) => {
      if (
        event.type === "message.new" &&
        event.message.text.includes("guessed the word")
      ) {
        setCheckWin(true);
        setGameOver({gameOver: false, guessedWord: false});
      }
    };

    channel.on("message.new", handleEvent);
    channel.on("message.updated", handleEvent);

    return () => {
      channel.off("message.new", handleEvent);
      channel.off("message.updated", handleEvent);
    };
  }, []);
  // checkloose
 
  useEffect(() => {

    let count = 0; // initialize a counter variable
  
    const handleEvent = (event) => {
      if (
        event.type === "message.new" &&
        event.message.text.includes("failed to guess")
      ) {
        count++; // increment the counter
        if (count === 2) {
          setGameOver({gameOver: false, guessedWord: false});
          setCheckLoose(true);
        }
      }
    };
  
    channel.on("message.new", handleEvent);
    channel.on("message.updated", handleEvent);
  
    return () => {
      channel.off("message.new", handleEvent);
      channel.off("message.updated", handleEvent);
    };
  }, []);





  
  



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

    {checkWin ? (
            <Win winnerUserId={winnerUserId} winnerTempWord={winnerTempWord} winnerUsername={winnerUsername} winnerAttempt={winnerAttempt} channel={channel} />
          ) : checkLoose ? (
            <Loose />
          ) : (
            <>
              <p>{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60
                .toString()
                .padStart(2, '0')}`}</p>
              {/* display the time remaining in minutes:seconds format */}
            </>
          )}
          {!checkWin && !checkLoose && timer === 0 && (
            <div>
              <p>Time's up!</p>
          
            </div>
          )}
          <Gamecontext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, gameOver, setGameOver, }}>
            <div className='game'>
            
              {/*<button onClick={() =>
              setShowWordInput(true)}>Show</button> */}
             {/* <WordInput  visible={showWordInput} onClose={() => setShowWordInput(false)}  />  */}
    
               { gameOver.gameOver ? null : <Board/>}
              { gameOver.gameOver ? <GameOver /> : <Keyboard/>}
            </div>
          </Gamecontext.Provider>
          <Window>
            <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={["react"]} hideDeletedMessages />
            <MessageInput noFiles/>
          </Window>
    
        </div>
      )
    }
    
    export default Game
