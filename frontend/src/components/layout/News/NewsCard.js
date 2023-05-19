import React from 'react'
import "./NewsCard.css"
import {Link} from "react-router-dom"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const NewsCard = ({card}) => {
  return (
    <div className="newsCard">
        <div className="newsCard-l">
            <img src={card.urlToImage} alt="" />
        </div>
        <div className="newsCard-r">
            <h1>{card.title}</h1>
            <h3>{card.author}</h3>
            <p>{String(card.publishedAt).substring(0, 10)}</p>
            <Link to={card.url}>
                <OpenInNewIcon/>
            </Link>
        </div>
    </div>
  )
}

export default NewsCard