import React from 'react';
import "./Footer.css"

const Footer = () =>{
    return(
        <footer id ="footer">
            <div className='upper-footer'>
                <div className='left-footer'>
                    <h1>GET IN TOUCH</h1>
                    <p>Phone : 1234543341</p>
                    <p>or <a href="/"> send us an email</a></p>
                    <div className='footer-links'>
                        <a href="/">facebook</a>
                        <a href="/">insta</a>
                        <a href="/">twitter</a>
                    </div>
                    
                </div>
                <div className='mid-footer'>
                    <h1>WE'RE HIRING</h1>
                    <p>Want a job? <a href="/">Email your cv</a></p>
                </div>
                <div className='right-footer'>
                    <h1>About us</h1>
                    <p>this is a para.this is a para.this is a para.this is a para.this is a para.this is a para.this is a para.</p>
                </div>
            </div>
            <div className='lower-footer'>
                <p>Copyright by @AD</p>
            </div>
        </footer>
    );
}

export default Footer;