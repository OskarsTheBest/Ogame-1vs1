import React, { useState, createContext, useEffect} from 'react'
import { Window, MessageList, MessageInput, useChatContext } from 'stream-chat-react'
import './Chat.css';
import './Components.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from './Words';
import Win from './Win';
import Loose from './Loose';
import axios from 'axios';

// createContext() for game-related state
export const Gamecontext = createContext();

// Main Game component
function Game({channel, selectedWord, wordSet}) {

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

  // useChatContext hook for client
  const { client } = useChatContext();

  // onSelectLetter function for keyboard input
  const onSelectLetter = (keyVal) =>{
    if (currAttempt.letterPos > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0 ) return; // If letterPos is already 0, there is nothing to delete, so just return
    const newBoard = [...board]; // Make a copy of the board
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""; // Delete the letter at the current attempt and position
    setBoard(newBoard) // Update the board with the new copy
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos -1 }); // Move the cursor back by one position
  }
  
  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return; // If the cursor is not at position 5, do nothing
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
  
  
  };
  
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

channel.on("user.watching.start", (event) => { //makes the wordle game begin

  setPlayersJoined(event.watcher_count === 2);
});


//not enough players joined
if (!playersJoined){
        return <div className='waiting'>Waiting for other player to join</div> 
    }
    return (
      <div className='gameContainer'>

        {checkWin ? (
          <Win winnerUserId={winnerUserId} winnerTempWord={winnerTempWord} winnerUsername={winnerUsername} winnerAttempt={winnerAttempt} channel={channel} />
        ) : checkLoose ? (
          <Loose />
        ) : (null)}
        {!checkWin && !checkLoose && (
          <Gamecontext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, gameOver, setGameOver }}>
            <div className='game'>
              <Board />
              <Keyboard />
            </div>
          </Gamecontext.Provider>
        )}
        <Window>
          <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={['react']} hideDeletedMessages />
          <MessageInput noFiles />
        </Window>
      </div>
    );
    }
    
    export default Game
