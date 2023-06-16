import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import AnimeDescription from './animeDescription.jsx';
import './animePages.css';

const States = () => {
    const [states, setStateData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/states/')
            .then((response) => response.json())
            .then((data) => {
                setStateData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const[value, setValue]=useState('');

    const filterState=states.filter(state=>{
      return state.name.toLowerCase().includes(value.toLowerCase());
    })

    return (
        <div>
          <YourComponent />
          <div>
              <div className='search'>
              <input type='text' placeholder='Search state' onChange={(event)=>setValue(event.target.value)}></input> 
            </div>
            {states.length > 0 ? (
              filterState.map((state) => (
                <div
                  className="container"
                  key={state.id}
                >
                  <div className="background"></div>
                  <div className="stateContent">
                    <h1 className="stateName">{state.id}. {state.name}</h1>
                    <p className="stateDesc">
                      <AnimeDescription longDescription={state.description} />
                    </p>
                    <p className='authrNick'>{state.author.nickname}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      );
    };


export default States;
