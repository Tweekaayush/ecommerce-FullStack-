import React from 'react'
import "./HomeNewsSection.css"
import { Link } from 'react-router-dom'

const HomeNewsSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
}
  return (
    <div className="homeNewsSection">
        <Link to="/news" onClick={scrollToTop} className="homeNewsBox">
            <img src="https://wallpaper.dog/large/10763872.jpg" alt="" />
            <div className="homeNewsBoxFilter"></div>
            <h1>News</h1>
        </Link>
    </div>
  )
}

export default HomeNewsSection