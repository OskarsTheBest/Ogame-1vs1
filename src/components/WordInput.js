import React, { useState, useRef } from 'react'
import './tailwind.css'

function WordInput({ visible, onClose }) {
  // Using a ref to store the input value after form submission
  const wordleInputVal = useRef("");
  // Using state to keep track of the input value in real time
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Updating the ref value with the current input value
    wordleInputVal.current = inputValue;
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClose()
    }
  };

  // If the modal is not visible, return null
  if (!visible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
      <div className='w-[600px] flex flex-col'>
        {/* Close button */}
        {/* <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button> */}
        {/* Input label */}
        <div className='bg-white p-2 rounded'>Write an Wordle Word for your Enemy:</div>
        {/* Input form */}
        <form onSubmit={handleSubmit}>
          <input type="text" required value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
          <button>send data</button>
        </form>
        {/* Displaying the input value */}
        <p>Here: {inputValue}</p>
      </div>
    </div>
  )
}

export default WordInput
