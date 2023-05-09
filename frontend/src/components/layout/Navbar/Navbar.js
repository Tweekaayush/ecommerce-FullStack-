import React, {useState} from 'react';
import {FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa"
import "./Navbar.css"
import UserOptions from './UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';
import { Link } from 'react-router-dom';

const Navbar = () =>{

    const [toggle, setToggle] = useState(false);
    const {isAuthenticated, user} = useSelector((state)=>state.user);
    const dispatch = useDispatch()

    function navToggle(){
        if(toggle === false)
            document.body.style.overflow = 'hidden';
        else{
            document.body.style.overflow = 'unset';
        }
        setToggle(!toggle);
    }

    function linkClick(){
        setToggle(false)
        document.body.style.overflow = 'unset';
    }

    function LeftLink({href, children, ...props}){
        return(
            <li className={toggle?"nav-item slideupin":"nav-item slidedownout"}>
                <Link onClick={linkClick} to ={href} {...props}>{children}</Link>
            </li>
        );
    }

    function RightLink({href, children, ...props}){
        return(
            <li className={toggle?"nav-item slideleftin":"nav-item sliderightout"}>
                <Link onClick={linkClick} to ={href} {...props}>{children}</Link>
            </li>
        );
    }

    return (
        <nav className="navbar">
            <div className="upper-nav">
                <Link to="/" className="nav-brand">
                    Ecommerce
                </Link>  
                <div className="upper-nav-links">
                    <Link className="nav-upper-item" to="/about">About</Link>
                    <Link className="nav-upper-item" to="/support">Support</Link>
                </div>    
                    {isAuthenticated?(
                        <div className="navProfile">
                            <UserOptions user={user}/>
                        </div>
                    ):(
                        <div className="nav-items">
                            <Link className="nav-upper-item" to='/login'>Sign In</Link>
                        </div>                   
                    )}
                <div className={toggle ? "nav-toggler toggle":"nav-toggler"} onClick={navToggle}>
                    <div className='lines'>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <svg  className = {toggle?"nav-toggle-icon fill-nav-toggle":"nav-toggle-icon"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000"/>
                    </svg>
                </div>
            </div>
            <div className={toggle?"lower-nav active-lower-nav":"lower-nav"}>
                    <div className={toggle?"left-nav nav-active":"left-nav"}>
                        <ul className='nav-links'>
                            <LeftLink href ="/">Home</LeftLink>
                            <LeftLink href ="/browse">Browse</LeftLink>
                            <LeftLink href ="/about">About</LeftLink>
                            <LeftLink href ="/login">{isAuthenticated? "Profile" : "Sign In"}</LeftLink>
                            {isAuthenticated && <LeftLink href="/" onClick={()=>{dispatch(logout())}}>Logout</LeftLink>}
                        </ul>
                    </div> 
                    <div className={toggle?"right-nav nav-active":"right-nav"}>
                        <ul className='nav-links'>
                            {isAuthenticated && user.role === "admin" && (
                            <RightLink href ="/admin/dashboard">Dashboard</RightLink>
                            )}
                            <RightLink href ="">Support</RightLink>
                            <div className={toggle?"nav-social-handles slideleftin":"nav-social-handles sliderightout"}>
                                <span className='icons'><FaFacebook /></span>
                                <span className='icons'><FaInstagram /></span>
                                <span className='icons'><FaTwitter /></span>
                            </div>
                        </ul>
                    </div>
            </div>
        </nav>    
    );
}

export default Navbar;