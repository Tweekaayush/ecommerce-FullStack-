import React from 'react'
import "./RecommdationCard.css"
import { Link } from 'react-router-dom'

const RecommendationCard = ({product}) => {

    const dev = process.env.REACT_APP_DISCOUNT
    const discount = process.env.REACT_APP_DISCOUNT_VAL;
    const newPrice = product.price - (product.price * discount / 100)

  return (
    <Link className="recommendationProductCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {dev !== product.developer && (
        <span>{`₹${product.price}`}</span>
      )}
      {dev === product.developer && (
        <>
          <div className="recommendationPrice-d">₹ {product.price}</div>
          <div className='recommendationDiscountedPrice'>₹ {newPrice}</div>
        </>
      )}
    </Link>
  )
}

export default RecommendationCard