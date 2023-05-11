import React from 'react'
import "./About.css"
import Metadata from "../Metadata"

const About = () => {
  return (
    <div className="aboutContainer">
      <Metadata title="About Us" />
      <div className="aboutBox">
        <div className="upperAboutContainer">
          <div className="aboutImage">
            <img src="https://media.tenor.com/uTGE6zSoSs8AAAAC/future-gaming.gif" alt="" />
          </div>
          <div className="upperAboutContent">
            <h1 className='slideLeftIn'>About Us</h1>
            <h3 className='slideLeftIn2'>Play to the beat.</h3>
            <p className='slideLeftIn3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores explicabo similique cum. Sit consequatur sapiente tenetur officiis rem blanditiis alias veritatis saepe neque quasi quas tempore modi, odit ipsam vitae?</p>
          </div>
        </div>
        <div className="lowerAboutContainer slideUpIn">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis asperiores vitae molestias cum omnis neque autem placeat sunt iste quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero exercitationem doloremque ab quisquam enim at, ea iure qui id vitae?</p>
        </div>
      </div>
    </div>
  )
}

export default About