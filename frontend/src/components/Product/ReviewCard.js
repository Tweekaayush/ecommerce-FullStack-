import React from 'react'
import {Rating} from "@mui/material"
import "./ReviewCard.css"

const ReviewCard = ({review}) => {
     const options = {
        value: review.rating,
        precision:0.5,
        max:5,
        readOnly:true,
        size: "small"
    }
    
  return (
    <div className="reviewCard">
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='comment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard