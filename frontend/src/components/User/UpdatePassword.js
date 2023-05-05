import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { clearErrors, updatePassword } from '../../actions/userAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope, faLockOpen, faLock, faKey} from "@fortawesome/free-solid-svg-icons"
import "./UpdatePassword.css"

const UpdatePassword = ({clsname}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {error, passIsUpdated, loading} = useSelector((state)=>state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
      }

        useEffect(()=>{
            if (error) {
                alert(error);
                dispatch(clearErrors());
              }
    
            if(passIsUpdated){
                alert("Password updated")
                
                navigate("/account")
            
                dispatch({
                    type: UPDATE_PASSWORD_RESET
                })
            }
          },[dispatch, passIsUpdated, alert, navigate])

  return (
    <Fragment>
    <div className={`updatePasswordBox ${clsname}`}>
        <div className="updatePasswordHead">
            <h1>Change Password</h1>
        </div>
        <form
        className='updatePasswordForm'
        onSubmit={updatePasswordSubmit}
        >
        <div className="oldUpdatePassword">
            <FontAwesomeIcon icon={faKey} />
            <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder="Old Password" required/>
        </div>
        <div className="newUpdatePassword">
            <FontAwesomeIcon icon={faLock} />
            <input type="password" name="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="New Password" required/>
        </div>
        <div className="confirmPassword">
            <FontAwesomeIcon icon={faLockOpen} />
            <input type="password" name="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Passowrd" required/>
        </div>
        <input type="submit" value="Change" className='updatePasswordBtn'/>
    </form>
</div>
</Fragment>
  )
}

export default UpdatePassword