import React from 'react';
import "./Slide2.css";

const Slide2 = (props) => {

  // ${props.id}
  return (
    
    <div className="slide2">            
      <img src={props.img} className="slide2-img" alt={props.id}/>
      <h1 className="slide2-title">{props.title}</h1>
    </div>
  )

}

export default Slide2;