import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './styles.css';

function NewsComponent() {
  const [animeData, setAnimeData] = useState([]);
  const [popAnime, setPopAnime] = useState([]);
  const [extAnime, setExtAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isHovered) {
      timeoutId = setTimeout(() => {
        setShowVideo(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/animes/')
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/animes/popular')
      .then((response) => response.json())
      .then((data) => {
        setPopAnime(data);
        setExtAnime(data.animeDTORead);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bigBanner" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showVideo ? (
        <ReactPlayer
          url={popAnime.videoURL}
          controls
          width="100%"
          height="100%"
          playing
        />
      ) : (
        <div>

        <div className="big_banner_text">
        <img
  alt=""
  fetchpriority="high"
  decoding="async"
  data-nimg="fill"
  className="big_banner_image"
  sizes="100vw"
  srcSet={popAnime.photoURL}
  src={popAnime.photoURL}
  style={{ position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent" }}
/>
          <div className="big_banner_image_gradient"></div>
          <div className="big_banner_text_container">
            <div className="big_banner_text_header">{extAnime.title}</div>
            <div className="catalog_info_rank_genres_container">
            <div className="big_banner_search_rank" style={{ color: "rgb(53, 229, 0)" }}>
                   {(extAnime.likes / (extAnime.likes + extAnime.dislikes) * 10).toFixed(2)}
              </div>

              <div className="big_banner_genres">{popAnime.episodes} эпизодов · {popAnime.mangaName} · Комедия, Приключения, Сёнен, Фантастика</div>
            </div>
            <div className="big_banner_text_description">{extAnime.description}</div>
          </div>
        </div>

        <div className="big_banner_button_container">
        <button class="button-1" role="button">Смотреть</button>
        </div>
        </div>
      )}
        
      </div>

      <div className='mainPage'>
        <div className="popularAnime">
          <h1 className="top">The most likes titles</h1>
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
                    width: `${(anime.likes / (anime.likes + anime.dislikes)) * 100}%`,
                  }}
                ></div>
                <div
                  className="dislikes"
                  style={{
                    width: `${(anime.dislikes / (anime.likes + anime.dislikes)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      <img className="mainImage" src="anime.jpg" alt="Anime" />
    </div>
    </div>
  );
}

export default NewsComponent;
