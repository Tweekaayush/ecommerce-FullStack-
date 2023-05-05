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

const Browse = () => {

    const location = useLocation();
    const [genre, setGenre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000])
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
    const priceHandler = (e, newPrice) =>{
        setPrice(newPrice)
    }

  return (
    <Fragment>
        {loading? <Loader/>: (
            <Fragment>
                <Metadata title={"Browse"}></Metadata>
                <div className='browseContainer'>
                <Header opt="Browse"/>
                <div className={scroll?"browseContent browseContent-active":"browseContent"}>
                    <div className="filterBox">
                        <Typography style={{color:"white", padding:"5px 0",fontSize:"1.5rem"}}> Price </Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={10000}
                        >
                        </Slider>
                        <Typography style={{color:"white", padding:"5px 0",fontSize:"1.5rem"}}> Genres </Typography>
                        <ul className="genreBox">
                            {genres.map((genre)=>(
                                <li className='genreItem' key = {genre.id} onClick={()=>setGenre(genre.name)}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='searchResultBox'>
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