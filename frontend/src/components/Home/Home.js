import React, { Fragment, useEffect} from 'react'
import Metadata from "../layout/metadata"
import "./Home.css"
import {getProducts} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import 'react-multi-carousel/lib/styles.css';
import Slide from "./Slide/Slide"
import GenreCard from "./GenreCard/GenreCard"
import Slider from "react-slick"
const Home = () => {

  const {loading, error, products,productCount} = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:4000
    };
    const multisettings = { 
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
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
    <div className='homeContainer'>
      <div className='homeCarousel'>
        <div className='homeCarouselHeading'>
          <h1>
            Featured and Recommended
          </h1>
        </div>
        <Slider className='slider' {...settings}>
          {products && products.map(product=>(
              <Slide id={product._id} img = {product.background_image} title ={product.name} avail={product.description}/>
          ))}
        </Slider>
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
            <GenreCard/>
            <GenreCard/>
            <GenreCard/>
            <GenreCard/>
        </Slider>
        </div>
      </div>
      <div className='homeRecommendationSection'>
            <h1>Looking for recommendations</h1>
            <p>Sign in to view personalized recommendations</p>
            <button>Sign In</button>
            <p>Or <a href='/'>Sign Up</a> and join Ecommerce for free</p>
      </div>
    </div>
  )
}

export default Home;