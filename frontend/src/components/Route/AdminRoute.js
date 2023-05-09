import React, { Fragment } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({isAdmin}) => {
    const {loading, isAuthenticated, user} = useSelector((state)=>state.user)
  return (
      (isAuthenticated === true && isAdmin === true && user.role === "admin") ? <Outlet/> : <Navigate to="login"/>
  )
}

export default AdminRoute