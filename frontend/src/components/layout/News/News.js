import React, { Fragment, useState, useEffect} from 'react'
import Header from '../Header/Header'
import Metadata from '../Metadata'
import "./News.css"
import NewsCard from './NewsCard'
import axios from "axios"

const News = () => {


    const url = `https://newsapi.org/v2/everything?q=games&apiKey=${process.env.REACT_APP_NEWS_KEY}`
    const [news, setNews] = useState([])


    useEffect(()=>{
        axios.get(`${url}`).then((response)=>{
            setNews(response.data.articles.slice(0, 30))
        })
    },[url])

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