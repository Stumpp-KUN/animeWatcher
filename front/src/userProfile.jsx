import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import YourComponent from "./head.jsx";

import './userProfile.css';

const UserProfile = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(location.state?.accessToken);
  const userId = location.state?.userId;
  const [userInfo, setUserInfo] = useState(null);
  const [image1, setImage1] = useState(null);
  const history = useHistory();
  const [editedFirstname, setEditedFirstname] = useState('');
  const [editedLastname, setEditedLastname] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is enabled

  const handleFirstnameChange = (event) => {
    setEditedFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setEditedLastname(event.target.value);
  };

  const handleRedirect = () => {
    history.push('/');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage1(file);
  };

  const handleUpload = async () => {
    if (!image1) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('file', image1);

    try {
      await axios.post('http://localhost:8080/api/v1/users/updPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Photo upload successful');
      await fetchUserInfo();
    } catch (error) {
      console.error('Failed to upload photo:', error);
    }
  };

  const handleSave = async () => {
    try {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        firstname: editedFirstname,
        lastname: editedLastname,
      }));
      
      setEditedFirstname("");
      setEditedLastname("");
      setIsEditing(false);

      if (accessToken && userId && editedFirstname.trim() !== '' && editedLastname.trim() !== '') {
        const userDTOUpdate = {
          id: userId,
          firstname: editedFirstname,
          lastname: editedLastname,
          email: userInfo.email,
          role: userInfo.role,
        };
  
        await axios.put(`http://localhost:8080/api/v1/users/update`, userDTOUpdate, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  
        console.log('Data update successful');
        await fetchUserInfo();
         
      } else {
        alert('Firstname and lastname cannot be empty');
      }
      
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  };

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/users/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        localStorage.removeItem('accessToken');
        handleRedirect();
      } catch (error) {
        console.error('Failed to delete profile:', error);
      }
    }
  };

  const fetchUserInfo = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [accessToken, userId]);

  return (
    <div className="profile-container">
      <button className="button-7" role="button" onClick={handleRedirect}>Back</button>
      <div className="photo-container">
        {userInfo && userInfo.image ? (
          <img src={`data:${userInfo.image.contentType};base64,${userInfo.image.bytes}`} alt="User Avatar" className='photoAv' />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div>
        <div className="profile-info">
          {userInfo ? (
            <div>
              {isEditing ? (
                <>
                  <div className="error-item">
                    <div>
                    <label className='edit-field'>Firstname</label>
                    <input type="text" value={editedFirstname} onChange={handleFirstnameChange} />
                    </div>

                    <div>
                    <label className='edit-field'>Lastname:</label>
                    <input type="text" value={editedLastname} onChange={handleLastnameChange} />
                    </div>

                    <input type="file" name="file1" onChange={handleFileChange} />
                    <button className="button-7" role="button" onClick={handleUpload}>Upload Photo</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="profile-item">
                    <span className="profile-label">Firstname</span> {userInfo.firstname}
                  </p>
                  <p className="profile-item">
                    <span className="profile-label">Lastname</span> {userInfo.lastname}
                  </p>
                  <p className="profile-item">
                <span className="profile-label">Email</span> {userInfo.email}
              </p>
                <p className="profile-item">
                <span className="profile-label">Role</span> {userInfo.role}
              </p>
                </>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='buttons'>
          {isEditing ? (
            <>
              <button className="button-7" role="button" onClick={handleSave}>Save</button>
              <button className="button-7" role="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="button-7" role="button" onClick={handleDeleteProfile}>Delete</button>
              <button className="button-7" role="button" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>      
      </div>
    </div>
  );
};

export default UserProfile;
