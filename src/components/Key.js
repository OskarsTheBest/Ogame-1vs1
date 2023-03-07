import React, { useContext } from 'react'
import { Gamecontext } from './Game';

function Key({ keyVal, bigKey, disabled }) {
    // Import functions from Gamecontext
    const { onDelete, onSelectLetter, onEnter} = useContext(Gamecontext);

    // Select the letter or call a function based on the keyVal
    const selectLetter = () => {
        if (keyVal === "ENTER"){
            onEnter(); // Call onEnter function if keyVal is "ENTER"
        } else if (keyVal === "DELETE") {
            onDelete(); // Call onDelete function if keyVal is "DELETE"
        } else{
            onSelectLetter(keyVal); // Call onSelectLetter function with keyVal as argument
        }
    };
  
    return (
        // Render the Key component with keyVal as text content, and add CSS classes based on props
        <div className='key' id={bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}

export default Key
