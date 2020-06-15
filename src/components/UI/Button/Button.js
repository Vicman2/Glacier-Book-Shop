import React from 'react'
import Aux from '../../../HOC/Aux'
import "./Button.css"

const Button = (props) => {
//    let  className= props.mode === "dark" ? "Button_Dark" : "Button_Bright"
    let className= null
    switch (props.mode) {
        case "dark":
            className ="Button_Dark"
            break;
        case "white":
            className ="Button_White"
            break;
        default:
            className = "Button_Bright"
            break;
    }
    const icon = props.iconName ? <ion-icon name={props.iconName}></ion-icon> : null
        return (
            <Aux>
                <div className="Button">
                    <button className={className} onClick={props.clicked}>
                        {icon} 
                        {props.name}</button>
                </div>
            </Aux>
        )
}

export default Button

