import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import { clearErrors, getAllOrders } from '../../actions/orderAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const OrderList = () => {
    const dispatch = useDispatch()
    const {error, orders} = useSelector((state)=>state.allOrders)
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
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
        }
        dispatch(getAllOrders())
    }, [dispatch])

  return (
        <div className={`listContent`}>
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
                        <p>{order.orderStatus}</p>
                    </div>
                    <div>
                        <p>{order.totalPrice}</p>
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

export default OrderList