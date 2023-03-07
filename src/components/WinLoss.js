import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useChatContext } from 'stream-chat-react';
import './WinLoss.css'

function WinLoss({ }) {
  const [wins, setWins] = useState(0); // state variable to store user's win count
  const [losses, setLosses] = useState(0); // state variable to store user's loss count
  const [error, setError] = useState(null); // state variable to store error message
  const { client } = useChatContext(); // access Stream chat client instance
  const userId = client.user?.id; // get user ID from Stream chat client

  // make API call to get user stats
  useEffect(() => {
    axios.get(`http://localhost:3001/get-UserStats?userId=${userId}`)
      .then(res => {
        setWins(res.data.success.wins); // update win count
        setLosses(res.data.success.losses); // update loss count
      })
      .catch(err => {
        console.log(err);
        setError('Error loading user stats'); // set error message if API call fails
      });
  }, [userId]); // only re-run the effect if userId changes

  // display user's win/loss count
  return (
    <div>
      <h1 className='wl'>Your W/L:</h1>
      <p className='win'>Wins: {wins}</p>
      <p className='loose'>Losses: {losses}</p>
    </div>
  );
}

export default WinLoss;
