import React, {Component} from 'react'
import './Checkout.css'
import { connect } from 'react-redux'


class Checkout extends Component{
    render(){
        return(
            <div className="Checkout">

            </div>
        )
    }
}

const stateMappedToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(stateMappedToProps) (Checkout)