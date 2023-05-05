import React, { Fragment } from 'react'
import Metadata from '../layout/Metadata'
import Header from '../layout/Header/Header'
import CartCard from "./CartCard.js"
import { Link } from 'react-router-dom'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {

    const dispatch = useDispatch()
    const {cartItems} = useSelector((state)=>state.cart)
    console.log(cartItems)

    const deleteCartItems = () =>{
        alert("item deleted")
    }

  return (
    <Fragment>
        <Metadata title="Cart"></Metadata>
        <div className="cartContainer">
            <Header/>
            <div className="cartContainerBox">
                <div className="cartHead">
                    <h1>My Cart</h1>
                </div>
                <div className="cartContents">
                    <div className="cartItems">
                        {
                            cartItems.map((item)=>(
                                <CartCard item = {item} deleteCartItems={deleteCartItems}/>
                            ))
                        }
                    </div>
                    <div className="cartSummary">
                        <div className="cartSummaryHead">
                            <h1>Games and Apps Summary</h1>
                        </div>
                        <div className="cartSummaryItem">
                            <p>Price</p>
                            <p>price-val</p>
                        </div>
                        <div className="cartSummaryItem">
                            <p>Taxes</p>
                            <p>Taxes-val</p>
                        </div>
                        <div className="cartSummaryTotal">
                            <p>SubTotal</p>
                            <p>totalprice</p>
                        </div>
                        <Link to="/" className="cartSummaryButton">CHECK OUT</Link>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Cart