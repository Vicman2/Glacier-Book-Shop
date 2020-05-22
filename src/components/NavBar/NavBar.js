import React from 'react'
import logo from './Assets/logo.png'
import SearchInput from '../UI/InputTypes/Search/Search'
import './NavBar.css'
import Aux from '../../HOC/Aux'
import NavItems from './NavItems/NavItems'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'

const NavBar = (props) => {
    const className = props.mode === "dark" ? "NavBar_Dark" : "NavBar_Bright"; 
    let Auth = null
    if(props.isLoggedIn){
        Auth = <div className="profile-Icon">
            <ion-icon name="person"></ion-icon>
        </div>
    }else{ 
        Auth = <Aux>
                <Button mode="dark" name="SignUp" clicked={props.clickedSignIn}/>
                <Button  name="Login"  clicked={props.clickedLogin}/>
        </Aux>
    }
    return(
        <Aux>
            <div className={className}>
                <div className="Nav_Logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="Nav_Search_Input">
                    <SearchInput />
                </div>
                <NavItems />
                <div className="Nav_Auth">
                    {Auth}
                </div>
            </div>
        </Aux>
    )
}

const stateMapedToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(stateMapedToProps) (NavBar)