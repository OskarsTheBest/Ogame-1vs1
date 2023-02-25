import React, { useContext } from 'react'
import { Gamecontext } from './Game';

function Key({ keyVal, bigKey, disabled }) {
    const { onDelete, onSelectLetter, onEnter} = useContext(Gamecontext);
    const selectLetter = () => {
        if (keyVal === "ENTER"){
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else{
            onSelectLetter(keyVal);
        }
    };
  return (
    <div className='key' id={bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}

export default Key
