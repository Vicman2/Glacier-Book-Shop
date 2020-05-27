import React from 'react'
import * as actionTypes from '../../Store/actions'
import Modal from '../UI/Modal/Modal'
import './CheckAuth.css'
import { connect } from 'react-redux'


const CheckAuth = (props) => {
    const onClickButton1 = ()=> {
        props.cancelAuth()
        props.clickedLogIn()
    }
    const onClickButton2 = ()=> {
        props.cancelAuth()
        props.clickedSignIn()
    }
    return(
        <Modal 
        show={props.show}
        clicked={props.cancel}
        button1Name="Log In"
        button2Name="Sign Up"
        onClickButton1={onClickButton1}
        onClickButton2={onClickButton2}
        title="Please try to Log In or Sign In to continue"
        >
            <div className="CheckAuth">
                
            </div>
        </Modal>
    )
}
const actionMappedToProps = dispatch => {
    return {
        cancelAuth :() => dispatch(actionTypes.cancelAuth())
    }
}


export default connect(null, actionMappedToProps) (CheckAuth)