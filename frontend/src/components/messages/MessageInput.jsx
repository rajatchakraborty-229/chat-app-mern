import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Check if message is empty or only contains whitespace
    await sendMessage(message);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form className='py-2 my-3 mx-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          className='border text-sm rounded-lg block w-full p-3 bg-gray-300 text-black placeholder-black outline-none focus:border-blue-500'
          type='text'
          placeholder='Type a message...'
          value={message}
          onChange={handleChange} // Use onChange instead of onClick to update message state
        />
        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3' style={{ fontSize: '1.5rem' }}>
          {loading ? <span className='loading loading-spinner'></span> : <BsSend style={{ color: 'blue' }} />}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
