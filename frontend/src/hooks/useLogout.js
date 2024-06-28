import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

function useLogout() {
  const [loading,setLoading]=useState(false)
  const {setAuthUser}=useAuthContext();

  const logOut=async()=>{
    setLoading(loading)
    try{
        const res=await fetch("/api/auth/logout",{
            method:"POST",
            headers:{"Content-Type":"application/json"},            
        })
        const data=await res.json();
        if(data.error){
          throw new Error(data.error)
        }
        localStorage.removeItem("chat-user")
        setAuthUser(null)
        toast.success("Log out successfully")
    }catch(error){
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading,logOut}
}

export default useLogout