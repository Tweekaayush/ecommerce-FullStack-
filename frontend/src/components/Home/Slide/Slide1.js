import React, { Fragment } from 'react';
import {Link, useParams} from "react-router-dom";
import "./Slide.css";

const Slide1 = (props) => {

  return (
        <Link className="slide" to={`/product/${props.id}`}>
            <img src={props.img} className="slide-img" alt={props.id}/>
        </Link>
  )
}

export default Slide1;