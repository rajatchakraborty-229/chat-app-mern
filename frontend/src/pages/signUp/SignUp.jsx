import React from 'react';
import GenderCheck from './GenderCheck';

function SignUp() {
  return (
    <div className='flex flex-col min-w-96 items-center justify-center min-h-screen p-4'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
          Sign Up
        </h1>

        <form className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='fullname'>Full Name</label>
            <input
              id='fullname'
              type='text'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your full name'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Choose a username'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your password'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Confirm your password'
            />
          </div>
          <GenderCheck/>

          <button className='w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600'>
            Sign Up
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-300'>Already have an account? <a href="#" className='text-blue-500 hover:underline'>Log in</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
