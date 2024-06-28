import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';
import { getRandEmojis } from '../../utils/emojis';

function Conversations() {
  const { loading, conversations } = useGetConversations();
  const { searchQuery } = useConversation();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col overflow-auto p-2'>
      {filteredConversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandEmojis()}
          lastIdx={idx === filteredConversations.length - 1}
        />
      ))}
      {loading && (
        <div className='flex justify-center items-center'>
          <span className='loading loading-spinner'></span>
        </div>
      )}
    </div>
  );
}

export default Conversations;
