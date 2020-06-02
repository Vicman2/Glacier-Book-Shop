import React from 'react'
import './HamburgerMenu.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../HOC/Aux'
import NavItem from '../NavItems/NavItem/NavItem'

const HarmburgerMenu = (props) => {
    const classes = ["HarmburgerMenu"]
    if(props.show){
        classes.push("Show_HarmburgerMenu")
    }else{
        classes.push("Hide_HarmburgerMenu")
    }
    return(
        <Aux>
            <Backdrop toggled={props.show} clicked={props.clicked}/>
            <div className={classes.join(" ")}>
                <div className="HarmBurger_Close" onClick={props.clicked}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <ul>
                    <NavItem clicked={props.clicked} url="/" name="Home" exact/>
                    <NavItem clicked={props.clicked} url="/about" exact name="About" />
                    <NavItem clicked={props.clicked} url="/cart" exact  name="Cart" iconName="cart"/> 
                </ul>
            </div>
        </Aux>
    )
}

export default HarmburgerMenu