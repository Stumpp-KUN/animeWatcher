import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import './userProfile.css';

const UserProfile = () => {
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  const userId = location.state?.userId;
  const [userInfo, setUserInfo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage1(file);
  };

  const handleUpload = () => {
    if (!image1) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('file', image1);

    axios
      .post('http://localhost:8080/api/v1/users/updPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log('Photo upload successful');
        // Обработка успешной загрузки фотографии
      })
      .catch(error => {
        console.error('Failed to upload photo:', error);
        // Обработка ошибки при загрузке фотографии
      });
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
          if (response.data?.image?.bytes) {
            const blob = new Blob([new Uint8Array(response.data.image.bytes)], { type: response.data.image.contentType });
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob); 
            console.log(imageUrl);
            setImageUrl(imageUrl);
          }
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
          <p>
          {imageUrl ? <img src={imageUrl} alt="User Avatar" /> : <p>No image available</p>}
          </p>
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
            <button className="button-7" role="button">Delete</button>
            <button className="button-7" role="button">Edit</button>
            <button className="button-7" role="button" onClick={handleRedirect}>Home</button>
            <input type="file" name="file1" onChange={handleFileChange} />
            <button className="button-7" role="button" onClick={handleUpload}>Upload Photo</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
