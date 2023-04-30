import React, {useState} from 'react';
import {Link} from "react-scroll";
import "./Navbar.css"

const Navbar = () =>{
    const [toggle, setToggle] = useState(false);

    function navToggle(){
        setToggle(!toggle);
    }
    return (
        <nav className="navbar">
            <div className='upper-nav'>
                <a href="/" className="nav-brand">
                    Ecommerce
                </a>           
                <div className={toggle ? "nav-toggler toggle":"nav-toggler"} onClick={navToggle}>
                    <div className='lines'>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </div>
            <div className='lower-nav'>
                    <div className={toggle?"left-nav nav-active":"left-nav"}>
                        <ul className='nav-links'>
                            <CustomLink href ="/">Home</CustomLink>
                            <CustomLink href ="">Home</CustomLink>
                            <CustomLink href ="">Home</CustomLink>
                            <CustomLink href ="/login">Login</CustomLink>
                        </ul>
                    </div> 
                    <div className={toggle?"right-nav nav-active":"right-nav"}>
                        <ul className='nav-links'>
                            <CustomLink href ="/">Home</CustomLink>
                            <CustomLink href ="">Home</CustomLink>
                            <CustomLink href ="">Home</CustomLink>
                            <CustomLink href ="">Home</CustomLink>
                        </ul>
                    </div>
            </div>
        </nav>    
    );
}

function CustomLink({href, children, ...props}){
    return(
        <li className='nav-item'>
            <a href ={href} {...props}>{children}</a>
        </li>
    );
}

export default Navbar;