import React from 'react';

function GenderCheck() {
  return (
    <div className='flex items-center'>
      <div className='form-control'>
        <label className='text-gray-300 flex items-center'>
          <input type='checkbox' className='mr-2' />
          Male
        </label>
      </div>
      <div className='form-control ml-4'>
        <label className='text-gray-300 flex items-center'>
          <input type='checkbox' className='mr-2' />
          Female
        </label>
      </div>
      <div className='form-control ml-4'>
        <label className='text-gray-300 flex items-center'>
          <input type='checkbox' className='mr-2' />
          Other
        </label>
      </div>
    </div>
  );
}

export default GenderCheck;
