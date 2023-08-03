import React, { useState, useEffect, useContext } from 'react';
import YourComponent from './head.jsx';
import AnimeDescription from './animeDescription.jsx';
import './animePages.css';
import TokenContext from './TokenContext'; 

const States = () => {
  const [states, setStateData] = useState([]);
  const accessToken = useContext(TokenContext);
  const savedAccessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (savedAccessToken) {
      fetch('http://localhost:8080/api/v1/states/', {
        headers: {
          Authorization: `Bearer ${savedAccessToken}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setStateData(data);
        })
        .catch((error) => console.log(error));
    }
  }, [accessToken]);

  const [value, setValue] = useState('');

  useEffect(() => {
    const savedProgress = localStorage.getItem('statesProgress');
    if (savedProgress) {
      setValue(savedProgress);
    }
  }, []);

  const filterState = states.filter((state) => {
    return state.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    localStorage.setItem('statesProgress', newValue);
  };

  return (
    <div>
      <YourComponent />
      <div>
        {console.log(accessToken)}
        {accessToken && <p>Acess Token: {accessToken}</p>}
        {states.length > 0 && (
          <div className="search">
            <input
              type="text"
              placeholder="Search state"
              value={value}
              onChange={handleInputChange}
            ></input>
          </div>
        )}
        {states.length > 0 ? (
          filterState.map((state) => (
            <div className="container" key={state.id}>
              <div className="background"></div>
              <div className="stateContent">
                <h1 className="stateName">
                  {state.id}. {state.name}
                </h1>
                <p className="stateDesc">
                  <AnimeDescription longDescription={state.description} />
                </p>
                <p className="authrNick">{state.author.nickname}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="notAuth">
            State list is available only for authenticated users
          </p>
        )}
      </div>
    </div>
  );
};

export default States;
