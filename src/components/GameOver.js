import React, {useContext} from 'react'
import { Gamecontext } from './Game';


function GameOver() {
    //used to render the gameover function on win/loose, now there is win.js and loose.js
  const {gameOver, currAttempt, correctWord } = useContext(Gamecontext);
  return (
    <div className='gameOver'>
      <h3>{gameOver.guessedWord ? "You Correctly guessed" : "You failed, wait for your enemy"}</h3>
      <h3>Correct word was : {correctWord}</h3>
      {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver
