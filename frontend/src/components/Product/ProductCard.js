import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"

const ProductCard = ({ product }) => {

  const dev = process.env.REACT_APP_DISCOUNT
  const discount = 75;
  const newPrice = product.price * discount / 100

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {dev !== product.developer && (
        <span>{`₹${product.price}`}</span>
      )}
      {dev === product.developer && (
        <>
          <div className="browsePrice-d">₹ {product.price}</div>
          <div className='browseDiscountedPrice'>₹ {newPrice}</div>
        </>
      )}
    </Link>
  );
};

export default ProductCard;