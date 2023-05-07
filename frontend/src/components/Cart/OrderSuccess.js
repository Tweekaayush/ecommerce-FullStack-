import React, { Fragment } from 'react'
import Metadata from '../layout/Metadata'
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
  return (
    <Fragment>
        <Metadata title="Order Success"></Metadata>
        <div className="orderSuccessContainer">
            <CheckCircleIcon/>
            <h1>Your Order has been Place Successfully</h1>
            <Link to="/account">View Orders</Link>
        </div>
    </Fragment>
  )
}

export default OrderSuccess