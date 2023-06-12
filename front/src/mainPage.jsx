import React, { useState, useEffect } from 'react';
import './styles.css';

function NewsComponent() {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      fetch('http://localhost:8080/api/v1/animes/') 
  .then(response => response.json())
  .then(data => setAnimeData(data))
  .catch(error => console.log(error));
    }, []);
  
    return (
      <div className="mainPage">
        {loading ? (
            <p>Loading...</p>
                  ) : (
          <div className="popularAnime">
            {animeData.map(anime => (
              <div key={anime.title}>
                <h2 className="animeTitle">{anime.title}</h2>
                <p className="animeDescription">{anime.description}</p>
                <p>Likes: {anime.likes}</p>
                <p>Dislikes: {anime.dislikes}</p>
              </div>
            ))}
          </div>
        )}
        <img className="mainImage" src="anime.jpg" alt="Anime" />
      </div>
    );
  }
  

export default NewsComponent;
