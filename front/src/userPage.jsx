import React, { useEffect, useState } from 'react';
import Component from './head';
import { Link, useHistory } from 'react-router-dom';

import './user.css';

const Users = () => {
  const [users, setUser] = useState({});
  const [userId, setUserId] = useState(0); 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const savedAccessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (savedAccessToken) {
      fetch(`http://localhost:8080/api/v1/users/list?page=${currentPage}&size=5`, {
        headers: {
          Authorization: `Bearer ${savedAccessToken}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.content);
        setTotalPages(data.totalPages);
        setUserId(data.content.id)
        })
        .catch((error) => console.log(error));
    }
  }, [savedAccessToken,currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Component />
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className='Lka' key={user.id}>
              <div className='background'></div>
              <div className='stateContent'>
                <div className='animeInfo'>
                <Link to={{
                          pathname: `/profile/${user.id}`,
                          state: { accessToken: savedAccessToken, userId: user.id }
                          }}
                          className="animeTitle"
                          >
                            <h1 className='animeNick'> {user.firstname} </h1>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='notAuth'>Users list is availiable only for auth users</p>
        )}

        {users.length > 0 && (
          <div className='pagination'>
            <div>
              <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
              <button disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </div>
            <span className='numPage'>Page {currentPage + 1} of {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
