import React, { useState } from 'react'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import './Chat.css';

function Game({channel}) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

channel.on("user.watching.start", (event) => {
  setPlayersJoined(event.watcher_count === 2);
});  
if (!playersJoined){
        return <div>Waiting for other player to join</div>
    }
  return (
    <div className='gameContainer'>
      <h1>Game</h1> 
      <Window>
       <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={["react"]} hideDeletedMessages/>
       <MessageInput noFiles/>
      </Window>
    </div>
  )
}

export default Game


