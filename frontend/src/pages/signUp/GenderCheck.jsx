import React from 'react';

function GenderCheck({ onCheckboxChange, selectedGender }) {
  return (
    <div className='flex items-center space-x-4'>
      <div className='form-control'>
        <label className='text-gray-300 flex items-center'>
          <input
            type='checkbox'
            className='mr-2'
            checked={selectedGender === "Male"}
            onChange={() => onCheckboxChange("Male")}
          />
          Male
        </label>
      </div>
      <div className='form-control'>
        <label className='text-gray-300 flex items-center'>
          <input
            type='checkbox'
            className='mr-2'
            checked={selectedGender === "Female"}
            onChange={() => onCheckboxChange("Female")}
          />
          Female
        </label>
      </div>
     
    </div>
  );
}

export default GenderCheck;
