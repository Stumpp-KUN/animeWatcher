import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import AnimeDescription from './animeDescription.jsx';

import './animePages.css';
import './styles.css';

const AnimePage = ({ match }) => {
  const [anime, setAnime] = useState({});
  const [extAnime, setExtAnime] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/animes/${match.params.id}`);
        const data = await response.json();
        setAnime(data);
        setExtAnime(data.animeDTORead);
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

                <span className='titleExt'>{extAnime.title}</span>

                <div className="likes-dislikes-line">
                  <div
                    className="likes"
                    style={{
                      width: `${(extAnime.likes / (extAnime.likes + extAnime.dislikes)) *
                        100}%`,
                    }}
                  ></div>
                  <div
                    className="dislikes"
                    style={{
                      width: `${(extAnime.dislikes / (extAnime.likes + extAnime.dislikes)) *
                        100}%`,
                    }}
                  ></div>
                </div>
                
                <div>
                <img src={`/animeIcons/${extAnime.id}.jpg`} alt="Anime" style={{ float: "left", marginRight: "100px", marginLeft: "30px"}} />
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
                  <dd>{extAnime.likes}</dd>
                  <dt>Dislikes:</dt>
                  <dd>{extAnime.dislikes}</dd>
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
