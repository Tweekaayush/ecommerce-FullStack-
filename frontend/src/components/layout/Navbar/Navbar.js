import React from 'react';
import {Link} from "react-scroll";
const Navbar = () =>{
    return (
        <nav className={scroll? "navbar scrolled":"navbar"}>
            <a href="home" className="nav-brand">
                AD
            </a>
            <ul className={toggle?"nav-links nav-active":"nav-links"}>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className="nav-item">Home</Link>
                </li>
                <li>
                    <Link to="about" spy={true} smooth={true} offset={-50} duration={500} className="nav-item">About</Link>
                </li>
                <li>
                    <Link to="projects" spy={true} smooth={true} offset={-50} duration={500} className="nav-item">Projects</Link>
                </li>
                <li>
                    <Link to="contact" spy={true} smooth={true} offset={-50} duration={500} className="nav-item">Contact</Link>
                </li>
            </ul>
            <div className={toggle?"nav-toggler toggle":"nav-toggler"} onClick={navToggle}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>    
    );
}

export default Navbar;