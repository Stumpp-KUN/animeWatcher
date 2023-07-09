import React, { useEffect, useState } from 'react';
import Component from './head';

import './user.css';

const Users = () => {
  const [users, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/list?page=${currentPage}&size=5`)
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
          return response.json();
        } else {
          setIsAuthenticated(false);
          throw new Error('Not authenticated');
        }
      })
      .then((data) => {
        console.log(data);
        setUser(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Component />
      <div>
        {isAuthenticated ? (
          users.length > 0 ? (
            users.map((user) => (
              <div className='Lka' key={user.id}>
                <div className='background'></div>
                <div className='stateContent'>
                  <div className='animeInfo'>
                    <h1 className='userNick'>{user.nickname}</h1>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='notAuth'>No receives found</p>
          )
        ) : (
          <p className='notAuth'>Receive list is available only for authenticated users</p>
        )}

        {isAuthenticated && users.length > 0 && (
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
