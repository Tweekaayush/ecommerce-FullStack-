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
import { Link } from 'react-router-dom';

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
            <div className='resetPasswordContent'>
              <div className="resetPasswordContent-1">
                <div className="resetPasswordContent-1-1">
                  <img src="/mountain1.png" alt="" />
                  <div className="resetPasswordLeft-1">
                    <Link to="/">GameOn</Link>
                  </div>
                  <div className="resetPasswordLeft-2">
                    <h3>Ready to reset your password?</h3>
                    <h1>Reset Password</h1>
                    <hr className='resetPasswordUnderline'/>
                    <p>
                      Secure your account by providing a new password. And keep updating your password to stay safe from password theft.
                    </p>
                  </div>
                </div>
              </div>
              <div className="resetPasswordContent-2">
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
                    <input type="submit" value="Reset" className='resetPasswordBtn'/>
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
          pauseOnFocusLoss
        />
    </Fragment>
  )
}

export default ResetPassword