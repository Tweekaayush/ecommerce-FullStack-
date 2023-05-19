import React, { Fragment, useEffect, useState } from 'react'
import "./ProductForm.css"
import { genres } from '../../genrelist'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/productAction'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { developers } from '../../developerlist'

const ProductForm = ({opt}) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [released, setReleased] = useState("")
  const [platform, setPlatform] = useState("")
  const [developer, setDeveloper] = useState("")
  const [images, setImages] = useState([])
  const [imagesPrev, setImagesPrev] = useState([])

  const dispatch = useDispatch()

  const {loading, error, success} = useSelector((state)=>state.newProduct)

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
    if(success){
      toast.success("Product Added Successfully")
      dispatch({type:NEW_PRODUCT_RESET})
    }
  },[dispatch, alert, error, success,toast])


  const productSubmitHandler = (e) =>{
      e.preventDefault()
    console.log(released)

      const myForm = new FormData()

      myForm.set("name", name)
      myForm.set("price", price)
      myForm.set("description", description)
      myForm.set("genre", genre)
      myForm.set("released", released)
      myForm.set("platform", platform)
      myForm.set("developer", developer)
      myForm.set("background_image", "")

      images.forEach((image) => {
        myForm.append("images", image);
      });

      dispatch(createProduct(myForm))
  }
  const imageDataChange = (e) =>{
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
              <input className='productFormInput' type="date" value={released} onChange={(e)=>setReleased(e.target.value)} placeholder="Released" required/>
            </div>
            <div>
              <textarea required className='productFormInput' placeholder="Product Description" value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="1"></textarea>
            </div>
            <div>
              <select required className='productFormInput' value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="">Select Genre</option>
                {genres.map((genre)=>(
                  <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select required className='productFormInput' value={platform} onChange={(e)=>setPlatform(e.target.value)}>
                <option value="">Select Platform</option>
                  <option value="Pc">Pc</option>
                  <option value="Ps">Ps</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Nintendo">Nintendo</option>
              </select>
            </div>
            <div>
              <select required className='productFormInput' value={developer} onChange={(e)=>setDeveloper(e.target.value)}>
                <option value="">Select Developer</option>
                  {developers.map((dev, i)=>(
                    <option key={dev.id} value={dev.name}>{dev.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <label>Images:</label>
              <input required className='productFormImageInput' type="file" name="productImages" accept='image/*' onChange={imageDataChange} multiple />
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