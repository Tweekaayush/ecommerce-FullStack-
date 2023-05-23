import React from 'react'
import {useNavigate} from "react-router-dom"
import "./SpecialCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindows, faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'

const SpecialCard = ({product, idx, activeCard, opt}) => {

    const dev = process.env.REACT_APP_DISCOUNT
    const discount = 75;
    const newPrice = product.price * 75 / 100
    const navigate = useNavigate()
    const nav = ()=>{
        navigate(`/product/${product._id}`)
    }


    const icons = (i)=>{
        switch(i){
            case "Pc": return <FontAwesomeIcon icon={faWindows}/>
            case "Ps": return <FontAwesomeIcon icon={faPlaystation} />
            case "Xbox": return <FontAwesomeIcon icon={faXbox} />
        }
    }
    

  return (
    <div onClick={nav} onMouseEnter={()=>activeCard(idx)} className={`specialCard ${opt}`}>
        <div className="specialImg">
            <img src={product.background_image} alt="" />
        </div>
        <div className="specialCardContent">
            <h1>{product.name}</h1>
            {icons(product.platform)}
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