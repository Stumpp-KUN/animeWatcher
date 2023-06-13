import React from 'react';
import './animePages.css';

const AnimeDescription = ({ longDescription }) => {
  if (!longDescription) {
    return null;
  }

  const paragraphs = longDescription.split('\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  return <div className="description">{paragraphs}</div>;
};

export default AnimeDescription;
