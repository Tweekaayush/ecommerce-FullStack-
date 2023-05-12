import React, {useEffect, useState } from 'react'
import "./MyOrders.css"
import {useDispatch, useSelector} from "react-redux"
import {myOrders, clearErrors} from "../../actions/orderAction"
import ReactPaginate from 'react-paginate';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MyOrdersListItem from './MyOrdersListItem';


const MyOrders = ({clsname}) => {

  const dispatch = useDispatch()
  const {loading, error, orders} = useSelector((state)=>state.myOrders)

  const itemsPerPage = 4
  const [itemOffset, setItemOffset] = useState(0);
  const items = []
  orders&&orders.forEach((item,i)=>{
  items.push(item)
  })
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount =  Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
  };

  useEffect(()=>{
    if(error){
      alert(error)
      dispatch(clearErrors())
    }

    dispatch(myOrders());
  }, [dispatch, error, alert])

  const Sort = () =>{
    if(currentItems.length !== 0)
      currentItems.sort()
  }

  return (
      <div className={`myOrdersBox ${clsname}`}>
        <div className="myOrdersHead">
            <h1>My Orders</h1>
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
    </div>
  )
}

export default MyOrders