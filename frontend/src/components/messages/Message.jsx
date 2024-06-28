import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassname = fromMe ? 'chat-end' : 'chat-start';
  const profilepic = fromMe ? authUser.profilepic : selectedConversation?.profilepic;
  const formattedDate=extractTime(message.createdAt)
  
  return (
    <div className={`chat ${chatClassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img 
            src={profilepic}
            alt='Tailwind css chat bubble'
          />
        </div>
      </div>
      <div className='chat-bubble text-white bg-blue-500' style={{ wordWrap: 'break-word', maxWidth: '50%' }}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formattedDate}
      </div>
    </div>
  );
}

export default Message;
