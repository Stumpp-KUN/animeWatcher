import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import './userProfile.css';

const UserProfile = () => {
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  const userId = location.state?.userId;
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/');
  };


  useEffect(() => {
    if (accessToken) {
      axios
        .get(`http://localhost:8080/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch user information:', error);
        });
    }
  }, [accessToken]);

  return (
    
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {userInfo ? (
        <div className="profile-info">
          <p className="profile-item">
            <span className="profile-label">User ID:</span> {userInfo.id}
          </p>
          <p className="profile-item">
            <span className="profile-label">Firstname:</span> {userInfo.firstname}
          </p>
          <p className="profile-item">
            <span className="profile-label">Lastname:</span> {userInfo.lastname}
          </p>
          <p className="profile-item">
            <span className="profile-label">Email:</span> {userInfo.email}
          </p>
          <p className="profile-item">
            <span className="profile-label">Role:</span> {userInfo.role}
          </p>
          <div className='buttons'>
          <button class="button-7" role="button">Delete</button>
          <button class="button-7" role="button">Edite</button>
          <button class="button-7" role="button" onClick={handleRedirect}>Home</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
