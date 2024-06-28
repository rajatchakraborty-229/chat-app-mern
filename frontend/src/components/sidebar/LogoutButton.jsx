import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

function LogoutButton() {
  const { loading, logOut } = useLogout();

  return (
    <div className='mt-auto flex '>
      {!loading ? (
        <BiLogOut className='w-8 h-8 text-primary cursor-pointer' onClick={logOut} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
}

export default LogoutButton;
