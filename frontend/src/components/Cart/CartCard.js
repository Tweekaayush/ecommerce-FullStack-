import React from 'react'
import "./CartCard.css"
import { Link } from 'react-router-dom'

const CartCard = ({item, deleteCartItems}) => {
  const dev = process.env.REACT_APP_DISCOUNT
  const discount = process.env.REACT_APP_DISCOUNT_VAL;
  const newPrice = item.price - (item.price * discount / 100)

  return (
    <div className="cartCardContainer">
      <div className="cartCardImg">
       <Link to={`/product/${item.product}`}>
          <img src={item.image} alt="" />
       </Link>
      </div>
      <div className="cartCardContent">
        <div className="cartCardUpperItems">
          <div className="cartCardUpperItem-l">
              <p>BASE GAME</p>
              <h1>{item.name}</h1>
          </div>
          <div className="cartCardPrice">
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
        <div className="cartCardLowerItems">
          <button onClick={()=>deleteCartItems(item.product)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartCard