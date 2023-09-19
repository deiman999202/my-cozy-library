import './InfoPopUp.scss'
import mainIcon from '../../assets/library_icon.png'
import { useNavigate } from 'react-router-dom'

const InfoPopUp = (props:any) => {

    
    const navigate = useNavigate()

    function closePopUp(e: any){
        if (e.target === e.currentTarget){
            onClosePopUp()
        }
    }

    function onClosePopUp(){
        if(props.text === "Welcome to our library" || props.text === "You are signed out"){
            props.setShowPopUp(false)
            navigate("/")
        }else{
            props.setPopUpText("Welcome to our library")
            props.setShowPopUp(false)
        }
    }

  return (
    <div className="pop-up-background" onClick={(e) => closePopUp(e)}>
        <div className="pop-up-box">
            <img src={mainIcon} alt="logo" />
            <h2>{props.text}</h2>
            <button onClick={() => onClosePopUp()}>Continue</button>
        </div>
    </div>
  )
}

export default InfoPopUp