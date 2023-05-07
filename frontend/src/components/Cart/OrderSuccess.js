import React, { Fragment } from 'react'
import Metadata from '../layout/Metadata'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <Fragment>
        <Metadata title="Order Success"></Metadata>
        <div className="orderSuccessContainer">
            <div className="orderSuccessBox">
                <h1>Your Order has been Place Successfully</h1>
                <Link to="/account">view Orders</Link>
            </div>
        </div>
    </Fragment>
  )
}

export default OrderSuccess