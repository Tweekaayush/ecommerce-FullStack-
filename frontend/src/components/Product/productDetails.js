import React, { Fragment } from 'react'
import Carousel from 'react-multi-carousel'
import "./productDetails.css"

const productDetails = () => {
  return (
    <Fragment>
        <div className='productDetails'>
            <div>
                <Carousel>
                    {product.images && product.images.map(item, i)=>(
                        <img key={item.url} src={item.url} alt={`${i} Slide`}/>
                    )}
                </Carousel>
            </div>
        </div>
    </Fragment>
  )
}

export default productDetails