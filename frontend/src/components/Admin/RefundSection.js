import React from 'react'
import { Link } from 'react-router-dom'
import "./RefundSection.css"

const RefundSection = () => {
  return (
    <div className="refundContainer">
        <div className="refundContent">
            <div className="refundContentBox">
                <div className="dashboardHeading">
                    <h1 className='dashboardAllHeadings'>Refund Requests</h1>
                    <hr className='dashboardHeadingUnderline'/>
                </div>
                <div className="listItemList">
                    <div className="listContentHeadings">
                        <div>
                            <p>ID:</p>
                        </div>
                        <div>
                            <p>Date(Created)</p>
                        </div>
                        <div>
                            <p>Amount:</p>
                        </div>
                        <div>
                            <p>Actions</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backTrackLink">
                <Link to="/admin/dashboard">return to Dashboard</Link>
            </div>
        </div>
    </div>
  )
}

export default RefundSection