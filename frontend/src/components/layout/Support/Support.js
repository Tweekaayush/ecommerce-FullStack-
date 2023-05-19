import React, { Fragment } from 'react'
import Metadata from "../Metadata"
import "./Support.css"
import "./FAQ.js"
import FAQ from './FAQ.js'
import {Link} from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';

const Support = () => {

  const qna = [
    {
      q: "How do I purchase games from GameOn?",
      a: "To purchase games from our website, simply browse through our collection, select the games you want to buy, and add them to your cart. Proceed to the checkout page, where you can review your order and make the payment using the available payment methods.",
    },
    {
      q: "What payment methods does GameOn accept?",
      a: "We accept both credit and debit cards for a smooth and secure transaction.",
    },
    {
      q: "How can I contact GameOn's Customer Support Team if there's any issue in the game?",
      a: "You can reach our Customer Support Team by visiting the \"Support\" section on our website. You can e-mail us on the given address or tag us on any Social Media Platform given below and describe your query. Our dedicated engineers will be happy to assist you with any inquiries or issues you may have.",
    },
    {
      q: "Can I return or get a refund for a game I've purchased?",
      a: "Our refund policy may vary, so it's important to review our terms and conditions. Generally, if a game has not been activated or downloaded, you may be eligible for a refund within a certain time frame. However, once a game has been activated or downloaded, it may not be eligible for a refund due to licensing restrictions.",
    },
    {
      q: "I forgot my password, how should I reset it?",
      a: "Don't worry, we got you! Navigate to the Sign-In page and then click \"Forgot Password\". Further, provide the email address that you used while creating the account and click the link that is received from GameOn Support.",
   },
   {
      q: "How do I get best gaming experience while playing on PC?",
      a: "If you're playing on Windows, make sure that your device meets the highest system requirements by checking your system information. You can also enable Game Mode to prioritise your device's resources for gameplay. For more info, see: ......................",
   },
    {
      q: "How do we get information about games that are highly anticipated and about to release worldwide?",
      a: "We, at GameOn are highly committed to our users who want to try latest released games at the earliest. Our News Section helps gamers to be update of all the latest happenings inside the gaming world. Also, time-to-time our Game Library is updated so that users should not wait for too long to try out the new releases.",
    },
  ]
  return (
    <Fragment>
      <Metadata title="Support"></Metadata>
      <div className="supportContainer">
        <div className="supportHeading">
          <h1>How can we help?</h1>
          <img src="/support.png" alt="" />
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
        <div className="contactStyleDiv"></div>
          <div className="contactHeads">
            <h1>Contact</h1>
            <hr className='contactUnderline'/>
          </div>
          <div className='contactDetails'>
            <Link to={`mailto:${process.env.REACT_APP_FRONTEND_MAIL}`}>
              <EmailIcon/>
              <p>
                Send us an email regarding your issue.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Support