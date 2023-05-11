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

const UserList = () => {

    const dispatch = useDispatch()
    const {error, users} = useSelector((state)=>state.allUsers)
    const {user} = useSelector((state)=>state.user)
    const {error: deleteError, isDeleted, message, isUpdated} = useSelector((state)=>state.profile)
    const {loading, error:userDetailsError, user: curUser} = useSelector((state)=>state.userDetails)
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

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const deleteUserHandler = (id) =>{
      if(id === user._id){
        alert("Admin user cannot be deleted")
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

    const updateUserHandler = () => {
      if(role === "" || role === curUser.role){
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
          alert("User Deleted Successfully")
          dispatch({type:DELETE_USER_RESET})
        }
        if(isUpdated){
          alert("User Role Updated Succesfully")
          dispatch({ type: UPDATE_USER_RESET });
        }

        dispatch(getAllUsers())
    },[dispatch, error, alert, deleteError, isDeleted, userDetailsError, isUpdated])
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
              <div>
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
                        <p>{user.role}</p>
                    </div>
                    <div>
                        <p>{user.email}</p>
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

          <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronRightIcon/>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ChevronLeftIcon/>}
            renderOnZeroPageCount={null}
            className="react-paginate"
          />
               <Dialog
                  aria-labelledby='simple-dialog-title'
                  open ={open}
                  onClose={()=>{
                    setRole("")
                    open ? setOpen(false) : setOpen(true);
                  }}
                  >
                    <DialogTitle className='submitDialogHeading'>Update User Role</DialogTitle>
                    <DialogContent className='submitDialog'>

                        <p>{curUser.name}</p>
                        <p>{curUser.email}</p>      
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