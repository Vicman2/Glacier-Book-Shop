import React, {Component} from 'react'
import {PaystackConsumer} from 'react-paystack'
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
            isLoggedIn: this.props.isLoggedIn, 
            cart: null, 
            totalprice: null
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.isLoggedIn !== this.props.isLoggedIn ){
            this.setState({isLoggedIn: this.props.isLoggedIn})
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data.getUserForCart && prevState.cart !== nextProps.data.getUserForCart.cart){
            return{
                cart: nextProps.data.getUserForCart.cart
            }
        }else{
            return null
        }
    }
    componentDidMount(){
       setTimeout(() => {
           if(!this.props.isLoggedIn){
               this.props.showAuth();
           }
       }, 100)
    }
    changeQuantity = (_id, quantity)=>{
        this.props.changeBookQuantity({
            variables:{
                bookId: _id,
                quantity: parseInt(quantity)
            }
        }).then(res=> {
            this.props.data.refetch()
            this.setState({cart: res.data.changeBookQuantity.cart})
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
    deleteBookFromCart = (id) => {
        this.props.deleteBookFromCart({
            variables: {
                bookId : id
            }
        }).then(data=>{
            this.props.data.refetch()
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
        let totalPrice = 0
        let items
        if(!this.props.data.getUserForCart){
            items = null
        }else if(this.state.cart.length === 0){
            items = <div> You have nothing in the cart</div>
        }else{
            const prices = this.props.data.getUserForCart.cart.map(book => book.bookId.price * book.quantity)
            totalPrice = prices.reduce((accumulator, currentValue) => accumulator + currentValue)
            items = this.state.cart.map(item=> (
                <CartItem
                key={item.bookId._id}
                id={item.bookId._id}
                imageUrl={item.bookId.imageUrl}
                title={item.bookId.title}
                author={item.bookId.author? item.bookId.author.name: ""}
                quantity={item.quantity}
                price={item.bookId.price}
                deleteItem={()=>this.deleteBookFromCart(item.bookId._id)}
                changeQuantity={this.changeQuantity}
                />
            ))
        }
        const config = {
            reference : (new Date()).getTime(), 
            email: "vicmanthebest@gmail.com",
            amount: totalPrice * 100, 
            publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            text: 'Buy Now',
            onSuccess: () => {
                this.props.history.push('/')
                this.props.showCartNotification({
                    status:"success",
                    content: "Your order have been recieved, you will recieve it in 2 days time"
                })
                this.props.emptyCart()
                .catch(err => {
                    if(err.graphQLErrors){
                        let errors = err.graphQLErrors.map(err => err.message)
                        this.props.showCartNotification({
                            status:"error",
                            content: errors
                        })
                    }
                })
            },
            onClose: () => null
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
                    <div className="CheckOut_Totalprice">
                        <p>Total:  ${totalPrice}</p>
                    </div>
                    <div className="Proceed_ToCheckout">
                            <PaystackConsumer {...config} >
                                {({initializePayment}) => <button onClick={() => initializePayment()}>Pay ${totalPrice} </button>}
                            </PaystackConsumer>
                    </div>
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
    graphql(mutation.deleteBookFromCart,{name: "deleteBookFromCart"}),
    graphql(mutation.changeBookQuantity, {name: "changeBookQuantity"}),
    graphql(mutation.emptyCart, {name: "emptyCart"})
)(Checkout)