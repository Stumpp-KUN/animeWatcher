import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import { Link } from 'react-router-dom';
import './animes.css';

const Animes = () => {
    const [animeList, setAnimeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/animes/list?page=${currentPage}&size=2`)
            .then((response) => response.json())
            .then((data) => {
                setAnimeList(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.log(error));
    }, [currentPage]);     

    const [value, setValue] = useState('');

    const filterAnime = animeList.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase());
    });

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
          <YourComponent />
          <div>
            {filterAnime.length > 0 ? (
              filterAnime.map((anime) => (
                <div className='animeCoin' key={anime.id}>
                  <img src={`/animeIcons/${anime.id}.jpg`} alt='Anime' />
                  <div className='animeInfo'>
                    <Link to={`/anime/${anime.id}`} className='animeTitle'>
                      {anime.title}
                    </Link>
                    <p className='animeDescription'>{anime.description}</p>
                    <p className='animeLikes'>Likes: {anime.likes}</p>
                    <p className='animeDislikes'>Dislikes: {anime.dislikes}</p>
                    <div className='likes-dislikes-line'>
                      <div
                        className='likes'
                        style={{
                          width: `${(anime.likes / (anime.likes + anime.dislikes)) * 100}%`,
                        }}
                      ></div>
                      <div
                        className='dislikes'
                        style={{
                          width: `${(anime.dislikes / (anime.likes + anime.dislikes)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
      
            <div className='pagination'>
              {filterAnime.length > 0 && (
                <div>
                    <button disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                  <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                </div>
              )}
              <span className='numPage'>Page {currentPage + 1} of {totalPages}</span>
            </div>
          </div>
        </div>
      );
};

export default Animes;
