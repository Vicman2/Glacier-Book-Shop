import React from 'react'
import logo from './Assets/logo.png'
import './NavBar.css'
import Aux from '../../HOC/Aux'
import NavItems from './NavItems/NavItems'
import Button from '../UI/Button/Button'
import Profile from '../../container/Profile/Profile'
import * as actionTypes from '../../Store/actions'
import { connect } from 'react-redux'
import Harmburger from '../UI/Harmburger/Harmburger'
import { withRouter } from 'react-router-dom'
import {flowRight as compose} from 'lodash'
import SearchBook from '../../container/searchBook/searchBook'
import { graphql, withApollo } from 'react-apollo'
import query from '../../Query_Mutation/query'
import querys from '../../Query_Mutation/query'

const NavBar = (props) => {
    const className = props.mode === "dark" ? "NavBar_Dark" : "NavBar_Bright"; 
    let Auth = null
    let cartNoRendering = null
    let  cart = JSON.parse(localStorage.getItem('cart'))
    if(cart){
        props.updateCartNo(cart.cartIds.length)
        cartNoRendering =  <span className="Cart_Number">{props.cartNo} </span>
    }
    if(props.isLoggedIn){
        props.client.query({
            query: querys.getUserForCart
        }).then(data=> {
            props.updateCartNo(data.data.getUserForCart.cart.length)
        })
    }
    if(props.cartNo > 0){
        cartNoRendering =  <span className="Cart_Number">{props.cartNo} </span>
    }
    if(props.isLoggedIn){
        Auth = <div className="profile-Icon" onClick={props.showProfile} >
            <ion-icon name="person"></ion-icon>
        </div>
    }else{ 
        Auth = <div className="AuthButtons">
                <div className="SigningUp">
                    <Button mode="dark" name="SignUp" clicked={props.clickedSignIn}/>
                </div>
                <Button  name="Login"  clicked={props.clickedLogin}/>
        </div>
    }
    return(
        <Aux>
            <Profile 
            show={props.seeProfile}
            cancel={props.showProfile}
            />
            <div className={className}>
                <div className="Nav_HarmBurger">
                    <Harmburger 
                    hide={!props.showHamBurger}
                    clicked={props.clickedHarmburger}
                     />
                </div>
                <div  
                onClick= {()=> props.history.push('/')}
                 className="Nav_Logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="Nav_Search_Input">
                    <SearchBook />
                </div>
                <NavItems />
                <div className="CartBox" onClick={() => props.history.push('/cart')}>
                    <ion-icon name="cart"></ion-icon>
                    {cartNoRendering}
                </div>
                <div className="Nav_Auth">
                    {Auth}
                </div>
            </div>
        </Aux>
    )
}

const stateMapedToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn, 
        cartNo: state.numberOfCartElem
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateCartNo : (cartNum)=> dispatch(actionTypes.updateCartNum(cartNum))
    }
}

export default  compose(
    withRouter,
    withApollo,
    connect(stateMapedToProps, mapDispatchToProps)
)  (NavBar)