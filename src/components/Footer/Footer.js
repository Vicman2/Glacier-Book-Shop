import React from 'react'
import './Footer.css'
import Aux from '../../HOC/Aux'
import logo from './Assets/logo.png'


const Footer = (props)=> {
    const footerClass = props.mode === "dark" ? "Footer_Dark" : "Footer_Bright"
    return (
        <Aux>
            <section className={footerClass}>
                <div className="Footer_Logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="Footer_Norm">
                    <li>Home</li>
                    <li>Register</li>
                    <li>About</li>
                    <li>My cart</li>
                </ul>
                <ul className="Footer_Norm">
                    <li>Privacy </li>
                    <li>Terms and condition </li>
                    <li>Terms of user </li>
                    <li>Copy write </li>
                    <li>Glacier</li>
                </ul>
                <ul className="Footer_Abnorm">
                    <li> Policy</li>
                    <li>Designed by Offordile Victor(Vicman)</li>
                </ul>
            </section>
        </Aux>
    )
}

export default Footer