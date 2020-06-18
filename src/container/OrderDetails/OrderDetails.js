import React, {Component} from 'react'
import {flowRight as compose} from 'lodash'
import query from '../../Query_Mutation/query'
import mutations from '../../Query_Mutation/mutation'
import './OrderDetails.css'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import Modal from '../../components/UI/Modal/Modal'

class OrderDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            order: null,
            loading: false,
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.show !== this.props.show && this.props.show){
            this.props.client.query({
                query: query.getOrder, 
                variables: {
                    orderId: this.props.idOfOrderToShow
                }
            }).then(res => {
                this.setState({order: res.data.getOrder})
            })
        }
    }
    deleteOrder = (orderId) => {
        this.setState({loading: true})
        this.props.deleteOrder({
            variables: {
                orderId
            }
        }).then(res=> {
            this.props.cancel();
            this.setState({loading: false})
        })
    }
    render(){
        const {order} = this.state
        let ordersToRender = null
        if(order){
            ordersToRender = order.orders.map(oneBook => (
                <div className="OneOrderd_Book">
                    <p className="OneOrderd_Book_title">{oneBook.book.title}</p>
                    <p className="OneOrderd_Book_Quantity">{oneBook.quantity} </p>
                    <p className="OneOrderd_Book_Price">${oneBook.book.price} </p>
                </div>
            ))
        }
        return(
            <Modal
            title= {`Order ID ${order? order._id: ""}`}
            button1Name="cancel"
            button2Name="Delete"
            show={this.props.show}
            cancel={this.props.cancel}
            onClickButton1={this.props.cancel}
            onClickButton2={()=>this.deleteOrder(order? order._id: "")}
            loading2={this.state.loading}
            >
            <div className="OrderDetails">
                <div className="OneOrderd_Book OneOrderd_Book_Header">
                    <p className="OneOrderd_Book_title">Title</p>
                    <p className="OneOrderd_Book_Quantity">Quantity </p>
                    <p className="OneOrderd_Book_Price">Price</p>
                </div>
                {ordersToRender}
                <div className="OrderDetails_TotalPrice">
                    <p>Amount: ${order ? order.totalPrice: ""} </p>
                </div>
            </div>
            </Modal>
        )
    }
}
    
const stateMappedToProps =(state) => {
    return {
        idOfOrderToShow: state.idOfOrderToShow
    }
}
export default compose(
    graphql(mutations.deleteOrder, {name: "deleteOrder"}),
    withApollo,
    connect(stateMappedToProps)
)
 (OrderDetails)