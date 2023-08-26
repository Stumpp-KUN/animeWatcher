import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import AnimeDescription from './animeDescription.jsx';

import './animePages.css';

const AnimePage = ({ match }) => {
  const [anime, setAnime] = useState({});
  const [extAnime, setExtAnime] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [videoKey, setVideoKey] = useState(1);

  useEffect(() => {
    console.log("AnimePage компонент перерендерен.");
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/animes/${match.params.id}`
        );
        const data = await response.json();
        setAnime(data);
        setExtAnime(data.animeDTORead);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnime();
  }, [match.params.id, selectedEpisode]);

  const handleEpisodeChange = (event) => {
    setSelectedEpisode(parseInt(event.target.value));
    setVideoKey((prevKey) => prevKey + 1); 
  };

  return (
    <div>
      <YourComponent />
      <div>
        {extAnime.title ? (
          <>
            <div className="container">
              <div className="animeContent">
                <div className='photoContainer'>
                <img src={anime.photoURL} className='animePhoto'></img>
                </div>
                <span className='titleExt'>{extAnime.title}</span>
                <div>
                  <img src={`/animeIcons/${extAnime.id}.jpg`} alt="Anime" style={{ float: "left", marginRight: "100px", marginLeft: "30px" }} />
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

                <div className="player-container">
                  <video key={videoKey} controls>
                    <source src={`/anime/${match.params.id}/episode${selectedEpisode}.mp4`} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>

                  <label htmlFor="episode-select">Выберите серию:</label>
                  <select id="episode-select" onChange={handleEpisodeChange} value={selectedEpisode}>
                    {Array.from({ length: anime.episodes }, (_, index) => index + 1).map((episodeNumber) => (
                      <option key={episodeNumber} value={episodeNumber}>
                        Серия {episodeNumber}
                      </option>
                    ))}
                  </select>
                </div>
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