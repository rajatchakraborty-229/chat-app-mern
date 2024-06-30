import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassname = fromMe ? 'chat-end' : 'chat-start';

  // Determine what to display as the profile picture
  const profilePic = fromMe
    ? authUser.profilepic
    : selectedConversation?.profilepic;

  const profilePicElement = profilePic ? (
    <img src={profilePic} alt='Profile' className='w-full h-full object-cover' />
  ) : (
    <div className='flex items-center justify-center w-full h-full bg-gray-500 text-white text-xl'>
      {fromMe ? authUser.fullname[0].toUpperCase() : selectedConversation?.fullname[0].toUpperCase()}
    </div>
  );

  const formattedDate = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 h-10 rounded-full overflow-hidden'>
          {profilePicElement}
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
