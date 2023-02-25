import React, { useState, useRef } from 'react'
import './tailwind.css'

function WordInput({visible, onClose}) {
  const wordleInputVal = useRef("");
  const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      wordleInputVal.current = inputValue;
      onClose();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClose()
      }
    };


    if(!visible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
        <div className='w-[600px] flex flex-col'>
            {/*<button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button> */}
            <div className='bg-white p-2 rounded'>Write an Wordle Word for your Enemy:</div>
            <form onSubmit={handleSubmit}>
              <input type="text" required value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}></input>
              <button >send data</button>
            </form>

            <p>Here:{inputValue}</p>
        </div>

    </div>
  )
}

export default WordInput
