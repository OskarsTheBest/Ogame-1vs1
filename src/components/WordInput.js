import React from 'react'
import './tailwind.css'


function wordInput({visible, onClose}) {

    if(!visible) return null;

  return (

    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>

        <div className='w-[600px] flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
            <div className='bg-white p-2 rounded'> my modal</div>
            <input></input>
        </div>

    </div>
  )
}

export default wordInput
