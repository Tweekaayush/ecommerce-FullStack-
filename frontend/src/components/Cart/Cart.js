import React, { Fragment, useState } from 'react'
import Metadata from '../layout/Metadata'
import Header from '../layout/Header/Header'
import CartCard from "./CartCard.js"
import { Link, useNavigate } from 'react-router-dom'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { removeItemsFromCart } from '../../actions/cartAction'

const Cart = () => {

    const discount = process.env.REACT_APP_DISCOUNT_VAL
    const dev = process.env.REACT_APP_DISCOUNT
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state)=>state.cart)
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate()
    let subTotal = 0
    cartItems.map((item) => {
        subTotal +=(dev === item.developer)?(item.price - (item.price * discount / 100)):item.price
    })

    console.log(cartItems)

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

    const checkOutHandler = () =>{
        navigate("/billing")
    }

  return (
    <Fragment>
        <Metadata title="Cart"></Metadata>
            <div className="cartContainer">
            <Header/>
            {cartItems.length === 0?(
                <div className={scroll?"emptyCartContainer emptyCartContainer-active":"emptyCartContainer"}>
                    <div>
                        <img src="/emptycart.png" alt="" />
                    </div>
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
                            <p>₹ {subTotal}</p>
                        </div>
                        <div className="cartSummaryItem">
                            <p>Taxes</p>
                            <p>Calculated at Checkout</p>
                        </div>
                        <div className="cartSummaryTotal">
                            <p>SubTotal</p>
                            <p>₹ {subTotal}</p>
                        </div>
                        <button onClick={checkOutHandler} className="cartSummaryButton">CHECK OUT</button>
                    </div>
                </div>
            </div>)}
        </div>
    </Fragment>
  )
}

export default Cart