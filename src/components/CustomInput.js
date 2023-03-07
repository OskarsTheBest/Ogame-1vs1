import React from 'react'
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

// CustomInput component that overrides the default message input component in Stream Chat React
function CustomInput() {
    const { handleSubmit } = useMessageInputContext(); // retrieves the handleSubmit function from the message input context

    // renders the custom message input component
    return (
      <div className="str-chat__input-flat str-chat__input-flat--send-button-active"> {/* input container */}
        <div className="str-chat__input-flat-wrapper"> {/* input wrapper */}
          <div className="str-chat__input-flat--textarea-wrapper"> {/* auto-complete input */}
            <ChatAutoComplete />
          </div>
          <button onClick={handleSubmit}> Send Message</button> {/* send message button */}
        </div>
      </div>
    );
  }

export default CustomInput // exports the CustomInput component
