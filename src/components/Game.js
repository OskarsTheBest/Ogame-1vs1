import React, { useState } from 'react'


function Game({channel}) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

channel.on("user.watching.start", (event) => {
  setPlayersJoined(event.watcher_count === 2);
});  
if (!playersJoined){
        return <div>Waiting for other player to join</div>
    }
  return (
    <div>
      <h1>Game https://francois-steinel.fr/articles/build-lobby-based-online-multiplayer-browser-games-with-react-and-nodejs</h1> 1:23:06
    </div>
  )
}

export default Game


