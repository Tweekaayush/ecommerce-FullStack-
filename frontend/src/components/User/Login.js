import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./Login.css"
import { Link, useLocation } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope, faLockOpen} from "@fortawesome/free-solid-svg-icons"
import {useDispatch, useSelector} from "react-redux"
import {clearErrors, login, register} from "../../actions/userAction"
import { useNavigate } from "react-router-dom";
import Metadata from '../layout/Metadata'
import Loader from '../layout/Loader/Loader'
import PersonIcon from '@mui/icons-material/Person';

const Login = ({history}) => {

  const dispatch = useDispatch();
  const {error, loading, isAuthenticated} = useSelector((state) => state.user)
  let navigate = useNavigate()
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const location = useLocation();

  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  let redirect = location.search ? location.search.split("=")[1] : "account"
  redirect = "/" + redirect
  

  const {name, email, password}= user;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


  const loginSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) =>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm))
  }

  const registerDataChange = (e)=>{
    if(e.target.name === "avatar"){
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){            
            setAvatarPreview(reader.result);
            setAvatar(reader.result)
          }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setUser({...user, [e.target.name]: e.target.value});
    }
  }

  useEffect(()=>{
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if(isAuthenticated){
      navigate(redirect)
    }

  }, [dispatch, history, isAuthenticated, alert, redirect])

  const switchTabs = (e, tab)=>{
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if(tab === "register"){
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <Fragment>
      {loading? <Loader/> : (<Fragment>
        <Metadata title="Login/SignUp"></Metadata>
      <div className="loginSignUpContainer">
        <div className='loginSignUpContent'>
          <div className="loginSignUpContent-1">
            <div className="loginSignUpContent-1-1"></div>
          </div>
          <div className="loginSignUpContent-2">
          <div className="loginSignUpBox">
          <div>
            <div className="loginSignUpToggle">
              <p onClick={(e)=>switchTabs(e, "login")}>Sign In</p>
              <p onClick={(e)=>switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form action="" className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
             <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} placeholder="123@gmail.com" required/>
            </div>
            <div className="loginPassword">
            <FontAwesomeIcon icon={faLockOpen} />
              <input type="password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder="********" required/>
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className='loginBtn' />
          </form>
          <form
           className='signUpForm'
           ref={registerTab}
           encType='multipart/form-data'
           onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <PersonIcon/>
              <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange}/>
            </div>
            <div className="signUpEmail">
            <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" name="email" value={email} onChange={registerDataChange} placeholder="123@gmail.com" required/>
            </div>
            <div className="signUpPassword">
            <FontAwesomeIcon icon={faLockOpen} />
              <input type="password" name="password" value={password} onChange={registerDataChange} placeholder="password" required/>
            </div>
            <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
              <input type="file" name="avatar" accept='image/' onChange={registerDataChange} />
            </div>
            <input type="submit" value="Register" className='signUpBtn'/>
          </form>
        </div>
          </div>
        </div>
      </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Login