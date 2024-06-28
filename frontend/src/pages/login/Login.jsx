import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

function Login() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const {loading,login}=useLogin();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(username,password)
  }
  return (
    <div className='flex flex-col items-center min-w-96 justify-center min-h-screen p-4'>
      <div className='w-full  p-6 rounded-lg shadow-md bg-gray-700'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
          Login
          <span className='text-blue-500'> Chat</span>
        </h1>

        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your username'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-300 text-sm' htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              className='mt-1 p-2 rounded-lg bg-gray-600 text-gray-300 border border-gray-500 focus:outline-none focus:border-blue-400'
              placeholder='Enter your password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className='w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600' disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span>: "Login"}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <Link to="/signup" className='text-gray-300 hover:underline'>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
