import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UserList = () => {

    const dispatch = useDispatch()
    const {error, users} = useSelector((state)=>state.allUsers)
    const {user} = useSelector((state)=>state.user)
    const {error: deleteError, isDeleted, message} = useSelector((state)=>state.profile)
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

    useEffect(()=>{
        if(error){
           dispatch(clearErrors())
        }
        if(deleteError){
          dispatch(clearErrors())
        }
        if(isDeleted){
          alert("User Deleted Successfully")
          dispatch({type:DELETE_USER_RESET})
        }

        dispatch(getAllUsers())
    },[dispatch, error, alert, deleteError, isDeleted])
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
        </div>
  )
}

export default UserList