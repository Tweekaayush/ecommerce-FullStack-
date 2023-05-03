import React, { Fragment } from 'react';
import {Link, useParams} from "react-router-dom";
import "./Slide.css";

const Slide2 = (props) => {

  // ${props.id}
  return (
        <div className="slide2">
                <img src={props.img} className='slide-img' alt={props.id}/>
        </div>
  )
}

export default Slide2;