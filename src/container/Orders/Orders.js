import React, {Component} from 'react'
import { flowRight as compose} from 'lodash'
import './Orders.css'
import { graphql } from 'react-apollo'
import query from '../../Query_Mutation/query'
import noOrderSVG from './Assets/undraw_order_delivered_p6ba.svg'
import Button from '../../components/UI/Button/Button'
import Order from './Order/Order'
import { connect } from 'react-redux'


class Orders extends Component{
    constructor(props){
        super(props)
        this.state = {
            refresh : false
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.showOrderDetails !== this.state.refresh){
            this.setState({refresh: this.props.showOrderDetails})
            this.props.data.refetch()
        }
    }

    render(){
        let toRender = null
        if(this.props.data.getOrders && this.props.data.getOrders.length === 0){
            toRender =<div className="Order_feedback">
                <div className="Orders_NoOrder">
                   <img src={noOrderSVG} alt="noOrder" />
                </div>
                <p className="Orders_NoOrder_Text">You have no order yet, try making order by selecting a book you want to buy</p>
                <div className="Order_MakeOrder_btn">
                        <Button mode="dark" name="Buy a book" clicked={()=> this.props.history.push('/')} />
                </div>
            </div>  
        }else if(this.props.data.getOrders && this.props.data.getOrders.length > 0){
            toRender = this.props.data.getOrders.map(order => (
                <Order 
                key={order._id}
                id={order._id}
                amount={order.totalPrice}
                orderDate={order.createdAt}
                />

            ))
        }
        return(
            <div className="Orders">
                <p className="Orders_Header">Orders</p>
                {toRender}
            </div>
        )
    }
}

const stateMappedToProps = state => {
    return {
        showOrderDetails: state.showOrderDetails
    }
}


export default compose(
    connect(stateMappedToProps),
    graphql(query.getOrders)
) (Orders)