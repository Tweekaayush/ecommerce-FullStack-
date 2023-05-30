import React, { useState} from 'react'
import "./Specials.css"
import SpecialCard from './SpecialCard'

const Specials = ({products}) => {

    const [startIdx, setStartIdx] = useState(0)
    const [endIdx, setEndIdx] = useState(1)
    const [active, setActive] = useState(0)
    const [ht, setHt] = useState(0)

    const ratings = (i) =>{
        switch(i){
            case 0: return "No Reviews "
            case 1: return "Mostly Negative "
            case 1.5:return "Mostly Negative "
            case 2: return "Negative "
            case 2.5:return "Negative "
            case 3: return "Mixed "
            case 3.5:return "Positive "
            case 4: return "Very Positive "
            case 4.5: return "Overwhelmingly Positive "
            case 5: return "Overwhelmingly Positive "
        }
    }

    const ratingsStyle = (i)=>{
        switch(i){
            case 0: return {color:"white"}
            case 1: return {color:"#FD5C00"}
            case 1.5:return {color:"#FD5C00"}
            case 2: return {color:"#FD5C00"}
            case 2.5:return {color:"#FD5C00"}
            case 3: return {color:"yellow"}
            case 3.5:return {color:"#009EFF"}
            case 4: return {color:"#009EFF"}
            case 4.5: return {color:"#009EFF"}
            case 5: return {color:"#009EFF"}
        }
    }

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
                            <p>
                                <span style={ratingsStyle(item.ratings)}>
                                    {ratings(item.ratings)}
                                </span>
                                ({item.numOfReviews})
                            </p>
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