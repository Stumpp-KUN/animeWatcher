import React, { useEffect, useState } from 'react';
import Component from './head';

import './user.css';

const Users = () => {
    const [users,setUser] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/users/list?page=${currentPage}&size=5`)
            .then((response) => response.json())
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

    return(
        <div>
            <Component/>
            <div>
            {users.length > 0 ? (
              users.map((user) => (

                <div className="Lka">
                  <div className="background"></div>
                  <div className="stateContent">
                    <div className='animeInfo'>
                    <h1 className='userNick'>{user.nickname}</h1>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}

            <div className='pagination'>
                    {users.length > 0 && (
                        <div>
                            <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                            <button disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        </div>
                    )}
                    <span className='numPage'>Page {currentPage + 1} of {totalPages}</span>
                </div>

            </div>
        </div>
    )
}

export default Users;