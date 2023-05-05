import React from 'react'
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="loader-center">
        <div className="loader-ring"></div>
        <span className='loader-span'>Loading...</span>
      </div>
    </div>
  )
}

export default Loader