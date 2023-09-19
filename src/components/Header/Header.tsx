import { Link } from 'react-router-dom'
import {auth} from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import {signOut } from "firebase/auth"
import {useEffect, useState} from 'react'
import './Header.scss'
import mainLogo from '../../assets/library_icon.png'
import { setUser } from '../../redux/slices/userSlice';
import InfoPopUp from '../InfoPopUp/InfoPopUp';

const Header = () => {

  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpText, setPopUpText] = useState("Welcome to our library")

  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.value)


  async function signingOut(){
    try {
      await signOut(auth)
      dispatch(setUser({}))
      setPopUpText("You are signed out")
      setShowPopUp(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header>
      {/* Part with logo and the name of website */}
      {showPopUp && <InfoPopUp text={popUpText} setShowPopUp={setShowPopUp} setPopUpText={setPopUpText}/>}
      <Link to={'/'} className="logo-container">
        <img className='logo-image' src={mainLogo} alt="cozy reader" />
        <h1>The coziest library</h1>
      </Link>
      {/* The part with nav links */}
      <nav>
        <Link to={"/"}>Find the book</Link>
        <Link to={"/categories"}>Categories</Link>
        {Object.keys(user).length !== 0 && <Link to={'/mybooks'}>
          My Books
        </Link> }
      </nav>
      {/* The part with login and register buttons */}
      <div className="login-register">
        {Object.keys(user).length === 0
        ?
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
        :
        <button className="sign-out" onClick={signingOut}>Sign out</button>
        }
        
      </div>
    </header>
  )
}

export default Header