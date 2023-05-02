import React from 'react'
import {Rating} from "@mui/material"
import "./ReviewCard.css"

const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        precision:0.5,
        max:5,
        readOnly:true
    }
  return (
    <div className="reviewCard">
        <img src="" alt="User" />
        <p>{review.Name}</p>
        <Rating {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard