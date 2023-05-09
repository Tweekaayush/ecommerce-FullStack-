import React, { Fragment, useEffect, useState } from 'react'
import "./Browse.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Header from "../layout/Header/Header"
import ProductCard from './ProductCard'
import { useParams, useLocation } from 'react-router-dom'
import Pagination from "react-js-pagination"
import { Slider, Typography } from '@mui/material'
import { genres } from '../../genrelist'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import CloseIcon from '@mui/icons-material/Close';

const Browse = () => {

    const location = useLocation();
    const sbg = location.state ? location.state.genre : ""
    const [genre, setGenre] = useState(sbg);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000])
    const [sliderVal, setSliderVal] = useState([0, 10000])
    const dispatch = useDispatch();
    const {products ,loading, error, productCount, resultPerPage, filteredProductsCount}  = useSelector((state)=>state.products);
    const {keyword} = useParams();
    const [scroll, setScroll] = useState(false);
    let count = filteredProductsCount

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 64) 
            setScroll(true);
        else{
            setScroll(false)
        } 
    });

    useEffect(()=>{  
        dispatch(getProducts(keyword, currentPage, price, genre));
    }, [dispatch, keyword, currentPage, price, genre])

    const setCurrentPageNo = (e) =>{
        setCurrentPage(e)
    }
    const priceHandler = (e) =>{
        setPrice(sliderVal)
    }

  return (
    <Fragment>
        {loading? <Loader/>: (
            <Fragment>
                <Metadata title={"Browse"}></Metadata>
                <div className='browseContainer'>
                <Header btnInfo="Browse"/>
                <div className={scroll?"browseContent browseContent-active":"browseContent"}>
                    <div className="filterBox">
                        <h1>Filter</h1>
                        <div className="filterContent">
                            <div>
                                <h1>Price</h1>
                                <Slider
                                value={sliderVal}
                                onChange={(e)=>setSliderVal(e.target.value)}
                                onChangeCommitted={priceHandler}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                min={0}
                                max={10000}
                                >
                                </Slider>
                            </div>
                            <div>
                                <h1>Genre</h1>
                                <div className="genreBox">
                                    <div onClick={()=>setGenre("")} className="genreBtn">
                                        <p>
                                            {genre}
                                        </p>
                                        <CloseIcon/>
                                    </div>
                                    <div className="genreList">    
                                        {genres.map((genre)=>(
                                            <p className='genreItem' key = {genre.id} onClick={()=>setGenre(genre.name)}>{genre.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='searchResultBox'>
                        <h1>Games :</h1>
                        <div className="searchResults">
                            {count? products.map((product)=>(
                                <ProductCard key={product._id} product={product}/>
                            )):<p className='noProducts'>No Results Found</p>}
                        </div>

                        {resultPerPage < count && (
                        <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                        </div>
                        )}
                    </div>
                </div>
            </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Browse