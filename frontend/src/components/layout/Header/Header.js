import React, {useState} from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
                    <a href="" className="headerItem">Discover</a>
                    <a href="" className="headerItem">Browse</a>
                </div>
                <div className="rightHeaderItems">
                    <a href="" className="headerItem">Wishlist</a>
                    <a href="" className="headerItem">Cart</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header