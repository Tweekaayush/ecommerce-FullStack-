import React from 'react';
import {Link} from "react-router-dom";
import "./Slide1.css";

const Slide1 = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
      <div className="slide1">            
        <img src={props.img} className="slide1-img" alt={props.id}/>
        <Link to={`/product/${props.id}`} className="slide1-btn">Shop Now</Link>
      </div>
    </Link>
  )
}

export default Slide1;