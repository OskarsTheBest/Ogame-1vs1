import React, { useCallback, useEffect, useContext } from 'react'
import './Components.css';
import Key from './Key';
import { Gamecontext } from './Game';
import WordInput from './WordInput';

function Keyboard() {
  const keys1 = ["Q", "W", "E","R","T","Y","U", "I", "O","P"];
  const keys2 = ["A","S","D","F","G","H","J","K","L"];
  const keys3 = ["Z","X","C","V","B","N","M"];

  const { onDelete, onSelectLetter, onEnter, setShowWordInput, showWordInput, disabledLetters } = useContext(Gamecontext);

  // handle key press event
  const handleKeyboard = useCallback((event) => {
    if (document.activeElement === document.querySelector(".str-chat__message-textarea")) {
      return;
    }
    if (event.key === "Enter"){
      onEnter();
    } else if (event.key === "Backspace"){
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  }, [onDelete, onSelectLetter, onEnter, keys1, keys2, keys3]);

  useEffect(() => {
    // add or remove keydown event listener based on showWordInput value
    if (!showWordInput) {
      document.addEventListener("keydown", handleKeyboard);
    } else {
      document.removeEventListener("keydown", handleKeyboard);
    }

    // remove keydown event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [showWordInput, handleKeyboard]);

  return (
    <div className='keyboard'>
      <WordInput visible={showWordInput} onClose={() => setShowWordInput(false)} />
      {/* render keys on keyboard */}
      <div className='line1'>{keys1.map(key => <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />)}</div>;
      <div className='line2'>{keys2.map(key => <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />)}</div>;
      <div className='line3'><Key keyVal='ENTER' bigKey />{keys3.map(key => <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />)}<Key keyVal='DELETE' bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
