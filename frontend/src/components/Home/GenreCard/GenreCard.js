import React from 'react';
import "./GenreCard.css";

const GenreCard = (props) => {
  return (
    <div className="card-container">
        <img className = "card-img" src={props.img} alt="" />
        <h1 className='card-title'>{props.name}</h1>
    </div>
  )
}

export default GenreCard;