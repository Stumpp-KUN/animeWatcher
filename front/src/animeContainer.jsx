import React from 'react';
import './container.css';

import { Link } from 'react-router-dom';

const Container = ({ animeData }) => {
  return (
    
    <div className="main">
        <Link to={`/anime/${animeData.id}`}>
      <section className="image">
        <img src={animeData.photoURL} alt={animeData.title} />
      </section>
      <section className="text">
        <h1>{animeData.title}</h1>
        <p>{animeData.description}</p>
      </section>
      </Link>
    </div>
  );
};

export default Container;
