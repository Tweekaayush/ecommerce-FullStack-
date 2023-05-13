import React, {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import ConfirmOrderCard from '../Cart/ConfirmOrderCard';
import Loader from '../layout/Loader/Loader';
import "./OrderDetails.css"

const OrderDetails = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch()
    const {id} = useParams();
    console.log(order)
    useEffect(()=>{
        if (error) {
            alert(error);
            dispatch(clearErrors());
          }
        dispatch(getOrderDetails(id))
    },[dispatch, id, error, alert])

  return (
    <Fragment>
        {loading?(<Loader/>):(
            <div className="orderDetailsContainer">
            <div className="orderDetailsBox">
                <div className="orderDetailsBox-l">
                    <div className="orderDetailsBillingDetails">
                        <div className='orderDetailsHead'>
                            <h1>Order Details</h1>
                        </div>
                        <div className="orderInfo">
                            <div>
                                <p>Order Id:</p>
                                <span>{order && order._id}</span>
                            </div>
                            <div>
                                <p>Name:</p>
                                <span>{order.billingInfo && order.billingInfo.name}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{order.billingInfo && order.billingInfo.email}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{order.billingInfo && order.billingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Location:</p>
                                <span>{`${order.billingInfo && order.billingInfo.state}, ${order.billingInfo && order.billingInfo.country} (${order.billingInfo && order.billingInfo.pincode})`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsItemsBox">
                        <div className="orderDetailsItemsHead">
                            <h1>Your Order Items</h1>
                        </div>
                        <div className='orderDetailsItems'>
                            {   order.orderItems &&
                                order.orderItems.map((item)=>(
                                    <ConfirmOrderCard item = {item}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="orderDetailsBox-r">
                    <div className="orderDetailsSummary">
                        <div className="orderDetailsSummaryHead">
                            <h1>Order Summary</h1>
                        </div>
                        <div className="orderDetailsSummaryItem">
                            <p>SubTotal</p>
                            <p>₹ {order.itemsPrice && order.itemsPrice}</p>
                        </div>
                        <div className="orderDetailsSummaryItem">
                            <p>Taxes</p>
                            <p>₹ {order.taxPrice && order.taxPrice}</p>
                        </div>
                        <div className="orderDetailsSummaryTotal">
                            <p>Total</p>
                            <p>₹ {order.totalPrice && order.totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </Fragment>
  )
}

export default OrderDetails