import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import { clearErrors, deleteUser, getAllUsers, updateUser } from '../../actions/userAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { getUserDetails } from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const UserList = () => {

    const dispatch = useDispatch()
    const {error, users} = useSelector((state)=>state.allUsers)
    const {user} = useSelector((state)=>state.user)
    const {error: deleteError, isDeleted, message, isUpdated} = useSelector((state)=>state.profile)
    const {loading, error:userDetailsError, user: curUser} = useSelector((state)=>state.userDetails)
    const [currentPage, setCurrentPage] = useState(1)
    const [role, setRole] = useState("")
    const [open, setOpen] = useState(false)
    const itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const items = []
    users&&users.forEach((item,i)=>{
    items.push(item)
    })
    const currentItems = items.slice(itemOffset, endOffset)
    const pageCount =  Math.ceil(items.length / itemsPerPage)

    const deleteUserHandler = (id) =>{
      if(id === user._id){
        toast.error("Admin user cannot be deleted")
        return
      }
        dispatch(deleteUser(id))
    }

    
    const updateUserToggle = (id) => {
      if(id !== user.id){
        dispatch(getUserDetails(id))
      }
      open ? setOpen(false) : setOpen(true);
    };

    const updateUserHandler = (e) => {
      e.preventDefault();
      if(role === "" || role === curUser.role){
        setRole("")
        setOpen(false);
        return
      }
     
      const myForm = new FormData();
  
      myForm.set("name", curUser.name);
      myForm.set("email", curUser.email);
      myForm.set("role", role);
      dispatch(updateUser(curUser._id, myForm))
      setRole("")
      setOpen(false)      
    };

    useEffect(()=>{
        if(error){
           dispatch(clearErrors())
        }
        if(deleteError){
          dispatch(clearErrors())
        }
        if(userDetailsError){
          dispatch(clearErrors())
        }
        if(isDeleted){
          toast.success("User Deleted Successfully")
          dispatch({type:DELETE_USER_RESET})
        }
        if(isUpdated){
          toast.success("User Role Updated Succesfully")
          dispatch({ type: UPDATE_USER_RESET });
        }

        dispatch(getAllUsers())
    },[dispatch, error, alert, deleteError, isDeleted, userDetailsError, isUpdated, toast])

    const handlePageClick = (event) => {
      const newOffset = ((event-1) * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      setCurrentPage(event)
    };

  return (
    <div className={`listContent`}>
          <div className="listItemList">
            <div className="listContentHeadings">
              <div>
                <p>Name</p>
              </div>
              <div>
                <p>Date (Joined)</p>
              </div>
              <div>
                <p>Role</p>
              </div>
              <div className='userdivflex'>
                <p>Email</p>
              </div>
              <div>
                <p>Actions</p>
              </div>
            </div>  
            {currentItems.length !== 0 ? (
              currentItems.map(user=>(
                <div key = {user._id} className="listItems">
                    <div> 
                        <p>{user.name}</p>
                    </div>    
                    <div>
                        <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>
                    <div>
                        <p style={{color:user.role === "user"?"cyan":"limegreen"}}>{user.role}</p>
                    </div>
                    <div className='userdivflex'>
                        <p >{user.email}</p>
                    </div>
                    <div>
                      <CreateIcon onClick={()=>updateUserToggle(user._id)}/>
                      <DeleteIcon onClick={()=>deleteUserHandler(user._id)}/>
                    </div>
                </div> 
              )))
            :(
              <div className='emptylistDiv'>
                <h1> No Products have been added to the Site! </h1>
              </div>
            )
            }
          </div>
          {
            users && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={items.length}
                  onChange={handlePageClick}
                  nextPageText={<KeyboardArrowRightIcon/>}
                  prevPageText={<KeyboardArrowLeftIcon/>}
                  firstPageText={<KeyboardDoubleArrowLeftIcon/>}
                  lastPageText={<KeyboardDoubleArrowRightIcon/>}
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            )
          }
         <Dialog
            aria-labelledby='simple-dialog-title'
            open ={open}
            onClose={()=>{
              setRole("")
              open ? setOpen(false) : setOpen(true);
            }}
            >
              <DialogTitle className='updateDialogHeading'>Update User Role</DialogTitle>
              <DialogContent className='updateDialog'>
                  <p>Name:</p>
                  <p>{curUser.name}</p>
                  <p>Email:</p>
                  <p>{curUser.email}</p>      
                  <p>Role:</p>
                  <select onChange={(e)=>setRole(e.target.value)} >
                    <option value={curUser.role}>{curUser.role}</option>
                    <option value={curUser.role==="admin"?"user":"admin"}>{curUser.role==="admin"?"user":"admin"}</option>
                  </select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={updateUserHandler} color="primary">
                    Update
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
  )
}

export default UserList