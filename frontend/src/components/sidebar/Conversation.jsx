import React from 'react';
import useConversation from '../../zustand/useConversation';
import { BiUserCircle } from 'react-icons/bi';

function Conversation({ conversation, emoji, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  
  return (
    <>
      <div 
        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors duration-200 ${
          isSelected ? 'bg-blue-300 ' : 'hover:bg-blue-200'
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src={conversation.profilepic} alt='user avatar' />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-center'>
            <p className='font-bold'>{conversation.fullname}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-1'></div>}
    </>
  );
}

export default Conversation;
