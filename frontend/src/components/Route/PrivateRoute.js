import React, { Fragment } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({isAdmin}) => {
    const {loading, isAuthenticated, user} = useSelector((state)=>state.user)
  return (
    <Fragment>
        {loading === false && (
            isAuthenticated === true ? <Outlet/> : <Navigate to="login"/>
        )}
    </Fragment>
  )
}

export default PrivateRoute