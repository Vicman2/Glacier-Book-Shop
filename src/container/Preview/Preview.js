import React, {Component} from 'react'
import {usePaystackPayment, PaystackButton, PaystackConsumer} from 'react-paystack'
import gql from 'graphql-tag'
import './Preview.css'
import { graphql } from 'react-apollo'
import bookImage from '../Home/Assets/Cooking.jpeg'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import mutations from '../../Query_Mutation/mutation'
import Button from '../../components/UI/Button/Button'
import { capitalizeFirstWord } from '../../Util/stringHelperFunctions'
import * as actionTypes from '../../Store/actions'
import Aux from '../../HOC/Aux'
import LatestBooks from '../../components/LatestBooks/LatestBooks'

class Preview extends Component{
    constructor(props){
        super(props)   
    }

    addToCart = (id) =>{
        if(this.props.isLoggedIn){
            this.props.mutate({
                variables: {
                    bookId: id
                }
            }).then(data=> {
                console.log(data)
                this.props.showCartNotification({
                    status: "success", 
                    content: "Book have been added to cart successfully"
                })
            })
        }
        const exist = this.props.cart.find(prodId => prodId === id)
        if(exist){
            this.props.showCartNotification({
                status: "primary", 
                content: "Book is in cart already"
            })
        }else{
            this.props.addToCart(id);
            this.props.showCartNotification({
                status: "success", 
                content: "Book have been added to cart successfully"
            })
        }
    }
    buyBook = (id) => {
        console.log(id)
        this.props.addToCart(id);
        if(!this.props.isLoggedIn){
            this.props.showAuth()
        }else{
            this.props.mutate({
                variables: {
                    bookId: id
                }
            }).then(data=> {
                console.log(data)
                this.props.showCartNotification({
                    status: "success", 
                    content: "Book have been added to cart successfully"
                }).cart(err=> {
                    const errors = err.graphQLErrors.map(err => err.message);
                    this.props.showCartNotification({
                        status:"primary",
                        content: errors
                    })
                })
            })
            this.props.history.push('/cart');
        }
    }
    cancelCheckAuth = ()=> {
        this.setState({showCheckAuth : false})
    }
    render(){
        const book = {...this.props.data.getBook}
        // const config = {
        //     reference : (new Date()).getTime(), 
        //     email: process.env.REACT_APP_RECIPIENT_EMAIL,
        //     amount: book.price * 100, 
        //     publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        //     text: 'Buy Now',
        //     onSuccess: () => this.props.history.push('/'),
        //     onClose: () => null
        // }
        let src = ""
        if(!this.props.data.loading){
            src = this.props.imageEndpoint + book.imageUrl
        }
        return(
            <Aux>
                
                <div className="Preview">
                    <div className="Preview_ImageContainer_Review"> 
                        <img src={src} alt="" />
                    </div>
                    <div className="Preview_Text_Details">
                        <p className="Preview_BookTitle"> {book.title ? capitalizeFirstWord(book.title) : ""} </p>
                        <p className="Preview_AuthorName"> {book.author? capitalizeFirstWord (book.author.name) : ""} (Author) </p>
                        <p className="Preview_Rating">
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                        </p>
                        <p>${book.price} </p>
                        <div className="Preview_ButtonWrapper">
                            {/* <PaystackConsumer {...config} >
                                {({initializePayment}) => <button onClick={() => initializePayment()}>Buy Now</button>}
                            </PaystackConsumer> */}
                            <Button name="Buy Now" clicked={() => this.buyBook(book._id)} />
                            <Button name="Add To Cart" mode="dark" iconName="cart" clicked={()=>this.addToCart(book._id)}/>
                        </div>
                        <p className="Preview_Description_Title">Description</p>
                        <p className="Preview_Desciption"> {book.description} </p>
                        <p className="Product_Detail_Title">Product Details</p>
                        <div className="Preview_Details">
                            <div className="Detail_Key">
                                <p>Paperback</p>
                                <p>Published </p>
                                <p>Title</p>
                                <p>ISBN</p>
                                <p>Language</p>
                            </div>
                            <div className="Detail_Value">
                                <p> {book.details? book.details.paperBack: ""} </p>
                                <p> {book.details? book.details.published: ""} </p>
                                <p> {book.details? capitalizeFirstWord(book.title): ""} </p>
                                <p> {book.details? book.details.ISBN: ""} </p>
                                <p> {book.details? book.details.language: ""} </p>
                            </div>
                        </div>
                        <div>
                            <p className="Preview_About_The_Author">About the Author</p>
                            <div className="Preview_Author_Details">
                                <div className="Preview_Author_Image_Container">
                                    <img src={bookImage} />
                                </div>
                                <div className="Preview_Author">
                                    <p>{book.author? book.author.website : ""} </p>
                                    <p>Member since December 2019</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LatestBooks />
            </Aux>
        )
    }
}

const query = gql`
    query GetBook($id : ID!){
        getBook(id: $id ){
            _id
            title
            price
            description
            details{
              paperBack
              published
              ISBN
              language
            }
            imageUrl
            author {
              _id
              name
              website
              rating
            }
        }
    }
`
const stateMapedToProps = (state)=> {
    return {
        isLoggedIn: state.isLoggedIn,
        imageEndpoint: state.bookImageEndpoint,
        cart: state.cart
    }
}

const actionsMappedToProps = dispatch => {
    return {
        addToCart : (id) => dispatch(actionTypes.addToCart(id)),
        showAuth : () => dispatch(actionTypes.showAuth()),
        showCartNotification: (payload) => dispatch(actionTypes.showNotification(payload))
    }
}

export default compose(
    connect(stateMapedToProps, actionsMappedToProps), 
    graphql(mutations.addToCart),
    graphql(query, {
        options : (props) => ({ variables : { id: props.match.params.id}})
    })
)(Preview)