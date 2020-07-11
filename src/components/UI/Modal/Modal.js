import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css'
import Button from '../Button/Button';
import Aux from '../../../HOC/Aux'
import Spinner from '../Spinner/Spinner';



const Modal = (props) => {
    const showModal = props.show;
    const classes = ["Modal"]
    if(showModal){
        classes.push("Show_Modal")
    }else{
        classes.push("Hide_Modal")
    }
    let bt1, bt2
    if(props.loading1){
        bt1 = <Spinner />
     }else{
        bt1 =  <Button mode="dark" clicked={props.onClickButton1} name={props.button1Name}/>
     }
    if(props.loading2){
       bt2 = <Spinner />
    }else{
       bt2 =  <Button clicked={props.onClickButton2} name={props.button2Name} />
    }
    let showCloseIcon = null
    if(props.clicked) {
        showCloseIcon = <div className="Model_Close">
            <div>
                <ion-icon name="close" onClick={props.clicked}></ion-icon>
            </div>
        </div>
    }
    let toLogin = <p>Have an account? <span className="switchingAuth" onClick={props.login}>Login </span> </p>
    let toSignin = <p>Don't have an accout? <span className="switchingAuth" onClick={props.signIn}>Sign in </span></p>
    let afterButton = null
    if(props.auth) afterButton = <div className="afterBtn">{props.auth =="login" ? toLogin: toSignin} </div>
    return(
        <Aux>
            <Backdrop toggled={showModal} />
            <section onClick={props.clicked} className={classes.join(" ")}>
                <div className="Modal_Content">
                    {showCloseIcon}
                    <div className="Modal_Header">
                        <p>{props.title} </p>
                    </div>
                    {props.children}
                    <div className="Modal_Buttons">
                        {bt1}
                        {bt2}
                        
                    </div>
                    {afterButton}
                </div>
            </section>
        </Aux>
    )
}

export default Modal