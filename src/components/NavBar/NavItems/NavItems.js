import React from 'react'
import './NavItems.css'
import Aux from '../../../HOC/Aux'
import NavItem from './NavItem/NavItem'

const NavItems = (props) => {
    return(
        <Aux>
            <ul className="NavItems">
                <NavItem url="/" name="Home" exact/>
                <NavItem url="/about" exact name="About" />
                <NavItem url="/cart" exact  name="Cart" iconName="cart"/> 
            </ul>
        </Aux>
    )
}

export default NavItems