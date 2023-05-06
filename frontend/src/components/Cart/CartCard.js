import React from 'react'
import "./CartCard.css"
import { Link } from 'react-router-dom'

const CartCard = ({item, deleteCartItems}) => {
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
            <p>₹ {item.price}</p>
          </div>
        </div>
        <div className="cartCardLowerItems">
          <button>Move to wishlist</button>
          <button onClick={()=>deleteCartItems(item.product)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartCard