import React, {useContext, useEffect} from 'react'
import { Gamecontext } from './Game';
import './Components.css';


function Letter({letterPos, attemptVal,  }) {

    const { board, correctWord, currAttempt, setDisabledLetters } = useContext(Gamecontext);
    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

    // Determine the class name for the letter based on its correctness
    const letterState = currAttempt.attempt > attemptVal && 
    (correct ? "correct" : almost ? "almost" : "error");

    // Disable the letter on the keyboard if it is incorrect and not almost correct
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
