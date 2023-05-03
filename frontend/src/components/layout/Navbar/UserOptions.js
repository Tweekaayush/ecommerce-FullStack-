import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate} from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';
import "./UserOptions.css"


const UserOptions = ({user}) => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const options = [
    {
      icon:<PersonIcon/>,
      name:"Profile",
      func: account
    },
    {
      icon:<ExitToAppIcon/>,
      name:"Logout",
      func: logoutUser
    }
  ]

  if(user.role === "admin"){
    options.unshift({
        icon:<DashboardIcon/>,
        name:"Dashboard",
        func: dashboard
    })
  }
  console.log(user.role)
  function dashboard(){
    navigate("/dashboard");
  }
  function account(){
    navigate("/account")
  }
  function logoutUser(){
    dispatch(logout());
  }


  return (
    <Fragment>
        <SpeedDial
        className='speedDial'
        ariaLabel='SpeedDial'
        sx={{ '& .MuiFab-primary': { width: 43, height: 43 }}}
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={<img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
        />
      }
        direction="down"
        >
          {
            options.map((option)=>(
              <SpeedDialAction sx={{width:35, height: 35}} key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.func}></SpeedDialAction>
            ))
          }
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions