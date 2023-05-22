import React from 'react'
import {useNavigate} from "react-router-dom"
import "./SpecialCard.css"

const SpecialCard = ({product, idx, activeCard, opt}) => {

    const dev = process.env.REACT_APP_DISCOUNT
    const discount = 75;
    const newPrice = product.price * 75 / 100
    const navigate = useNavigate()
    const nav = ()=>{
        navigate(`/product/${product._id}`)
    }

  return (
    <div onClick={nav} onMouseEnter={()=>activeCard(idx)} className={`specialCard ${opt}`}>
        <div className="specialImg">
            <img src={product.background_image} alt="" />
        </div>
        <div className="specialCardContent">
            <h1>{product.name}</h1>
            <h3>{product.platform}</h3>
            <p>{product.genre}</p>
        </div>
        {dev === product.developer && (
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
        )}
        {dev !== product.developer && (
            <div className="normalCardPrice">
                <p>₹{product.price}</p>
            </div>
        )}    
    </div>
  )
}

export default SpecialCard