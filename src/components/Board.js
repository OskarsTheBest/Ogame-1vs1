// Import React module
import React from 'react'

// Import Letter component and CSS file
import Letter from './Letter'
import './Components.css';

// Define Board component
function Board() {

// Render Board component that shows the rows of the wordle

  return (
    <div className='board'>
        <div className='row'>
            <Letter letterPos={0} attemptVal={0}/>
            <Letter letterPos={1} attemptVal={0}/>
            <Letter letterPos={2} attemptVal={0}/>
            <Letter letterPos={3} attemptVal={0}/>
            <Letter letterPos={4} attemptVal={0}/>

        </div>
        <div className='row'>            
            <Letter letterPos={0} attemptVal={1}/>
            <Letter letterPos={1} attemptVal={1}/>
            <Letter letterPos={2} attemptVal={1}/>
            <Letter letterPos={3} attemptVal={1}/>
            <Letter letterPos={4} attemptVal={1}/>

        </div>
        <div className='row'>            
            <Letter letterPos={0} attemptVal={2}/>
            <Letter letterPos={1} attemptVal={2}/>
            <Letter letterPos={2} attemptVal={2}/>
            <Letter letterPos={3} attemptVal={2}/>
            <Letter letterPos={4} attemptVal={2}/>

        </div>
        <div className='row'>
            <Letter letterPos={0} attemptVal={3}/>
            <Letter letterPos={1} attemptVal={3}/>
            <Letter letterPos={2} attemptVal={3}/>
            <Letter letterPos={3} attemptVal={3}/>
            <Letter letterPos={4} attemptVal={3}/>

        </div>
        <div className='row'>
            <Letter letterPos={0} attemptVal={4}/>
            <Letter letterPos={1} attemptVal={4}/>
            <Letter letterPos={2} attemptVal={4}/>
            <Letter letterPos={3} attemptVal={4}/>
            <Letter letterPos={4} attemptVal={4}/>

        </div>
        <div className='row'>
            <Letter letterPos={0} attemptVal={5}/>
            <Letter letterPos={1} attemptVal={5}/>
            <Letter letterPos={2} attemptVal={5}/>
            <Letter letterPos={3} attemptVal={5}/>
            <Letter letterPos={4} attemptVal={5}/>

        </div>
    </div>
  )
}

export default Board
