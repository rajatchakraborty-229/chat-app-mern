import React from 'react'
import { BsSend } from "react-icons/bs";
function MessageInput() {
  return (
    <div className='py-3 my-3'>
        <div className='w-full'>
            <input
                className='border text-sm rounded-lg block w-full p-2 bg-gray- text-white'
                type='text'
                placeholder='Type a message'
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            <BsSend />
            </button>
        </div>
    </div>
  )
}

export default MessageInput