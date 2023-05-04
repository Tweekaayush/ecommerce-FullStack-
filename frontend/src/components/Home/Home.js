import React, { Fragment, useEffect, useState} from 'react'
import Metadata from "../layout/Metadata"
import "./Home.css"
import {getProducts} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import 'react-multi-carousel/lib/styles.css';
import Slide1 from "./Slide/Slide1"
import Slide2 from "./Slide/Slide2"
import GenreCard from "./GenreCard/GenreCard"
import Slider from "react-slick"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header"


const Home = () => {
  const {isAuthenticated, user} = useSelector((state)=>state.user)
  const {loading, error, products,productCount} = useSelector((state)=>state.products);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const dispatch = useDispatch();

  const [scroll, setScroll] = useState(false);
  const [keyword, setKeyword] = useState("");

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 64) 
            setScroll(true);
        else{
            setScroll(false)
        } 
    });

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

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
    const hslide= {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:5000,
      prevArrow:<SamplePrevArrow/>,
      nextArrow:<SampleNextArrow/>,
      adaptiveHeight:true
    }
    const vslide={
      arrows:false,
      slidesToShow: 4,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      focusOnSelect:true,
    }
    const multisettings = { 
      speed: 500,
      arrows:true,
      responsive: [
        {
          breakpoint:5000,
          settings: {
            arrows:true,
            slidesToShow:4,
            slidesToScroll:4 
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <Fragment>
      {loading? "loading":(<Fragment>
        <Metadata title="Ecommerce"></Metadata>
        <div className='homeContainer'>
          <Header/>
          <div className={scroll?"homeCarouselBox homeCarouselBox-active":"homeCarouselBox"}>
            <div className='homeCarouselHeading'>
              <h1>
                Featured and Recommended
              </h1>
            </div>
            <div className='homeCarousel'>
              <Slider className='homeCarouselSlider-1' asNavFor={nav2} ref={(slider1)=>setNav1(slider1)} {...hslide}>
                {products && products.map(product=>(
                    <Slide1 id={product._id} img = {product.background_image} title ={product.name} price={product.price}/>
                ))}
              </Slider>
              <Slider className='homeCarouselSlider-2'asNavFor={nav1} ref={(slider2)=>setNav2(slider2)} {...vslide}>
                {products && products.map(product=>(
                  <Slide2 id={product._id} img = {product.background_image} title ={product.name} avail={product.description}/>
                ))}
              </Slider>
            </div>
          </div>
        <div className="homeBrowseByCategory">
          <div className='homeBrowseHeading'>
            <h1>
              Browse by Category
            </h1>
          </div>
          <div className='homeBrowseCarousel'>
          <Slider {...multisettings}>
              <GenreCard/>
              <GenreCard/>
              <GenreCard/>
              <GenreCard/>
          </Slider>
          </div>
        </div>
        <div className={isAuthenticated?"homeRecommendationSection homeRecommendationSection-active":"homeRecommendationSection"}>
              <h1>Looking for recommendations</h1>
              <p>Sign in to view personalized recommendations</p>
              <a href="/login" className='btn'>Sign In</a>
              <p>Or <a href='/login'>Sign Up</a> and join Ecommerce for free</p>
        </div>
      </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default Home;