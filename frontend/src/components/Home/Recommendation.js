import React, { useState,useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendedProducts } from '../../actions/productAction'
import RecommendationCard from "./RecommendationCard"
import Slider from "react-slick"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import "./Recommendation.css"
import { getUserDetails } from '../../actions/userAction'

const Recommendation = ({products}) => {

    const dispatch = useDispatch()
    const {isAuthenticated, user, loading} = useSelector((state)=>state.user)
    const {recomProducts} = useSelector((state)=>state.recomProducts)
    const [genre, setGenre] = useState("")
    const [f, setF] = useState(0)

    useEffect(()=>{  

        if(isAuthenticated && user.recommendations && user.recommendations.length !==0 && f === 0){
            setGenre(user.recommendations[0].genre)
            setF(1)
        }

        dispatch(getRecommendedProducts(genre));

    }, [dispatch, genre, user])

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

    const multisettings = { 
        speed: 500,
        arrows:true,
        prevArrow:<SamplePrevArrow/>,
        nextArrow:<SampleNextArrow/>,
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
        {isAuthenticated && user.recommendations && user.recommendations.length !== 0 && (
        <div className="productRecommendationContainer">
            <div className='homeBrowseHeading'>
            <h1>
                Based on your Prferences...
            </h1>
            </div>
            <div className='homeBrowseCarousel'>
            <Slider {...multisettings}>
                    {recomProducts && recomProducts.map((prod)=>(
                        <RecommendationCard key = {prod.id} product = {prod}/>
                        ))}
            </Slider>
            </div>
        </div>
    )}
    </Fragment>
  )
}

export default Recommendation