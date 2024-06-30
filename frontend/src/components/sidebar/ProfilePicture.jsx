import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the import path based on your actual file structure

function ProfilePicture() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('profilepic', selectedFile);

    try {
      setUploading(true);

      const response = await fetch('/api/users/upload-profile-picture', {
        method: 'POST',
        body: formData,
        headers: {
          // No need to set Content-Type with FormData
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();

      // Update authUser with the new profile picture URL
      const updatedUser = { ...authUser, profilepic: data.profilepic };
      setAuthUser(updatedUser); // Update the user in context or state

      // Update local storage with the updated user data
      localStorage.setItem('chat-user', JSON.stringify(updatedUser));

      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex items-center'>
      <div>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <button
          className='btn btn-primary mt-2'   
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      
      <div className='w-12 h-12 rounded-full  overflow-hidden flex items-center justify-center bg-gray-500 text-white text-xl'>
        {authUser.profilepic ? (
          <img src={authUser.profilepic} alt='Profile' className='w-full h-full object-cover' />
        ) : (
          authUser.fullname[0].toUpperCase()
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
