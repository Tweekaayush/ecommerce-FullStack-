import React from 'react'
import "./ConfirmOrderCard.css"
import { Link } from 'react-router-dom'

const ConfirmOrderCard = ({item, deleteCartItems}) => {
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
            <p>₹ {item.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrderCard