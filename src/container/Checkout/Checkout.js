import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../Store/actions'
import {flowRight as compose} from 'lodash'
import './Checkout.css'
import CartItem from './CartItem/CartItem'
import querys from '../../Query_Mutation/query'
import { graphql } from 'react-apollo'
import mutation from '../../Query_Mutation/mutation'


class Checkout extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.isLoggedIn !== this.props.isLoggedIn){
            this.setState({isLoggedIn: this.props.isLoggedIn})
        }
    }
    
    componentDidMount(){
       setTimeout(() => {
           if(!this.props.isLoggedIn){
               this.props.showAuth()
           }
       }, 100)
    }
    deleteBookFromCart = (id) => {
        this.props.mutate({
            variables: {
                bookId : id
            }
        }).then(data=>{
            this.props.showCartNotification({
                status:"success",
                content: "Item deleted from cart successfully"
            })
        }).catch(err=> {
            if(err.graphQLErrors){
                let errors = err.graphQLErrors.map(err => err.message)
                this.props.showCartNotification({
                    status:"error",
                    content: errors
                })
            }
        })
    }
    render(){
        console.log(this.props)
        let items
        if(!this.props.data.getUserForCart){
            items = null
        }else{
            items = this.props.data.getUserForCart.cart.map(item=> (
                <CartItem
                imageUrl={item.imageUrl}
                title={item.title}
                author={item.author.name}
                price={item.price}
                deleteItem={()=>this.deleteBookFromCart(item._id)}
                />
            ))
        }
        let toRender = ""
        if(!this.state.isLoggedIn){
           
            toRender = <div>
                <p className="Checkout_Error_Text">Hei! i cant recognize you</p>
            </div>
        }else{
            toRender =
                <div className="Checkout_Wrapper">
                    <div className="Checkout_Headers">
                        <p>My Cart</p>
                        <div className="Checkout_Price_Quantity">
                            <p>Quantity</p>
                            <p>Price</p>
                        </div>
                    </div>
                    <hr />
                    {items}
                </div>
        }
        return(
           <div className="Checkout">
               {toRender}
           </div>
        )
    }
}

const stateMappedToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}
const actionMappedToProps = dispatch => {
    return {
        showAuth : ()=> dispatch(actionTypes.showAuth()), 
        showCartNotification: (payload) => dispatch(actionTypes.showNotification(payload))
    }
}

export default compose(
    connect(stateMappedToProps, actionMappedToProps), 
    graphql(querys.getUserForCart),
    graphql(mutation.deleteBookFromCart)
)(Checkout)