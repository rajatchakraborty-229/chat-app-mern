import React, { useState } from 'react';
import GenderCheck from './GenderCheck';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

function SignUp() {
  const [inputs, setInputs] = useState({
    fullname: "",    // Changed from fullname to fullName
    username: "",    // Changed from username to userName
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const { loading, signUp } = useSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({
        fullname: inputs.fullname,
        username: inputs.username,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
        gender: inputs.gender
      });
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className='flex flex-col min-w-96 items-center justify-center min-h-screen p-4'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
          Sign Up
        </h1>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='fullname'>Full Name</label>
            <input
              id='fullname'
              type='text'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your full name'
              value={inputs.fullname}
              onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Choose a username'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Confirm your password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>
          <GenderCheck onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender} />
          <button className='w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600' disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-300'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
