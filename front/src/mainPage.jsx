import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function NewsComponent() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/animes/')
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mainPage">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="popularAnime">
          <h1 className='top'>The most likes titles</h1>
          {animeData.map((anime) => (
            <div key={anime.title} className="animeIcon">
              <Link to={`/anime/${anime.id}`} className="animeTitle">
                <p>{anime.title}</p>
              </Link>
              <p className="animeDescription">{anime.description}</p>
              <p className="animeLikes">Likes: {anime.likes}</p>
              <p className="animeDislikes">Dislikes: {anime.dislikes}</p>
              <div className="likes-dislikes-line">
                <div
                  className="likes"
                  style={{
                    width: `${(anime.likes / (anime.likes + anime.dislikes)) *
                      100}%`,
                  }}
                ></div>
                <div
                  className="dislikes"
                  style={{
                    width: `${(anime.dislikes / (anime.likes + anime.dislikes)) *
                      100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <img className="mainImage" src="anime.jpg" alt="Anime" />
    </div>
  );
}

export default NewsComponent;
