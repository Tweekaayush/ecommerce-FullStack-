import React, { Fragment, useEffect } from 'react'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=>state.productDetails);

    useEffect(()=>{
        dispatch(getProductDetails(id));
    }, [dispatch, id])
  return (
    <Fragment>
        <div>
            <Slider>
                {
                    product.images && product.images.map((item, i)=>(
                      <img src={item.url} alt="" />  
                    ))
                }
            </Slider>
        </div>
    </Fragment>
  )
}

export default Product