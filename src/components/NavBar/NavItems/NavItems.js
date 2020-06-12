import React from 'react'
import './NavItems.css'
import Aux from '../../../HOC/Aux'
import NavItem from './NavItem/NavItem'
import { connect } from 'react-redux'


const NavItems = (props) => {
    let orders = null
    if(props.isLoggedIn){
        orders = <NavItem url="/orders" exact  name="Orders"/> 
    }
    return(
        <Aux>
            <ul className="NavItems">
                <NavItem url="/" name="Home" exact/>
                <NavItem url="/about" exact name="About" />
                <NavItem url="/cart" exact  name="Cart" iconName="cart"/> 
                {orders}
            </ul>
        </Aux>
    )
}
const stateMappedToProps = (state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
})

export default connect(stateMappedToProps) (NavItems)