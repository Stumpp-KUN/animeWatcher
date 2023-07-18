import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import YourComponent from './head';

import './styles.css';

function NewsComponent() {
  const [animeData, setAnimeData] = useState([]);
  const [popAnime, setPopAnime] = useState([]);
  const [extAnime, setExtAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timeoutId;
   
      timeoutId = setTimeout(() => {
        setShowVideo(true);
      }, 15000);
    

    return () => {
      clearTimeout(timeoutId);
    };
  });

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
      <div className="bigBanner">
      {showVideo ? (
        <ReactPlayer
        url={popAnime.videoURL}
        controls
        width="100%"
        height="100%"
        playing
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              fs: 0, 
            },
          },
        }}
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

<div className='header'>
  <YourComponent className='yourComponent'/>
</div>

            
      <div className='mainPage'>
        <div className="popularAnime">
          <h1 className="top">Tier list anime</h1>
          {animeData.map((anime,index) => (
            
            <div key={anime.title} className="animeIcon">
              <Link to={`/anime/${anime.id}`} className="animeFil">
                    <span>{index + 1}. {anime.title}</span>
              </Link>
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
