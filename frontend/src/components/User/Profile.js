import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./Profile.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from "./UpdatePassword.js"
import Loader from '../layout/Loader/Loader'


const Profile = () => {

  const {isAuthenticated, loading, user} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [orderComponent, setOrderComponent] = useState("rightContent-inactive");
  const [editComponent, setEditComponent] = useState("rightContent-inactive");
  const [passwordComponent, setPasswordComponent] = useState("rightContent-inactive");

  useEffect(()=>{
    if(isAuthenticated === false)
      navigate("/login")

  },[navigate, isAuthenticated])

  const detailsTab = useRef(null);
  const ordersTab = useRef(null);
  const passwordTab = useRef(null);
  const editTab = useRef(null);

  const detailsComp = useRef(null);



  const switcherTab = (e, tab) =>{
    if(tab === "details"){
      detailsTab.current.classList.add("leftProfileContainer-active");
      ordersTab.current.classList.remove("leftProfileContainer-active");
      passwordTab.current.classList.remove("leftProfileContainer-active");
      editTab.current.classList.remove("leftProfileContainer-active");

      detailsComp.current.classList.remove("rightContent-inactive");
      setOrderComponent("rightContent-inactive");
      setPasswordComponent("rightContent-inactive");
      setEditComponent("rightContent-inactive");
    }
    else if(tab ==="orders"){
      detailsTab.current.classList.remove("leftProfileContainer-active");
      ordersTab.current.classList.add("leftProfileContainer-active");
      passwordTab.current.classList.remove("leftProfileContainer-active");
      editTab.current.classList.remove("leftProfileContainer-active");

      detailsComp.current.classList.add("rightContent-inactive");
      setOrderComponent("rightContent-active");
      setPasswordComponent("rightContent-inactive");
      setEditComponent("rightContent-inactive");
    }
    else if(tab ==="password"){
      detailsTab.current.classList.remove("leftProfileContainer-active");
      ordersTab.current.classList.remove("leftProfileContainer-active");
      passwordTab.current.classList.add("leftProfileContainer-active");
      editTab.current.classList.remove("leftProfileContainer-active");

      detailsComp.current.classList.add("rightContent-inactive")
      setOrderComponent("rightContent-inactive");
      setPasswordComponent("rightContent-active");
      setEditComponent("rightContent-inactive");
    }
    else if(tab==="edit"){
      detailsTab.current.classList.remove("leftProfileContainer-active");
      ordersTab.current.classList.remove("leftProfileContainer-active");
      passwordTab.current.classList.remove("leftProfileContainer-active");
      editTab.current.classList.add("leftProfileContainer-active");

      detailsComp.current.classList.add("rightContent-inactive")
      setOrderComponent("rightContent-inactive");
      setPasswordComponent("rightContent-inactive");
      setEditComponent("rightContent-active");

    }
  }

  return (
    <Fragment>
      {loading? "loading":(
        <Fragment>
          <Metadata title={user.name}></Metadata>
        <div className="profileContainer">
          <div className="upperProfile">
            <img src={user.avatar.url} alt={user.name} />
            <h1>
              {user.name}'s Profile
            </h1>
          </div>
          <div className="lowerProfile">
            <div className='leftProfileContainer'>
              <p ref={detailsTab} onClick={(e) => switcherTab(e, "details")} className="leftProfileContainer-active">My Details</p>
              <p ref={ordersTab} onClick={(e) => switcherTab(e, "orders")}>My Orders</p>
              <p ref={passwordTab} onClick={(e) => switcherTab(e, "password")}>Change Password</p>
              <p ref={editTab} onClick={(e) => switcherTab(e, "edit")}>Edit Profile</p>
            </div>
            <div className="rightProfileContainer">
              <div ref={detailsComp} className="detailsContainer">
                <div>
                  <h1>Full Name</h1>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h1>Email</h1>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h1>Joined</h1>
                  <p>{String(user.createdAt)}</p>
                </div>
              </div>
              <UpdateProfile clsname={editComponent} />
              <UpdatePassword clsname={passwordComponent} boolVal={false}/>
            </div>
          </div>
        </div>
    </Fragment>
      )}
    </Fragment>   
  )
}

export default Profile