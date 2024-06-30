import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import ProfilePicture from './ProfilePicture'; // Import ProfilePicture component here

function Sidebar() {
  return (
    <div className='h-full w-1/4 flex flex-col bg-purple-100 text-base-content shadow-lg'>
      <div className='p-4'>
        <ProfilePicture />
        <SearchInput />
      </div>
      <div className='divider'></div>
      <div className='flex-1 overflow-auto'>
        
        <Conversations />
      </div>
      <div className='p-4'>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Sidebar;
