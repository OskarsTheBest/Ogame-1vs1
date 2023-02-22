import React from 'react'

function cardTurn({chooseCard, val}) {
  return (
    <div className='turn' onclick={chooseCard}>
      {val}
    </div>
  )
}

export default cardTurn


