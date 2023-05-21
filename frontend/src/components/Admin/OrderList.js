import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import { clearErrors, deleteOrder, getAllOrders, getOrderDetails } from '../../actions/orderAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { updateOrder } from '../../actions/orderAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const OrderList = () => {
    const dispatch = useDispatch()
    const {error, orders} = useSelector((state)=>state.allOrders)
    const [currentPage, setCurrentPage] = useState(1)
    const {error: deleteError, isDeleted, error: updateError, isUpdated} = useSelector((state)=>state.order)
    const { order, error: orderDetailsError, loading } = useSelector((state) => state.orderDetails);
    const [open, setOpen] = useState(false)
    const [orderStatus, setOrderStatus] = useState("")
    const itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const items = []
    orders&&orders.forEach((item,i)=>{
    items.push(item)
    })
    const currentItems = items.slice(itemOffset, endOffset)
    const pageCount =  Math.ceil(items.length / itemsPerPage)

    const handlePageClick = (event) => {
      const newOffset = ((event-1) * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      setCurrentPage(event)
    };

    const deleteOrderHandler = (id) =>{
      if(loading) return
      dispatch(deleteOrder(id))
    }

    const updateOrderToggle = (id) => {
      if(loading) return
      dispatch(getOrderDetails(id))
      open ? setOpen(false) : setOpen(true);
    };

    const updateOrderHandler = (e) => {
      e.preventDefault();
      if(orderStatus === "" || orderStatus === order.orderStatus){
        setOrderStatus("")
        console.log("yo")
        setOpen(false)
        return
      }

      const myForm = new FormData();

      myForm.set("orderStatus", orderStatus);

      dispatch(updateOrder(order._id, myForm));
      setOrderStatus("")
      setOpen(false)      
    };

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
        }
        if(orderDetailsError){
          dispatch(clearErrors())
        }
        if (updateError) {
          dispatch(clearErrors());
        }
        if (isUpdated) {
          toast.success("Order Updated Successfully");
          dispatch({ type: UPDATE_ORDER_RESET });
        }
        if(isDeleted){
          toast.success("Order Deleted Successfully")
          dispatch({ type : DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders())
    }, [dispatch,error, isDeleted, orderDetailsError, updateError, isUpdated, toast])

  return (
        <div className="listContent">
          <div className="listItemList">
            <div className="listContentHeadings">
              <div>
                <p>ID:</p>
              </div>
              <div>
                <p>Date(Placed)</p>
              </div>
              <div>
                <p>Status</p>
              </div>
              <div>
                <p>Amount:</p>
              </div>
              <div>
                <p>Actions</p>
              </div>
            </div>  
            {currentItems.length !== 0 ? (
              currentItems.map(order=>(
                <div key = {order._id} className="listItems">
                    <div> 
                        <p>{order._id}</p>
                    </div>    
                    <div>
                        <p>{String(order.createdAt).substring(0, 10)}</p>
                    </div>
                    <div>
                        <p style={{color:order.orderStatus === "Processing"?"orange":"limegreen"}}>{order.orderStatus}</p>
                    </div>
                    <div>
                        <p>{order.totalPrice}</p>
                    </div>
                    <div>
                      <CreateIcon onClick={()=>updateOrderToggle(order._id)}/>
                      <DeleteIcon onClick={()=>deleteOrderHandler(order._id)}/>
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
          <Dialog
            aria-labelledby='simple-dialog-title'
            open ={open}
            onClose={()=>{
              setOrderStatus("")
              open ? setOpen(false) : setOpen(true);
            }}
          >
            <DialogTitle className='updateDialogHeading'>Update Order Status</DialogTitle>
            <DialogContent className='updateDialog'>
                  <p>Order Id:</p>
                  <p>{order && order._id}</p>
                  <p>Amount:</p>
                  <p>{order && order.totalPrice}</p>      
                  <p>Date (Ordered):</p>
                  <p>{String(order && order.createdAt).substring(0, 10)}</p>      
                  <p>Status:</p>
                  <select onChange={(e)=>setOrderStatus(e.target.value)} >
                    <option value={order && order.orderStatus} >{order && order.orderStatus}</option>
                    <option value={order && order.orderStatus === "Processing"?"Delivered":"Processing"}>{order && order.orderStatus === "Processing"?"Delivered":"Processing"}</option>
                  </select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={updateOrderHandler} color="primary">
                    Update
                  </Button>
                </DialogActions>
          </Dialog>
        </div>
  )
}

export default OrderList