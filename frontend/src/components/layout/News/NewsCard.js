import React from 'react'
import "./NewsCard.css"
import {Link} from "react-router-dom"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const NewsCard = ({card}) => {
  return (
    <div className="newsCard">
        <div className="newsCard-l">
            <img src={card.image.original} alt="" />
        </div>
        <div className="newsCard-r">
            <h1>{card.title}</h1>
            <h3>Published on {card.update_date}</h3>
            <p>{card.lede}</p>
            <Link to={card.site_detail_url}>
                <OpenInNewIcon/>
            </Link>
        </div>
    </div>
  )
}

export default NewsCard