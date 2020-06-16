import React from 'react'
import './Order.css'


const Order = (props) => {
    let orderDate = new Date(parseInt(props.orderDate))
    orderDate = `${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()} at ${orderDate.toLocaleTimeString()}`
    return(
        <div className="Order">
            <p className="Order_Id">{props.id}</p>
            <p className="Order_Date">{orderDate}</p>
            <p className="Order_Amount_Paid">{props.amount} <span>Paid</span></p>
            <p className="Order_Status"> {props.status} In Progess</p>
        </div>
    )
}

export default Order