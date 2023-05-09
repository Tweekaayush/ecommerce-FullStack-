import React, { useRef } from 'react'
import "./Sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GamesIcon from '@mui/icons-material/Games';
import { Link } from 'react-router-dom';

const Sidebar = ({switcherTab}) => {

  return (
    <div className="sidebarContainer">
            <Link to="/">
                <div>
                    <HomeIcon/>
                    <p>Home</p>
                </div>
            </Link>
            <div onClick={()=>switcherTab("dashboard")}>
                <DashboardIcon/>
                <p>Dashboard</p>
            </div>
            <div onClick={()=>switcherTab("products")}>
                <GamesIcon/>
                <p>Products</p>
            </div>
            <div onClick={()=>switcherTab("orders")}>
                <ListAltIcon/>
                <p>Orders</p>
            </div>
            <div onClick={()=>switcherTab("users")}>
                <GroupIcon/>
                <p>Users</p>
            </div>
        </div>
  )
}

export default Sidebar