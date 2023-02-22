import React, { useContext, useState } from 'react'

import './tailwind.css'


function WordInput({visible, onClose}, props) {



    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClose()
      }
    }




    if(!visible) return null;

  return (

    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>

        <div className='w-[600px] flex flex-col'>
            {/*<button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button> */}
            <div className='bg-white p-2 rounded'>Write an Wordle Word for your Enemy:</div>
            <label htmlFor="input">
              <input id ="input" type="text" value={props.inputvalue} onChange={props.onInputChange} onKeyDown={handleKeyDown}></input>
            </label>
            <p>Here:{props.inputvalue}</p>
        </div>

    </div>
  )
}

export default WordInput
