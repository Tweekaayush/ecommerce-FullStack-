import React from 'react';
import "./GenreCard.css";

const GenreCard = ({genre}) => {

  return (
    <div className="card-container" >
        <img className = "card-img" src={genre.image_background} alt="" />
        <h1 className='card-title'>{genre.name}</h1>
    </div>
  )
}

export default GenreCard;