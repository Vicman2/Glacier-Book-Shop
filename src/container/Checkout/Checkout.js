import React, {Component} from 'react'
import {PaystackConsumer} from 'react-paystack'
import { connect } from 'react-redux'
import * as actionTypes from '../../Store/actions'
import {flowRight as compose} from 'lodash'
import './Checkout.css'
import CartItem from './CartItem/CartItem'
import emptyCart from './Assets/undraw_empty_cart_co35.svg'
import Authenticate from './Assets/undraw_authentication_fsn5.svg'
import querys from '../../Query_Mutation/query'
import { graphql } from 'react-apollo'
import mutation from '../../Query_Mutation/mutation'
import Aux from '../../HOC/Aux'


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
        let items = null
        if(!this.props.data.getUserForCart){
            items = null
        }else if(this.state.cart.length === 0){
            items = <Aux>
                <div className="Orders_NoOrder">
                    <img src={emptyCart}  alt="EmptyCart" />
                </div>
                <p className="EmpryCart_Text"> Sorry Your cart is Empty</p>

            </Aux>
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
                this.props.showCartNotification({
                    status:"success",
                    content: "Your order have been recieved, you will recieve it in 2 days time"
                })
                this.props.makeOrder()
                this.props.emptyCart()
                this.props.history.push('/orders')
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
        let payment = null 
        let deHeader = null
        if(this.state.cart && this.state.cart.length > 0){
            deHeader = <Aux>
                <div className="Checkout_Headers">
                        <p>My Cart</p>
                        <div className="Checkout_Price_Quantity">
                            <p>Quantity</p>
                            <p>Price</p>
                        </div>
                </div>
                <hr />
            </Aux>
            payment = <Aux>
                <div className="CheckOut_Totalprice">
                        <p>Total:  ${totalPrice}</p>
                    </div>
                    <div className="Proceed_ToCheckout">
                            <PaystackConsumer {...config} >
                                {({initializePayment}) => <button onClick={() => initializePayment()}>Pay ${totalPrice} </button>}
                            </PaystackConsumer>
                </div>
            </Aux>
        }
        let toRender = null
        if(!this.state.isLoggedIn){
            toRender = <Aux>
                    <div className="Orders_NoOrder">
                        <img src={Authenticate}  alt="EmptyCart" />
                    </div>
                    <p className="EmpryCart_Text"> Sorry, please login to see your cart</p>
                </Aux> 
        }else{
            toRender =
                <div className="Checkout_Wrapper">
                    {deHeader}
                    {items}
                    {payment}
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
    graphql(mutation.makeOrder, {name: "makeOrder"}),
    graphql(mutation.emptyCart, {name: "emptyCart"})
)(Checkout)