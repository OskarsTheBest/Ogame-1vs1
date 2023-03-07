import React, { useState } from 'react'
import {useChatContext, Channel} from 'stream-chat-react'
import CustomInput from './CustomInput';
import Game from './Game';
import WinLoss from './WinLoss'
import './Joingame.css';

function JoinGame({ wordSet, selectedWord }) {
  const [rivalUsername, setRivalUsername] = useState(""); // state variable to hold the rival's username
  const { client } = useChatContext(); // access to the Stream chat client object
  const [channel, setchannel] = useState(null) // state variable to hold the channel object


  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername}}); // query Stream chat API to get rival's user ID

    if (response.users.length === 0) { // if user not found, display alert and return
      alert("User not found")
      return
    }

    const newChannel = await client.channel("messaging", { // create new messaging channel with user IDs of client and rival
      members: [client.userID, response.users[0].id],
      selectedWord: selectedWord,
    });

    await newChannel.watch(); // start watching channel for new messages
    setchannel(newChannel); // set the channel state variable with the new channel

  };

  return (
    <>
    {channel ? ( // if channel is set, render the chat interface with the Game component
      <Channel channel={channel} Input={CustomInput}>
      {channel && <Game channel={channel} wordSet={wordSet} selectedWord={selectedWord}/>}

      </Channel>
    )  : ( // if channel is not set, render the join game interface
      
      <div className="container">
      <WinLoss />
    
      <h4 className="title">Create Game</h4>
    

        <label htmlFor="username" className="label">Username of Rival</label>
        <input 
          type="text" 
          id="username" 
          className="input" 
          placeholder="Enter your rival's username"
          onChange={(event) => {
            setRivalUsername(event.target.value); // update state variable with the rival's username
          }} 
        />
    
        <button 
          className="button" 
          onClick={createChannel} // call createChannel function when button is clicked
        >
          Join Game
        </button>

    </div>
  )}

  </>
  )
}

export default JoinGame
