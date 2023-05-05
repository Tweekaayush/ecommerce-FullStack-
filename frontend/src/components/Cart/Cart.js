import React, { Fragment, useState } from 'react'
import Metadata from '../layout/Metadata'
import Header from '../layout/Header/Header'
import CartCard from "./CartCard.js"
import { Link } from 'react-router-dom'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { removeItemsFromCart } from '../../actions/cartAction'

const Cart = () => {

    const dispatch = useDispatch()
    const {cartItems} = useSelector((state)=>state.cart)
    const [scroll, setScroll] = useState(false)

    const deleteCartItems = (id) =>{
        dispatch(removeItemsFromCart(id))
    }

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 64) 
            setScroll(true);
        else{
            setScroll(false)
        } 
    });

  return (
    <Fragment>
        <Metadata title="Cart"></Metadata>
            <div className="cartContainer">
            <Header/>
            {cartItems.length === 0?(
                <div className={scroll?"emptyCartContainer emptyCartContainer-active":"emptyCartContainer"}>
                    <RemoveShoppingCartIcon/>
                    <h1>Your cart is empty</h1>
                    <Link to="/">Shop for Games</Link>
                </div>
            ):(
            <div className={scroll?"cartContainerBox cartContainerBox-active":"cartContainerBox"}>
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
                            <p>{`₹${cartItems.reduce((acc, item) => acc + item.price,0)}`}</p>
                        </div>
                        <div className="cartSummaryItem">
                            <p>Taxes</p>
                            <p>Calculated at Checkout</p>
                        </div>
                        <div className="cartSummaryTotal">
                            <p>SubTotal</p>
                            <p>{`₹${cartItems.reduce((acc, item) => acc + item.price,0)}`}</p>
                        </div>
                        <Link to="/" className="cartSummaryButton">CHECK OUT</Link>
                    </div>
                </div>
            </div>)}
        </div>
    </Fragment>
  )
}

export default Cart