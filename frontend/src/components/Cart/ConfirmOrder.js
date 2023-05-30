import React, { Fragment } from 'react'
import {useSelector} from "react-redux"
import Metadata from "../layout/Metadata"
import CheckoutSteps from './CheckoutSteps'
import "./ConfirmOrder.css"
import { useNavigate } from 'react-router-dom'
import ConfirmOrderCard from "./ConfirmOrderCard.js"

const ConfirmOrder = () => {

    const dev = process.env.REACT_APP_DISCOUNT
    const discount = process.env.REACT_APP_DISCOUNT_VAL;
    const navigate = useNavigate()
    const {billingInfo, cartItems} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    let subTotal = 0
    cartItems.map((item) => {
        subTotal +=(dev === item.developer)?(item.price - (item.price * discount / 100)):item.price
    })
    let tax = (subTotal * 0.18)
    tax = (Number)(tax.toFixed(2))
    const totalPrice = subTotal + tax
    const address = `${billingInfo.state}, ${billingInfo.country} (${billingInfo.pincode})`

    const confirmOrderHandler = () =>{
        const data = {
            subTotal,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate("/process/payment")
    }

  return (
    <Fragment>
        <Metadata title="Confirm Order"></Metadata>
        <CheckoutSteps activeSteps={1}/>
        <div className="confirmOrderContainer">
            <div className="confirmOrderBox">
                <div className="confirmOrderBox-l">

                    <div className="confirmOrderBillingDetails">
                        <div className='billingDetailsHead'>
                            <h1>Billing Details</h1>
                        </div>
                        <div className="confirmBillingsInfo">
                            <div>
                                <p>Name:</p>
                                <span>{billingInfo.name}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{billingInfo.email}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{billingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Location:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmOrderItemsBox">
                        <div className="confirmOrderItemsHead">
                            <h1>Your Cart Items</h1>
                        </div>
                        <div className='confirmOrderItems'>
                            {
                                cartItems.map((item)=>(
                                    <ConfirmOrderCard item = {item}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="confirmOrderBox-r">
                    <div className="confirmOrderSummary">
                        <div className="confirmOrderSummaryHead">
                            <h1>Games and Apps Summary</h1>
                        </div>
                        <div className="confirmOrderSummaryItem">
                            <p>SubTotal</p>
                            <p>₹ {subTotal}</p>
                        </div>
                        <div className="confirmOrderSummaryItem">
                            <p>Taxes</p>
                            <p>₹ {tax}</p>
                        </div>
                        <div className="confirmOrderSummaryTotal">
                            <p>Total</p>
                            <p>₹ {totalPrice}</p>
                        </div>
                        <button onClick={confirmOrderHandler} className="confirmOrderSummaryButton">Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder