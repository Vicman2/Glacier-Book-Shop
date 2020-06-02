import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavItem.css'
import Aux from '../../../../HOC/Aux'


const NavItem = (props) => {
    let icon;
    if(props.iconName){
        icon = <ion-icon name={props.iconName}></ion-icon>
    }
    return(
        <Aux>
            <li className="NavItem" onClick={props.clicked}>
    <NavLink activeClassName="active" exact={props.exact} to={props.url}> {props.name} {icon}</NavLink>
            </li>
        </Aux>
    )
}

export default NavItem