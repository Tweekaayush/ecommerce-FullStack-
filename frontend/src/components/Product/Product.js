import React, { Fragment, useEffect, Component, useState } from 'react'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import "./Product.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 
import ReviewCard from "./ReviewCard.js"
import {Rating} from "@mui/material"
import Loader from '../layout/Loader/Loader';

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=>state.productDetails);

    useEffect(()=>{
        dispatch(getProductDetails(id));
    }, [dispatch, id])


    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <FontAwesomeIcon
          className={className}
          style={{ ...style, color:"white"}}
          onClick={onClick}
          icon={faAngleRight}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <FontAwesomeIcon
          className={className}
          style={{ ...style, color:"white"}}
          onClick={onClick}
          icon={faAngleLeft}
        />
      );
    }

    const settings = {
      infinite:true,
      autoplay:true,
      autoplaySpeed:3000,
      slidesToShow:1,
      slidesToScroll:1,
      swipeToSlide:true,
      arrows:true,
      nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>
    }

    const settings2 = {
      slidesToShow:3,
      slidesToScroll:1,
      arrows:true,
      swipeToSlide:true,
      focusOnSelect:true,
    }

    const options = {
      value: product.ratings,
      precision:0.5,
      max:5,
      readOnly:true
  }

  return (
    <Fragment>
      {loading? "loading": (<div className='productContainer'>
        <div className='productBox-1'>
          <div className="productBox-1-1">
            <h1>{product.name}</h1>
            <Slider className='productCarousel-1' asNavFor={nav2} ref={(slider1)=>setNav1(slider1)} {...settings}>
                  {
                      product.images && product.images.map((item, i)=>(
                        <img src={item.url} alt="" />  
                      ))
                  }
            </Slider>
            <Slider className='productCarousel-2' asNavFor={nav1} ref={(slider2)=>setNav2(slider2)} {...settings2}>
                  {
                      product.images && product.images.map((item, i)=>(
                        <div className='carouselNavItem'>
                          <img src={item.url} alt="" />  
                        </div>
                      ))
                  }
            </Slider>
          </div>
            <div className="productBox-1-2">
                <img src={product.background_image} alt="" />
                <Rating {...options}/>
                <h1 className="price">₹ {product.price}</h1>
                <button>Add to Cart</button>
                <button>Add to Wishlist</button>
                <ul>
                  <li>developer</li>
                  <li>Platform</li>
                </ul>
            </div>
        </div>
        <div className="productBox-2">
            <div className="productBox-2-1">
              <h1>Description</h1>
              <p>{product.description}</p>
            </div>
            <div className="productBox-2-2">
              <h1>System Requirements</h1>
              <div className="productBox-2-2-1">
                  <div className="productBox-2-2-1-1">
                    <h3>Minimum:</h3>
                    {/* <p>{product.system_requirements.minimum}</p> */}
                  </div>
                  <div className="productBox-2-2-1-2">
                    <h3>Recommended:</h3>
                    {/* <p>{product.system_requirements.recommended}</p> */}
                  </div>
              </div>
            </div>
            <h1 className="reviewsHeading">REVIEWS</h1>
            <div className="productBox-2-3">
              <div className="productBox-2-3-1">
                  <h1>Overall Reviews</h1>
                  <Rating {...options}/>
                  <p>{product.numOfReviews}</p>
                  <button>Write a Review</button>
              </div>
              <div className="productBox-2-3-2">
                {product.reviews && product.reviews[0] ?(
                  <div className="reviews">
                    {product.reviews && product.reviews.map((review)=> <ReviewCard review={review}/>)}
                  </div>
                ): (
                  <p className="noReviews">No Reviews Yet</p>
                )}
              </div>
            </div>
        </div>
    </div>)}
    </Fragment>
  )
}

export default Product