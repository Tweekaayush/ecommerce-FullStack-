import React from 'react'
import "./ConfirmOrderCard.css"
import { Link } from 'react-router-dom'

const ConfirmOrderCard = ({item, deleteCartItems}) => {
  const dev = process.env.REACT_APP_DISCOUNT
  const discount = 75;
  const newPrice = item.price * discount / 100
  
  return (
    <div className="confirmOrderCardContainer">
      <div className="confirmOrderCardImg">
       <Link to={`/product/${item.product}`}>
          <img src={item.image} alt="" />
       </Link>
      </div>
      <div className="confirmOrderCardContent">
        <div className="confirmOrderCardUpperItems">
          <div className="confirmOrderCardUpperItem-l">
              <p>BASE GAME</p>
              <h1>{item.name}</h1>
          </div>
          <div className="confirmOrderCardPrice">
          {dev !== item.developer && (
              <p>₹ {item.price}</p>
            )}
            {dev === item.developer && (
              <>
                <p className="cartPrice-d">₹ {item.price}</p>
                <p className='discountedCartPrice'>₹ {newPrice}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrderCard