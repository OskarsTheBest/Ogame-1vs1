import React from 'react'
import './WinLoss.css'


function Lose() {

  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className='wordleLose'>
      <h1>You Lost</h1>
      <button className='go-back-btn' onClick={handleGoBack}>Go back</button>
    </div>
  )
}

export default Lose
