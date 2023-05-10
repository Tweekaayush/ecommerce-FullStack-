import React, { Fragment, useEffect, useState } from 'react'
import "./ProductForm.css"
import { genres } from '../../genrelist'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/productAction'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'

const ProductForm = ({opt}) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [bgImg, setBgImg] = useState("")
  const [bgImgPrev, setBgImgPrev] = useState("")
  const [images, setImages] = useState([])
  const [imagesPrev, setImagesPrev] = useState([])

  const dispatch = useDispatch()

  const {loading, error, success} = useSelector((state)=>state.newProduct)

  useEffect(()=>{
    if(error){
      clearErrors()
    }
    if(success){
      alert("Product Added Successfully")
      dispatch({type:NEW_PRODUCT_RESET})
    }
  },[dispatch, alert, error, success])


  const productSubmitHandler = (e) =>{
      e.preventDefault()

      const myForm = new FormData()

      myForm.set("name", name)
      myForm.set("price", price)
      myForm.set("description", description)
      myForm.set("genre", genre)
      myForm.set("name", name)
      myForm.set("background_image", bgImg)

      images.forEach((image)=>{
        myForm.append("images", image)
      })

      dispatch(createProduct(myForm))
  }
  const imageDataChange = (e) =>{
    if(e.target.name === "background_image"){
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){            
          setBgImgPrev(reader.result);
          setBgImg(reader.result)
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }else{
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPrev([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPrev((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  }

  return (
    <Fragment>
        <div className={`ProductFormContainer ${opt}`}>
        <form
          className='productForm'
           encType='multipart/form-data'
           onSubmit={productSubmitHandler}
          >
            <div>
               <input className='productFormInput' type="text" placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>

              <input className='productFormInput' type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" required/>
            </div>
            <div>

              <textarea className='productFormInput' placeholder="Product Description" value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="1"></textarea>
            </div>
            <div>
              <select className='productFormInput' value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="">Select Genre</option>
                {genres.map((genre)=>(
                  <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
              </select>
            </div>

            <div>
              <input className='productFormImageInput' type="file" name="background_image" accept='image/' onChange={imageDataChange} />
            </div>
            {bgImg &&(
            <div id="backgroundImgPreview">
              <img src={bgImgPrev} alt="bgImg" />
            </div>
            )}

            <div>
              <input className='productFormImageInput' type="file" name="productImages" accept='image/' onChange={imageDataChange}multiple />
            </div>
            <div id="productImgPreview">
              {imagesPrev.map((image, i)=>(
                <img src={image} key={i} alt="prodImg" 
                />
              ))}
            </div>

            <input type="submit" value="Add" className='signUpBtn' disabled={loading? true:false} />
          </form>
        </div>
    </Fragment>
  )
}

export default ProductForm