import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

function Home() {
  return (
    <div className='flex sm:h-[450px] md:h-[630px] rounded-lg overflow-hidden  bg-clip-padding  bg-opacity-0'>
      <Sidebar/>
      <div className="border-l border-gray-300"></div>
      <MessageContainer/>
    </div>
  )
}

export default Home