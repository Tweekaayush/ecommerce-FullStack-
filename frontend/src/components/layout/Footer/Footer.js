import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from "react-router-dom"
import "./Footer.css"

const Footer = () =>{
    const mailto = process.env.REACT_APP_FRONTEND_MAIL
    return(
        <footer id ="footer">
            <div className='upper-footer'>
                <div>
                    <h1>GET IN TOUCH</h1>
                    <p>Phone : 1234543341</p>
                    <p>or <a href={`mailto:${mailto}`}> send us an email</a></p>
                    <div className='footer-links'>
                        <Link to ="/"><FacebookIcon/></Link>
                        <Link to ="/"><TwitterIcon/></Link>
                        <Link to ="/"><LinkedInIcon/></Link>
                    </div>
                    
                </div>
                <div>
                    <h1>WE'RE HIRING</h1>
                    <p>Want a job? <a href={`mailto:${mailto}`}>Email your cv</a></p>
                </div>
                <div>
                    <h1>About us</h1>
                    <p>
                        Our collection covers every genre and satisfies all cravings for interactive entertainment
                    </p>
                </div>
            </div>
            <div className='lower-footer'>
                <p>Copyright by @GameOn</p>
            </div>
        </footer>
    );
}

export default Footer;