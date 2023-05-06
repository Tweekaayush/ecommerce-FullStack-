import React, {useState} from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {

    const {isAuthenticated} = useSelector((state)=>state.user)
    const {cartItems} = useSelector((state)=>state.cart)
    const [scroll, setScroll] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 64) 
            setScroll(true);
        else if(window.scrollY <= 64){
            setScroll(false)
        } 
    });
    function searchSubmitHandler(e){
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/browse/${keyword}`)
        }else{
            navigate("/browse")
        }
    }
  return (
    <div className={scroll?"homeHeader activeHeader":"homeHeader"}>
        <div className="headerContainer">
            <div className="headerHead">
                <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
                    <div className="">
                        <SearchIcon/>
                        <input type="text" value={keyword} onChange={(e)=> setKeyword(e.target.value)} id="" placeholder='Search Store'/>
                    </div>
                </form>
            </div>
            <div className="headerItems">
                <div className="leftHeaderItems">
                    <Link to="/" className="headerItem">Discover</Link>
                    <Link to="/browse" className="headerItem">Browse</Link>
                </div>
                {isAuthenticated && (
                <div className="rightHeaderItems">
                    <span>
                        <Link to="/cart" className="headerItem">
                            Cart
                        </Link>
                        <Link to="/cart"><ShoppingCartIcon/></Link>
                        {cartItems.length?(
                                <span className='cartItemIndicator'>
                                    {cartItems.length}
                                </span>
                        ):""}
                    </span>
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header