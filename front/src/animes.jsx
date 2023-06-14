import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
import { Link } from 'react-router-dom';
import './animePages.css';

const Animes = () => {
    const [anime, setAnimeData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/animes/list')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAnimeData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const[value,setValue] = useState('');

    const filterAnime=anime.filter(animes=>{
        return animes.title.toLowerCase().includes(value.toLowerCase());
    })

    return (
        <div>
            <YourComponent/>
            <div>
                <div className='search'>
                    <input type="text" placeholder='Search anime' onChange={(event)=>setValue(event.target.value)}/>
                </div>
                {anime.length > 0 ? (
                    filterAnime.map((anime) => (
                        <div className="containerA" key={anime.id}>
                            <div className="background"></div>
                            <div className="content">
                                <div className='animeCoin'>
                                    <img src={`/animeIcons/${anime.id}.jpg`} alt="Anime" style={{ float: "left", marginRight: "100px", marginLeft: "30px"}}></img>
                                    <div className='animeInfo'>
                                    <Link to={`/anime/${anime.id}`} className="animeTitle">
                                    <h1 className='animeTitle'>{anime.title}</h1>
                                    </Link>
                                    <p className="animeDescription">{anime.description}</p>
                                    <p className="animeLikes">Likes: {anime.likes}</p>
                                    <p className="animeDislikes">Dislikes: {anime.dislikes}</p>
                                    </div>
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

export default Animes;
