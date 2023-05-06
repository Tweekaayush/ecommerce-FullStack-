import React, { Fragment, useState } from 'react'
import "./Billing.css"
import { saveBillingInfo } from '../../actions/cartAction'
import {Country, State} from "country-state-city"
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CheckoutSteps from './CheckoutSteps'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {useNavigate} from "react-router-dom"

const Billing = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { billingInfo } = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user)
    const {name, email} = user
    const [country, setCountry] = useState(billingInfo.country)
    const [pincode, setPincode] = useState(billingInfo.pincode)
    const [phoneNo, setPhoneNo] = useState(billingInfo.phoneNo)
    const [state, setState] = useState(billingInfo.state)

    const billingSubmit = (e) =>{
        e.preventDefault();

        if(phoneNo.length !== 10){
            alert("Phone No length should be 10 digit")
            return
        }
        dispatch(saveBillingInfo({name, email, phoneNo, pincode, country, state}));
        navigate("/order/confirm")
    }

  return (
    <Fragment>
        <Metadata title="Billing Details"></Metadata>
            <CheckoutSteps activeSteps={0}></CheckoutSteps> 
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
                        <PersonIcon/>
                        <input type="text" required value={name} readonly/>
                    </div>
                    <div>
                        <EmailIcon/>
                        <input type="email" required value={email} readonly/>
                    </div>
                    <div>
                        <LocalPhoneIcon/>
                        <input type="number" placeholder="Phone Number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                    </div>
                    <div>
                        <PinDropIcon/>
                        <input type="number" placeholder="Pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)}/>
                    </div>
                    <div>
                        <PublicIcon/>
                        <select 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            <option value="">Country</option>
                            {Country &&
                            Country.getAllCountries().map((item)=>(
                                <option value={item.isoCode} key={item.isoCode}>
                                    {item.name}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                        {country && (
                            <div>
                                <ApartmentIcon/>
                                <select 
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                >
                                    <option value="">State</option>
                                    {Country &&
                                    State.getStatesOfCountry(country).map((item)=>(
                                        <option value={item.isoCode} key={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))
                                    }
                                </select>
                            </div>                         
                        )}

                    <input 
                        type="submit" 
                        value="Continue"
                        className='billingBtn'
                        disabled={state ? false : true}
                    />
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Billing