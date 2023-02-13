import React, { useState } from 'react'
import Cardturn from './Cardturn'
import { useChannelStateContext, useChatContext } from 'stream-chat-react'
import { Patterns } from './Win';
// ALL TURN CODE 
function Maingame(result, setResult) {
  const [mainGame, setMainGame] = useState(["",""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const {client} = useChatContext();

  useEffect(() =>{
    checkWin();
  }, [mainGame])
  const chooseCard = async (Cardturn) => {
    if (turn === player && mainGame[Cardturn] === ""){
      setTurn(player === "X" ? "O": "X");

      await channel.sendEvent({
        type: "game-move",
        data: {Cardturn, player},
      })
      setMainGame(mainGame.map((val, idx) =>{
        if (idx === Cardturn && val === ""){
          return player;
        }
        return val
      }));
    }
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = mainGame[currPattern[0]];
      if (firstPlayer == "") return
      let foundWinningPattern = true;
      currPattern.forEach((idx) =>{
        if (mainGame[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern){
        alert("Winner",mainGame[currPattern[0]])
        setResult({winner: mainGame[currPattern[0]], state: "Won"});
      }
    });
  };


  



  channel.on((event) => {
    if (event.type = "game-move" && event.user.id !== client.userID){
        const currentPlayer = event.data.player === "X" ? "O" : "X";
        setPlayer(currentPlayer);
        setTurn(currentPlayer);
      setMainGame(mainGame.map((val, idx) =>{
        if (idx === event.data.Cardturn && val === ""){
          return event.data.player;
        }
        return val
      }));
    }
  })

  return (
    <div className='mainGame'>
      <Cardturn chooseCard={() =>  {chooseCard(0);}} val={mainGame[0]}/>
      <Cardturn chooseCard={() =>  {chooseCard(1);}} val={mainGame[1]}/>
      <Cardturn/>
    </div>
  )
}

export default Maingame
