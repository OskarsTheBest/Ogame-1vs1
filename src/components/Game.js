import React, { useState } from 'react'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import './Chat.css';
import MainGame from './Maingame';

function Game({channel}) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

channel.on("user.watching.start", (event) => {
  setPlayersJoined(event.watcher_count === 2);
});

// winner
const [result, setResult] = useState({winner: "none", state:"none"})
if (!playersJoined){
        return <div>Waiting for other player to join</div>
    }
  return (
    <div className='gameContainer'>

      <MainGame result ={result} setResult={setResult}/>

      <Window>
       <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={["react"]} hideDeletedMessages/>
       <MessageInput noFiles/>
      </Window>
    </div>
  )
}

export default Game


