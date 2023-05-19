import React, {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import ConfirmOrderCard from '../Cart/ConfirmOrderCard';
import Loader from '../layout/Loader/Loader';
import "./OrderDetails.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch()
    const {id} = useParams();
    useEffect(()=>{
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id))
    },[dispatch, id, error, alert])

    const refundOrderHandler = ()=>{
        var date = new Date(order.createdAt);
        var cur_date = new Date();
        date.setDate(date.getDate() + 14);
        if(cur_date <= date){
            toast.success("Refund request sent!")
        }else{
            toast.error("Item(s) are not eligible for a refund!")
        }
    }

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
                        <button onClick={refundOrderHandler} className="confirmOrderSummaryButton" disabled={order.orderStatus === "Processing"?true:false}>{order.orderStatus === "Processing"?"Processing":"Refund"}</button>
                    </div>
                </div>
            </div>
        </div>
        )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="colored"
      />
    </Fragment>
  )
}

export default OrderDetails