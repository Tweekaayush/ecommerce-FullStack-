import React, { Fragment, useState } from 'react'
import "./Billing.css"
import { saveBillingInfo } from '../../actions/cartAction'
import {Country, State} from "country-state-city"
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'

const Billing = () => {

    const dispatch = useDispatch();
    const { billingInfo } = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user)
    const {name} = user
    const [country, setCountry] = useState(billingInfo.country)
    const [pincode, setPincode] = useState(billingInfo.pincode)
    const [phoneNo, setPhoneNo] = useState(billingInfo.phoneNo)
    const [state, setState] = useState(billingInfo.state)

    const billingSubmit = () =>{
        
    }

  return (
    <Fragment>
        <Metadata title="Billing"></Metadata>
        <div className="billingContainer">
            <div className="billingBox">
                <div className="billingHead">
                    <h1>Billing Details</h1>
                </div>
                <form
                className='billingInfo'
                encType='multipart/form-data'
                onSubmit={billingSubmit}
                >
                    <div>
                        <input type="text" required value={name} readonly/>
                    </div>
                    <div>
                        <input type="text" placeholder="Country" required value={country} onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                    <div>
                    <input type="text" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)}/>
                    </div>
                    <div>
                        <input type="number" placeholder="Pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)}/>
                    </div>
                    <div>
                        <input type="" placeholder="Phone Number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                    </div>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Billing