import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import { clearErrors, getAllUsers } from '../../actions/userAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const UserList = () => {

    const dispatch = useDispatch()
    const {error, users} = useSelector((state)=>state.allUsers)
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

    useEffect(()=>{
        if(error){
           dispatch(clearErrors())
        }
        dispatch(getAllUsers())
    },[dispatch, error])
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
                      <CreateIcon/>
                    </div>
                    <div>
                      <DeleteIcon/>
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