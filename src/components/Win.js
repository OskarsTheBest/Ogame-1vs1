import React from 'react';
import './WinLoss.css'

const Win = ({channel}) => {
  // Handle going back to the homepage
  const handleGoBack = () => {
    window.location.href = "/";
  };
  
  // If there's no channel object, display loading message
  if (!channel) {
    return <div>Loading...</div>;
  }

  // Get the latest win message from the channel state
  const winMessage = channel.state.messages[channel.state.messages.length - 1];

  // Extract relevant information from the win message
  const winnerTempWord = winMessage.winnerTempWord;
  const winnerUsername = winMessage.winnerUsername;
  const winnerAttempt = winMessage.winnerAttempt;
 

  // Render the win message with the winner's information and a go back button
  return (
    <div className='wordlewin'>
      <h1>Game finished!</h1>
      <p>{winnerUsername} got the word "{winnerTempWord}" in {winnerAttempt} attempts</p>
      <button className='go-back-btn' onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export default Win;
