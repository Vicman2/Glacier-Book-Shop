import React from 'react'
import Aux from '../../../HOC/Aux'
import "./Button.css"

const Button = (props) => {
   const  className= props.mode === "dark" ? "Button_Dark" : "Button_Bright"
    return (
        <Aux>
            <div className="Button">
                <button className={className} onClick={props.clicked}>{props.name}</button>
            </div>
        </Aux>
    )
}

export default Button

