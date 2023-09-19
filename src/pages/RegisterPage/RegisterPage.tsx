import './RegisterPage.scss'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {auth, googleProvider} from '../../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { setUser } from '../../redux/slices/userSlice';
import InfoPopUp from '../../components/InfoPopUp/InfoPopUp';

const RegisterPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpText, setPopUpText] = useState("Welcome to our library")

  const dispatch = useDispatch()

  async function signIn(){
    if(!email || !password){
      setPopUpText("Please fill all the blanks")
      setShowPopUp(true)
    }else{
      try{
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        dispatch(setUser({email: newUser.user.email, id: newUser.user.uid}))
        setShowPopUp(true)
      }catch(err){
        setPopUpText("Such user already exists")
        setShowPopUp(true)
      }
      setEmail("")
      setPassword("")
    }
  }

  async function googleSignIn(){
    try {
      const newUser = await signInWithPopup(auth, googleProvider)
      dispatch(setUser({email: newUser.user.email, id: newUser.user.uid}))
      setShowPopUp(true)
    } catch (error) {
      console.error(error)
    }
    
  }


  return (
    <div className="auth">
      {showPopUp && <InfoPopUp text={popUpText} setShowPopUp={setShowPopUp} setPopUpText={setPopUpText}/>}
      <h2>Register</h2>
      <input type="email" placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Password... ' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className="sign-in" onClick={signIn}>Sign up</button>
      
      <div className="google-btn" onClick={googleSignIn}>
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google'/>
        </div>
        <p className="btn-text"><b>Sign in with google</b></p>
      </div>
    </div>
  )
}

export default RegisterPage