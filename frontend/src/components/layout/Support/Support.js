import React, { Fragment } from 'react'
import Metadata from "../Metadata"
import "./Support.css"
import "./FAQ.js"
import FAQ from './FAQ.js'
import {Link} from "react-router-dom"

const Support = () => {

  const qna = [
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
    {
      q: "This is a question?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, provident",
    },
  ]

  return (
    <Fragment>
      <Metadata title="Support"></Metadata>
      <div className="supportContainer">
        <div className="supportHeading">
          <h1>How can we help?</h1>
        </div>
        <div className="faqBox">
          <div className="supportHeads">
            <h1>FAQs</h1>
            <hr className='supportUnderline'/>
          </div>
          <div className="faqContent">
            {qna.map((ques, i)=>(
              <FAQ qna = {ques}/>
            ))}
          </div>
        </div>
        <div className='contactBox'>
          <div className="contactHeads">
            <h1>Contact</h1>
            <hr className='contactUnderline'/>
          </div>
          <div className='contactDetails'>
            <Link to={`mailto:${process.env.REACT_APP_FRONTEND_MAIL}`}>
              Send us an email regarding your issue.
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Support