import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, forgotPassword } from '../../actions/userAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import "./ForgotPassword.css"
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const {error, message, loading} = useSelector((state)=>state.forgotPassword)
   
  const forgotPasswordSubmit = (e) =>{
      e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);

        dispatch(forgotPassword(myForm))
  }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors());
    }

    if(message){
      toast.success(message)
    }

  }, [dispatch, error, message, alert])

  return (
    <Fragment>
      {loading?<Loader/>:(
        <Fragment>
          <Metadata title="Forgot Password"></Metadata>
      <div className="forgotPasswordContainer">
        <div className='forgotPasswordContent'>
          <div className="forgotPasswordContent-1">
            <div className="forgotPasswordContent-1-1"></div>
          </div>
          <div className="forgotPasswordContent-2">
            <div className="forgotPasswordBox">
              <h1>Forgot Password</h1>
              <form action="" className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                <div className="forgotPasswordEmail">
                <FontAwesomeIcon icon={faEnvelope} />
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="123@gmail.com" required/>
                </div>
                <input type="submit" value="Send" className='forgotPasswordBtn' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
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

export default ForgotPassword