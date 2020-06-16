import React, {Component} from 'react'
import { flowRight as compose} from 'lodash'
import './Orders.css'
import { graphql } from 'react-apollo'
import query from '../../Query_Mutation/query'
import noOrderSVG from './Assets/undraw_order_delivered_p6ba.svg'
import Aux from '../../HOC/Aux'
import Button from '../../components/UI/Button/Button'
import Order from './Order/Order'


class Orders extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.data)
        let toRender = null
        if(this.props.data.getOrders && this.props.data.getOrders.length === 0){
            toRender =<Aux>
                <div className="Orders_NoOrder">
                   <img src={noOrderSVG} alt="noOrder" />
               </div>
               <p className="Orders_NoOrder_Text">You have no order yet, try making order by selecting a book you want to buy</p>
               <div className="Order_MakeOrder_btn">
                    <Button mode="dark" name="Buy a book" clicked={()=> this.props.history.push('/')} />
               </div>
            </Aux>  
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
                {toRender}
            </div>
        )
    }
}


export default compose(
    graphql(query.getOrders)
) (Orders)