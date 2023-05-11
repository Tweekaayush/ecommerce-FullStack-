import React, { Fragment, useEffect, useRef } from 'react'
import "./Payment.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import Metadata from '../layout/Metadata'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {clearErrors, createOrder} from "../../actions/orderAction"

const Payment = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const payBtn = useRef(null)
  const stripe = useStripe()
  const elements = useElements()
  const {billingInfo, cartItems} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.user)
  const {error} = useSelector((state)=>state.newOrder)
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }
  const order = {
    billingInfo,
    orderItems : cartItems, 
    itemsPrice: orderInfo.subTotal, 
    taxPrice:orderInfo.tax,  
    totalPrice:orderInfo.totalPrice
  }


  const submitPaymentHandler = async(e) => {
    e.preventDefault();
    payBtn.current.disable = true
    try{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const {data} = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      )

      const client_secret = data.client_secret;

      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card: elements.getElement(CardNumberElement),
          billing_details:{
            name: billingInfo.name,
            email: billingInfo.email,
            address:{
              state: billingInfo.state,
              country: billingInfo.country,
              postal_code: billingInfo.pincode
            }
          }
        }
      })

      if(result.error){
        payBtn.current.disable = false
        alert(result.error.message)
      }else{
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo={
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          dispatch(createOrder(order))
          navigate("/success")
          localStorage.clear()
        }else{
          alert("There was some issue while processing your payment")
        }
      }

    }catch(error){
      payBtn.current.disable = false
      alert(error.response.data.message)
    }
  }

  useEffect(()=>{
    if(error){
      alert(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <Metadata title="Payment"/>
      <CheckoutSteps activeSteps={2}/>
      <div className="paymentContainer">
        <div className="paymentBox">
            <form className="paymentForm" onSubmit={submitPaymentHandler}>
              <h1 className="paymentHead">Card Details</h1>
              <div>
                <CardNumberElement className='paymentInput'/>
              </div>
              <div>
                <CardExpiryElement className='paymentInput' />
              </div>
              <div>
                <CardCvcElement className='paymentInput'/>
              </div>
              <input type="submit" value={`Pay ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn' />
            </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Payment