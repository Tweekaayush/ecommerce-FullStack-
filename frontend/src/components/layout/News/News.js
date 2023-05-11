import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Metadata from '../Metadata'

const News = () => {

    const [news, setNews] = useState([])

    useEffect(()=>{
        axios.get("http://www.gamespot.com/api/articles/?api_key=5b899e8e4bb383dcf173025ac4da6cc8a7085e7a&format=json").then((res) => {
            setNews(res.data)
        })
    },[])

    console.log(news)

  return (
    <Fragment>
        <Metadata title="News" />
        <div className="newsContainer">
            <Header btnInfo='News' />
            <div className="newsBox">
            </div>
        </div>
    </Fragment>
  )
}

export default News