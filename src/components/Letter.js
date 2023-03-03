import React, {useContext, useEffect} from 'react'
import { Gamecontext } from './Game';
import './Components.css';


function Letter({letterPos, attemptVal,  }) {

    const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(Gamecontext);
    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter != "" && correctWord.toUpperCase().includes(letter);
    const letterState = currAttempt.attempt > attemptVal && 
    (correct ? "correct" : almost ? "almost" : "error");




    useEffect(() => {
      if (letter !== "" && !correct && !almost){
        setDisabledLetters((prev) => [...prev, letter]);
      }
    }, [currAttempt.attempt]);

  return (
    <div className='letter' id={letterState}> {letter} </div>
  );
}
export default Letter;
