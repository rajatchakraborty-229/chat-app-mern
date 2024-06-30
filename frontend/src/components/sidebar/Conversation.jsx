import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function Conversation({ conversation, emoji, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  // Determine what to display as the profile picture
  const profilePic = conversation.profilepic ? (
    <img src={conversation.profilepic} alt='user avatar' className='w-full h-full object-cover' />
  ) : (
    <div className='flex items-center justify-center w-full h-full bg-purple-500 text-white text-xl'>
      {conversation.fullname[0].toUpperCase()}
    </div>
  );

  return (
    <>
      <div 
        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors duration-200 ${
          isSelected ? 'bg-blue-300' : 'hover:bg-blue-200'
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            {profilePic}
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
