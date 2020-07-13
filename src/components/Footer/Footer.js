import React from 'react'
import './Footer.css'
import Aux from '../../HOC/Aux'
import logo from './Assets/logo.png'
import { NavLink } from 'react-router-dom'


const Footer = (props)=> {
    const footerClass = props.mode === "dark" ? "Footer_Dark" : "Footer_Bright"
    return (
        <Aux>
            <section className={footerClass}>
                <div className="Footer_Logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="Footer_Norm">
                    <li>{<NavLink exact to="/">Home</NavLink>} </li>
                    <li>{<NavLink to="/about">About</NavLink>} </li>
                    <li>{<NavLink to="/cart">Cart</NavLink>} </li>
                </ul>
                <ul className="Footer_Abnorm">
                    <li>Designed by Offordile Victor(Vicman)</li>
                </ul>
            </section>
        </Aux>
    )
}

export default Footer