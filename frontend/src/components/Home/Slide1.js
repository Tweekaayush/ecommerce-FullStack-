import React from 'react';
import {Link} from "react-router-dom";
import "./Slide1.css";

const Slide1 = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
      <div className="slide1">            
        <img src={props.img} className="slide1-img" alt={props.id}/>
        <button className="slide1-btn">Shop Now</button>
      </div>
    </Link>
  )
}

export default Slide1;