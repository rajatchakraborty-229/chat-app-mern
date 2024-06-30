import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';


function Messages() {
  const { messages, loading, hasMessages } = useGetMessages();
  useListenMessages()
  const lastMessageRef=useRef();




  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    },100)
    
  },[messages])


  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading ? (
        <span className='loading loading-spinner'></span>
      ) : (
        <>
          {hasMessages ? (
            messages.map((message, index) => (
             <div key={message._id} ref={lastMessageRef}>
             <Message  message={message} />
             </div>
            ))
          ) : (
            <div className='flex justify-center items-center h-full'>
              <p>No messages in this conversation yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Messages;
