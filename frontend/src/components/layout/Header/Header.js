import React, {useState, useRef} from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({btnInfo ="Discover"}) => {

    const {isAuthenticated} = useSelector((state)=>state.user)
    const {cartItems} = useSelector((state)=>state.cart)
    const [scroll, setScroll] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [headerDrop, setHeaderDrop] = useState(false)
    const [inputToggle, setInputToggle] = useState(false)
    const inp = useRef(null)

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

    const inputBarToggle = () =>{
        setInputToggle(true)
        inp.current.focus();
        setHeaderDrop(false)
    }

    const headerDropToggle = () =>{
        setHeaderDrop(!headerDrop)
    }

  return (
    <div className={scroll?"homeHeader activeHeader":"homeHeader"}>
        <div className="headerContainer">
            <SearchIcon onClick={inputBarToggle}/>
            <div className={inputToggle?"headerHead headerInput-Toggle":"headerHead"}>
                <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
                    <div className="">
                        <SearchIcon/>
                        <input ref={inp} type="text" value={keyword} onBlur={()=>setInputToggle(false)} onChange={(e)=> setKeyword(e.target.value)} id="" placeholder='Search Store'/>
                        <CloseIcon id="closeInput" onClick={()=>setInputToggle(false)} />
                    </div>
                </form>
            </div>
            <div onClick={headerDropToggle}className='headerDropBtn'>
                    <span>
                        {btnInfo}
                    </span>
                    <div className={headerDrop?"caret caret-active":"caret"}></div>
            </div>
            <div className="headerItems">
                <div className={headerDrop?"leftHeaderItems headerToggle-active":"leftHeaderItems"}>
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