import React from 'react'
import { Link } from 'react-router-dom'
import "./MyOrdersListItem.css"

const MyOrdersListItem = ({order}) => {
  return (
    <Link to = {`/order/${order._id}`} className='myOrderListLink'>
        <div className="myOrdersListItem">
            <div className="myOrdersListId">
                <p>{order._id}</p>
            </div>
            <div className="myOrdersListStatus">
                <p style={{color:order.orderStatus === "Processing"?"orange":"green"}}>{order.orderStatus}</p>
            </div>
            <div className="myOrdersListAmount">
                <p>{order.totalPrice}</p>
            </div>
        </div>
    </Link>
  )
}

export default MyOrdersListItem