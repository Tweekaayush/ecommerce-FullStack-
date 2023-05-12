import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { clearErrors, loadUser, resetPassword } from '../../actions/userAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope, faLockOpen, faLock, faKey} from "@fortawesome/free-solid-svg-icons"
import "./ResetPassword.css"
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams()

    const {error, success, loading} = useSelector((state)=>state.forgotPassword)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm))
      }

        useEffect(()=>{
            if (error) {
                toast.error(error)
                dispatch(clearErrors());
              }
    
            if(success){
                toast.success("Password updated")
                dispatch(loadUser())
                navigate("/account")
            }

          },[dispatch, error, success, navigate, toast])

  return (
    <Fragment>
      {loading? <Loader/>:(
        <Fragment>
        <Metadata title="Reset Password"></Metadata>
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
              <h1>Reset Password</h1>
              <form
              className='resetPasswordForm'
              onSubmit={resetPasswordSubmit}
              >
                <div className="oldResetPassword">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                </div>
                <div className="newResetPassword">
                    <FontAwesomeIcon icon={faLockOpen} />
                    <input type="password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Passowrd" required/>
                </div>
                <input type="submit" value="Send" className='resetPasswordBtn'/>
              </form>
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
          pauseOnFocusLoss
        />
    </Fragment>
  )
}

export default ResetPassword