import React, {Fragment, useEffect, useState } from 'react'
import "./MyOrders.css"
import {useDispatch, useSelector} from "react-redux"
import {myOrders, clearErrors} from "../../actions/orderAction"
import ReactPaginate from 'react-paginate';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MyOrdersListItem from './MyOrdersListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const MyOrders = ({clsname}) => {

  const dispatch = useDispatch()
  const {loading, error, orders} = useSelector((state)=>state.myOrders)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const [itemOffset, setItemOffset] = useState(0);
  const items = []
  orders&&orders.forEach((item,i)=>{
  items.push(item)
  })
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount =  Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
      const newOffset = ((event-1) * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      setCurrentPage(event)
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }

    dispatch(myOrders());
  }, [dispatch, error, toast])

  return (
      <div className={`myOrdersBox ${clsname}`}>
        <div className="myOrdersHead">
            <h1>My Orders</h1>
            <hr className='profileHeadingUnderlines'/>
        </div>
        <div className="myOrdersContent">
          <div className="myOrdersItemList">
            <div className="myOrdersContentHeadings">
              <div>
                <p>ID:</p>
              </div>
              <div>
                <p>Ordered on:</p>
              </div>
              <div>
                <p>Status:</p>
              </div>
              <div>
                <p>Amount:</p>
              </div>
            </div>  
            {currentItems.length !== 0 ? (
              currentItems.map(order=>(
                <MyOrdersListItem order={order}/>
              )))
            :(
              <div className='emptyOrdersDiv'>
                <h1> You haven't Placed any orders yet! </h1>
              </div>
            )
            }
          </div>
          {
            orders && (
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
        </div>
    </div>
  )
}

export default MyOrders