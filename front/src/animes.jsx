import React, { useState, useEffect } from 'react';
import YourComponent from './head.jsx';
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

    return (
        <div>
            <YourComponent/>
            <div>
                {anime.length > 0 ? (
                    anime.map((anime) => (
                        <div className="container" key={anime.id}>
                            <div className="background"></div>
                            <div className="content">
                                <div className='animeCoin'>
                                    <img src={`/animeIcons/${anime.id}.jpg`} alt="Anime" style={{ float: "left", marginRight: "100px", marginLeft: "30px"}}></img>
                                    <h1 className='animeTitle'>{anime.title}</h1>
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
