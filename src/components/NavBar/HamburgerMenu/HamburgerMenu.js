import React from 'react'
import './HamburgerMenu.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../HOC/Aux'
import NavItem from '../NavItems/NavItem/NavItem'
import { connect } from 'react-redux'

const HarmburgerMenu = (props) => {
    let orders = null 
    if(props.isLoggedIn){
        orders = <NavItem clicked={props.clicked} url="/orders" exact  name="Orders" /> 
    }
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
                <div className="HarmBurger_Close" >
                    <ion-icon onClick={props.clicked} name="close"></ion-icon>
                </div>
                <ul>
                    <NavItem clicked={props.clicked} url="/" name="Home" exact/>
                    <NavItem clicked={props.clicked} url="/about" exact name="About" />
                    <NavItem clicked={props.clicked} url="/cart" exact  name="Cart" iconName="cart"/> 
                    {orders}
                </ul>
            </div>
        </Aux>
    )
}

const stateMappedToProps = (state)=> {
    return {
        isLoggedIn : state.isLoggedIn
    }
}

export default connect(stateMappedToProps) (HarmburgerMenu)