import React, { Fragment, useState} from 'react'
import Header from '../Header/Header'
import Metadata from '../Metadata'
import {news} from "../../../newsList"
import "./News.css"
import NewsCard from './NewsCard'

const News = () => {

    const [scroll, setScroll] = useState(false)
    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 64) 
            setScroll(true);
        else{
            setScroll(false)
        } 
    });
  return (
    <Fragment>
        <Metadata title="News" />
        <div className="newsContainer">
        <Header btnInfo='News' />
            <div className={scroll?"newsBox newsBox-active":"newsBox"}>
                <div className="newsHeading">
                    <h1>News</h1>
                </div>
                <div className="newsContent">
                    {news.map((item,i)=>(
                        <NewsCard key = {i} card ={item}/>
                    ))}
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default News