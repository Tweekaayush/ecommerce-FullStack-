import React from 'react'
import "./SpecialCard.css"

const SpecialCard = ({product, idx, activeCard, opt}) => {
    const discount = 75;
    const newPrice = product.price * 75 / 100

  return (
    <div onMouseEnter={()=>activeCard(idx)} className={`specialCard ${opt}`}>
        <div className="specialImg">
            <img src={product.background_image} alt="" />
        </div>
        <div className="specialCardContent">
            <h1>{product.name}</h1>
            <h3>{product.platform}</h3>
            <p>{product.genre}</p>
        </div>
        <div className="specialCardPrice">
            <div>
                <p>
                    {discount}%
                </p>
            </div>
            <div>
                <p>₹{product.price}</p>
                <p>₹{newPrice}</p>
            </div>
        </div>
    </div>
  )
}

export default SpecialCard