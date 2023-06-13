import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import AnimeDescription from './animeDescription.jsx';

import './animePages.css';
import './styles.css';

const AnimePage = ({ match }) => {
  const [anime, setAnime] = useState({});

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/animes/${match.params.id}`);
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnime();
  }, [match.params.id]);

  return (
    <div>
      <YourComponent />
      <div>
        {anime ? (
          <>
            <div class="container">
              <div class="background"></div>
              <div class="content">

                <h1 className='title'>{anime.title}</h1>

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
                
                <div>
                <img src={`/animeIcons/${anime.id}.jpg`} alt="Anime" style={{ float: "left", marginRight: "100px", marginLeft: "30px"}} />
                <dl className="key-value-columns">
                  <dt>Age Restrictions:</dt>
                  <dd>{anime.ageRestrictions}</dd>
                  <dt>Episodes:</dt>
                  <dd>{anime.episodes}</dd>
                  <dt>Studio:</dt>
                  <dd>{anime.studio}</dd>
                  <dt>Manga name:</dt>
                  <dd>{anime.mangaName}</dd>
                  <dt>Likes:</dt>
                  <dd>{anime.likes}</dd>
                  <dt>Dislikes:</dt>
                  <dd>{anime.dislikes}</dd>
                </dl>
                </div>
                <AnimeDescription longDescription={anime.longDescription} />

              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AnimePage;
