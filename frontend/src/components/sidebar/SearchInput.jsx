import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';

function SearchInput() {
  const { searchQuery, setSearchQuery } = useConversation();

  return (
    <div className='flex items-center gap-2'>
      <input 
        type='text' 
        placeholder='Search...' 
        className='input input-bordered w-full rounded-full'
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
        type='button' 
        className='btn btn-circle bg-primary text-primary-content'
      >
        <IoSearchSharp className='w-6 h-6' />
      </button>
    </div>
  );
}

export default SearchInput;
