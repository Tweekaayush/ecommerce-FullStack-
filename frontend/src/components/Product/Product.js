import React, { Fragment, useEffect, Component, useState } from 'react'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import "./Product.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 

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

  return (
    <div className='productContainer'>
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
                <h1 className="price">₹ {product.price}</h1>
                <button>Add to Cart</button>
                <button>Add to Wishlist</button>
                <ul>
                  <li>developer</li>
                  <li>Platform</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Product