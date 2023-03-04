import React from 'react'

export default function Win({winner}) {
  return (
    <div>
      <h1>Game Done</h1>
      <p> User ID {winner.userId} </p>
      <p>Temporary word was {winner.tempWord}</p>
    </div>
  )
}
