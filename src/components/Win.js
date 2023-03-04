import React from 'react';
import { useChatContext } from 'stream-chat-react';

const Win = ({channel}) => {
  

  if (!channel) {
    return <div>Loading...</div>;
  }

  const winMessage = channel.state.messages[channel.state.messages.length - 1];
  const winnerUserId = winMessage.winnerUserId;
  const winnerTempWord = winMessage.winnerTempWord;
  const winnerUsername = winMessage.winnerUsername;
  const winnerAttempt = winMessage.winnerAttempt;
 

  return (
    <div className='win'>
      <h1>Game finished!</h1>
      <p>{winnerUsername} got the word "{winnerTempWord} in {winnerAttempt} attempts  "</p>

    </div>
  );
};

export default Win;
