import React, { Fragment } from 'react'
import {useSelector} from "react-redux"
import Metadata from "../layout/Metadata"
import CheckoutSteps from './CheckoutSteps'
import "./ConfirmOrder.css"
import CartCard from './CartCard'

const ConfirmOrder = () => {

    const {billingInfo, cartItems} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    const subTotal = cartItems.reduce((acc, item) => acc + item.price,0)
    const tax = subTotal * 0.18
    const total = subTotal + tax
    const address = `${billingInfo.state}, ${billingInfo.country} (${billingInfo.pincode})`

    const confirmOrderHandler = () =>{

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
                                <p>Name</p>
                                <span>{billingInfo.name}</span>
                            </div>
                            <div>
                                <p>Email</p>
                                <span>{billingInfo.email}</span>
                            </div>
                            <div>
                                <p>Phone</p>
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
                            <h1>Your Items</h1>
                        </div>
                        <div className='confirmOrderItems'>
                            {
                                cartItems.map((item)=>(
                                    <CartCard item = {item}/>
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
                            <p>{subTotal}</p>
                        </div>
                        <div className="confirmOrderSummaryItem">
                            <p>Taxes</p>
                            <p>{tax}</p>
                        </div>
                        <div className="confirmOrderSummaryTotal">
                            <p>Total</p>
                            <p>{total}</p>
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