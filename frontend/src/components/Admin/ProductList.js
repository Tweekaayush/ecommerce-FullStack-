import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, getAdminProducts} from "../../actions/productAction"
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const ProductList = ({opt}) => {


    const dispatch = useDispatch()
    const {error, products} = useSelector((state)=>state.products)
    const itemsPerPage = 4
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const items = []
    products&&products.forEach((item,i)=>{
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

        dispatch(getAdminProducts())
    }, [dispatch])

  return (
        <div className={`listContent ${opt}`}>
          <div className="listItemList">
            <div className="listContentHeadings">
              <div>
                <p>ID:</p>
              </div>
              <div>
                <p>Date(Created)</p>
              </div>
              <div>
                <p>Amount:</p>
              </div>
            </div>  
            {currentItems.length !== 0 ? (
              currentItems.map(product=>(
                <div key = {product._id} className="listItems">
                    <div> 
                        <p>{product.name}</p>
                    </div>    
                    <div>
                        <p>{String(product.createdAt).substring(0, 10)}</p>
                    </div>
                    <div>
                        <p>{product.price}</p>
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

export default ProductList