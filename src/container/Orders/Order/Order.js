import React from 'react'
import {flowRight as compose } from 'lodash'
import * as actionCreators from '../../../Store/actions'
import './Order.css'
import { connect } from 'react-redux'

const Order = (props) => {
    let orderDate = new Date(parseInt(props.orderDate))
    orderDate = `${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()} at ${orderDate.toLocaleTimeString('en-GB').substring(0, 5)}`
    return(
        <div className="Order" onClick={()=>props.showOrderDetails(props.id)}>
            <p className="Order_Id">{props.id}</p>
            <p className="Order_Date">{orderDate}</p>
            <p className="Order_Amount_Paid">${props.amount} <span>Paid</span></p>
            <p className="Order_Status"> {props.status} In Progess</p>
        </div>
    )
}
const actionsMappedToProps = (dispatch) => {
    return{
        showOrderDetails: (orderId)=> dispatch(actionCreators.showOrderDetails(orderId))
    }
}

export default compose(
    connect (null, actionsMappedToProps)
)   (Order)