import React, { useState, useEffect } from 'react'
import "./Specials.css"
import SpecialCard from './SpecialCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'

const Specials = ({products}) => {

    const [prodNo, setProdNo] = useState(0)
    const [startIdx, setStartIdx] = useState(0)
    const [endIdx, setEndIdx] = useState(1)
    const [active, setActive] = useState(0)
    const [ht, setHt] = useState(0)

    const activeCard = (i) =>{
        setStartIdx(i)
        setEndIdx(i+1)
        setActive(i)
        setHt(i)
    }

    const style = {
        transform: `translateY(${ht* 5.3}rem)`,
        marginTop: "2.85rem"
    }

  return (
    <div className="specialsContainer">
        <div className="specialsHeading">
            <h1>Specials</h1>
        </div>
        <div className="specialsContentBox">
            <div className="specialsContent">
                <div className="specialsList">
                    <div className="specialsListHead">
                        <p>see more:</p>
                        <a href="/">Specials</a>
                    </div>
                    {products && products.map((item, i)=>(
                        <SpecialCard product = {item} key= {i} idx={i} opt={i===active?"specialCard-active":""}activeCard={activeCard}/>
                    ))}
                </div>
                <div className="specialSwitch" style={style}></div>
                {products && products.slice(startIdx,endIdx).map((item)=>(
                    <div className="specialsDescription">
                        <h1>{item.name}</h1>
                        <div className="specialReviews">
                            <h3>Overall user Reviews:</h3>
                            <p>({item.numOfReviews})</p>
                        </div>
                        <div className="specialImageList">
                            {item.images.slice(1,4).map((img, i)=>(
                                <div className="specialImageListItem">
                                    <img src={img.url} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Specials